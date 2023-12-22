import {NftsSchemaRepository} from '../../repositories';
import {EventTeleQueueSchemaRepository} from '../../repositories/event-tele-schema.repository';
import {resolveDomainAzeroID, send_telegram_bot} from '../utils';

const stakeEvent = ['NewStakeEvent', 'UnstakeEvent'];
const tradeEvent = ['PurchaseEvent', 'BidWinEvent'];
export const create_event_db = async (
  data: any,
  eventTeleQueueRepo: EventTeleQueueSchemaRepository,
  nftRepo: NftsSchemaRepository,
) => {
  try {
    if (stakeEvent.includes(data?.eventName)) {
      const found = await eventTeleQueueRepo.findOne({
        where: data,
      });
      if (!found) {
        try {
          const result = await eventTeleQueueRepo.create({
            ...data,
            _id: `${data?.blockNumber}-${data?.tokenID}`,
          });
          if (result) {
            const eventName = data?.eventName;
            switch (eventName) {
              case 'NewStakeEvent':
                send_telegram_bot(
                  `<b>🚀PMP Staking Event</b>
<b>Staker:</b> <code>${
                    (await resolveDomainAzeroID(data?.staker)) || '***'
                  }</code>
<b>NFT TokenID:</b> <code>#${data?.tokenID}</code>`,
                  process.env.TELEGRAM_ID_CHAT,
                  process.env.TELEGRAM_GROUP_FEED_THREAD_ID,
                );
                break;
              case 'UnstakeEvent':
                send_telegram_bot(
                  `<b>😮PMP Unstaking Event</b>
<b>Staker:</b> <code>${
                    (await resolveDomainAzeroID(data?.staker)) || '***'
                  }</code>
<b>NFT TokenID:</b> <code>#${data?.tokenID}</code>`,
                  process.env.TELEGRAM_ID_CHAT,
                  process.env.TELEGRAM_GROUP_FEED_THREAD_ID,
                );
                break;
            }
          }
        } catch (error) {
          if (error.code === 11000) {
            console.log('Duplicate key error: Document already exists.');
          } else {
            console.log('Error creating document:', error);
          }
        }
      }
    }

    if (tradeEvent.includes(data?.eventName)) {
      try {
        const result = await eventTeleQueueRepo.create({
          ...data,
          _id: `${data?.blockNumber}-${data?.nftContractAddress}-${data?.tokenID}`,
        });

        if (result) {
          let nftInfo = await nftRepo.findOne({
            where: {
              nftContractAddress: data?.nftContractAddress,
              tokenID: data?.tokenID,
            },
          });

          const eventName = data?.eventName;
          switch (eventName) {
            case 'PurchaseEvent':
              send_telegram_bot(
                `🛒<b>${nftInfo?.nftName}</b> [<code>PURCHASE</code>]
<b>NFT Collection:</b> <a href="${process.env.FRONTEND_URL}/collection/${
                  data?.nftContractAddress
                }">${data?.nftContractAddress}</a>
<b>Price :</b> <code>${data?.price} Azero</code>
<b>Seller:</b> <code>${
                  (await resolveDomainAzeroID(data?.seller)) || '***'
                }</code>
<b>Buyer :</b> <code>${
                  (await resolveDomainAzeroID(data?.buyer)) || '***'
                }</code>`,
                process.env.TELEGRAM_ID_CHAT,
                process.env.TELEGRAM_GROUP_FEED_THREAD_ID,
              );
              break;
            case 'BidWinEvent':
              send_telegram_bot(
                `🎉<b>${nftInfo?.nftName}</b> [<code>BIDWIN</code>]
<b>NFT Collection:</b> <a href="${process.env.FRONTEND_URL}/collection/${
                  data?.nftContractAddress
                }">${data?.nftContractAddress}</a>
<b>Price :</b> <code>${data?.price} Azero</code>
<b>Seller:</b> <code>${
                  (await resolveDomainAzeroID(data?.seller)) || '***'
                }</code>
<b>Buyer :</b> <code>${
                  (await resolveDomainAzeroID(data?.buyer)) || '***'
                }</code>`,
                process.env.TELEGRAM_ID_CHAT,
                process.env.TELEGRAM_GROUP_FEED_THREAD_ID,
              );
              break;
          }
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log('Duplicate key error: Document already exists.');
        } else {
          console.log('Error creating document:', error);
        }
      }
    }
  } catch (error) {
    // console.log(error);
  }
};
