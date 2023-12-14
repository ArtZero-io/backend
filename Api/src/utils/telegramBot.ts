import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {isAzEnabled, send_telegram_bot} from './utils';
import {
  BidWinEventSchemaRepository,
  CollectionsSchemaRepository,
  NftsSchemaRepository,
  PurchaseEventSchemaRepository,
} from '../repositories';
import {ArtZeroDbDataSource} from '../datasources';
import * as staking_calls from '../contracts/staking_calls';
import {ContractPromise} from '@polkadot/api-contract';
import {globalApi, localApi} from '../index';
import {staking} from '../contracts/staking';
dotenv.config();

const fetchLast6CollectionToString = async (
  collectionsSchemaRepository: CollectionsSchemaRepository,
  nfTsSchemaRepository: NftsSchemaRepository,
) => {
  const data = await collectionsSchemaRepository.find({
    where: {
      isActive: true,
    },
    limit: 6,
    order: ['volume DESC'],
  });

  const listCollection = await Promise.all(
    data?.map(async e => {
      let data = await nfTsSchemaRepository.find({
        where: {
          nftContractAddress: e.nftContractAddress,
          is_for_sale: true,
        },
        order: ['price ASC'],
        limit: 1,
      });
      return data[0];
    }),
  );

  return listCollection
    .map((collection, index) => {
      return `<b>${data[index].name}</b>\nContract Address: <code>${
        data[index].nftContractAddress
      }</code>
Floor price: <code>${+(collection?.price || 0) / 10 ** 12}</code> Azero`;
    })
    .join('\n\n');
};

const fetchFloorPrice = async (
  address: any,
  nfTsSchemaRepository: NftsSchemaRepository,
) => {
  console.log(address);

  let data = await nfTsSchemaRepository.find({
    where: {
      nftContractAddress: address,
      is_for_sale: true,
    },
    order: ['price ASC'], // price ASC
    limit: 1,
  });

  if (data?.length > 0) {
    const current = data[0];
    return `<b>${
      current?.nftName
    }</b>\n<b>NFT address:</b> <code>${address}</code>\n<b>Floor price: </b>${
      +(current?.price || 0) / 10 ** 12
    } Azero`;
  } else {
    return `Unknow NFT address`;
  }
};

const getRecentTrades = async (
  purchaseEventSchemaRepository: PurchaseEventSchemaRepository,
  nfTsSchemaRepository: NftsSchemaRepository,
  bidWinEventSchemaRepository: BidWinEventSchemaRepository,
) => {
  const filter = {order: ['blockNumber DESC']};
  try {
    const purchaseEventData = await purchaseEventSchemaRepository
      .find(filter)
      .then(events => {
        return Promise.all(
          events.map(async event => {
            const {nftContractAddress, tokenID, azDomainName} = event;

            const azChecking = isAzEnabled(nftContractAddress);

            let nftInfo = await nfTsSchemaRepository.findOne({
              where: {
                ...(azChecking?.isAzDomain ? {azDomainName} : {tokenID}),
                nftContractAddress,
              },
              // fields: {
              //   avatar: true,
              //   nftName: true,
              // },
            });

            return {
              ...event,
              avatar: nftInfo?.avatar,
              nftName: nftInfo?.nftName,
              eventDataType: 'purchase',
            };
          }),
        );
      });

    const bidWinEventData = await bidWinEventSchemaRepository
      .find(filter)
      .then(events => {
        return Promise.all(
          events.map(async event => {
            const {nftContractAddress, tokenID, azDomainName} = event;

            const azChecking = isAzEnabled(nftContractAddress);

            let nftInfo = await nfTsSchemaRepository.findOne({
              ...(azChecking?.isAzDomain ? {azDomainName} : {tokenID}),
              fields: {
                nftName: true,
              },
            });

            return {
              ...event,
              avatar: nftInfo?.avatar,
              nftName: nftInfo?.nftName,
              eventDataType: 'bid win',
            };
          }),
        );
      });

    const ret = [...purchaseEventData, ...bidWinEventData]
      .sort((a, b) => (b?.blockNumber || 0) - (a?.blockNumber || 0))
      .slice(0, 5);
    return ret
      .map((trade, index) => {
        return `<b>${index + 1}. ${
          trade?.nftName
        }</b> [<code>${trade?.eventDataType.toUpperCase()}</code>]
<b>NFT address:</b> <code>${trade?.nftContractAddress}</code>
<b>Price:</b> <code>${trade?.price} Azero</code>
<b>Seller:</b> <code>${trade?.seller}</code>
<b>Buyer:</b> <code>${trade?.buyer}</code>`;
      })
      .join('\n\n');
  } catch (error) {
    console.log(error);
  }
};

const getNFTStaked = async (staker: string | undefined) => {
  try {
    if (!staking_calls.getContract()) {
      const staking_contract = new ContractPromise(
        globalApi,
        staking.CONTRACT_ABI,
        staking.CONTRACT_ADDRESS,
      );
      staking_calls.setContract(staking_contract);
    }
    if (staker) {
      let stakedNftNum = await staking_calls.getTotalStakedByAccount(
        process.env.CALLER,
        staker,
      );
      return `<b>Account address:</b>
<code>${staker}</code>
PMP Staking amount: <b>${stakedNftNum}</b>`;
    } else {
      const totalStaked = await staking_calls.getTotalStaked(
        process.env.CALLER || '',
      );
      return `<b>Platform total staking PMP amount:</b> <code>${totalStaked}</code>`;
    }
  } catch (error) {
    console.log('TELEGRAM BOT ERROR: get nft staked', error);
  }
};

if (process.env.RUN_TELEGRAM_BOT == 'true') {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_NOTIFY_TOKEN || '', {
    polling: true,
  });
  if (bot) console.log('TELEGRAM BOT TRADE: LISTENING');

  const collectionsSchemaRepository = new CollectionsSchemaRepository(
    new ArtZeroDbDataSource(),
  );
  const nfTsSchemaRepository = new NftsSchemaRepository(
    new ArtZeroDbDataSource(),
  );
  const purchaseEventSchemaRepository = new PurchaseEventSchemaRepository(
    new ArtZeroDbDataSource(),
  );
  const bidWinEventSchemaRepository = new BidWinEventSchemaRepository(
    new ArtZeroDbDataSource(),
  );

  bot.on('message', msg => {
    (async () => {
      const chatId = msg?.chat?.id || '';
      const threadId = msg?.message_thread_id?.toString() || '';
      const messageText = msg?.text || '';
      const commandArgs = messageText.split(' ');
      const command = commandArgs[0];
      const param = commandArgs[1];

      if (chatId == process.env.TELEGRAM_ID_CHAT) {
        switch (command?.toLowerCase()) {
          case '/help':
            const helpMessage =
              'Welcome! Here are the available commands:\n\n' +
              '<code>/recentTrade</code> - Show last 5 trades\n' +
              '<code>/floorPrice</code> - Display the current floor price of 6 trending collection\n' +
              '<code>/floorPrice &lt;NFTaddress&gt;</code> - Display the current floor price\n';
            send_telegram_bot(helpMessage, chatId, threadId);
            break;
          case '/recenttrade':
            send_telegram_bot(
              `<b>Last 5 recent trades</b>\n${await getRecentTrades(
                purchaseEventSchemaRepository,
                nfTsSchemaRepository,
                bidWinEventSchemaRepository,
              )}\n\nTo see more, <a href="${
                process.env.FRONTEND_URL
              }/stats">Click here</a>` || '',
              chatId,
              threadId,
            );

            break;
          case '/floorprice':
            if (param) {
              try {
                send_telegram_bot(
                  await fetchFloorPrice(param, nfTsSchemaRepository),
                  chatId,
                  threadId,
                );
                // fetchFloorPrice(param, nfTsSchemaRepository)
              } catch (error) {
                console.log('ERROR TELEGRAM: ', error);
                send_telegram_bot(`Unknow error`, chatId, threadId);
              }
            } else {
              send_telegram_bot(
                `6 Trending collections:\n${await fetchLast6CollectionToString(
                  collectionsSchemaRepository,
                  nfTsSchemaRepository,
                )}`,
                chatId,
                threadId,
              );
            }
            break;
          case '/totalstaked':
            send_telegram_bot(
              (await getNFTStaked(param)) || '',
              chatId,
              threadId,
            );
            break;
        }
      }
    })();
  });
} else {
  console.log(
    'Bot is not running. Set RUN_TELEGRAM_BOT=true to start the bot.',
  );
}
