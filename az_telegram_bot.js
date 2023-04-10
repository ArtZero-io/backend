require("dotenv").config({ path: __dirname + "/.env" });
let mongoose = require('mongoose');
let database = require('./database.js');
let axios = require("axios");
let { ApiPromise, WsProvider } = require("@polkadot/api");
let { ContractPromise } = require("@polkadot/api-contract");
let jsonrpc = require("@polkadot/types/interfaces/jsonrpc");
let {send_telegram_message} = require("./utils.js");
require('console-stamp')(console, '[HH:MM:ss.l]');
let {collection_manager} = require('./Contracts/collection_manager.js');
let collection_manager_calls = require('./Contracts/collection_manager_calls.js');

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
};

const send_message = async (message) => {

    const { data } = await axios({
      baseURL: process.env.TELEGRAM_URL,
      url: "/sendMessage",
      method: "post",
      data: {
        "chat_id": process.env.TELEGRAM_ID_CHAT,
        "text": message
      },
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        'Access-Control-Allow-Origin': '*',
      },
    });
}
const telegram_check = async () => {
  console.log(`<---Checking...`);
  const bid_queue_count_db = await database.BidQueue.countDocuments({});
  const json_queue_count_db = await database.JSONQueue.countDocuments({});
  const image_queue_count_db = await database.ImageQueue.countDocuments({});
  const nft_queue_count_db = await database.NFTQueue.countDocuments({});
  const nft_queue_all_count_db = await database.NFTQueueAll.countDocuments({});
  const collection_queue_count_db = await database.CollectionQueue.countDocuments({});

  let collection_count_contract = await collection_manager_calls.getCollectionCount(process.env.CALLER);
  console.log('Collection Count in Contract',collection_count_contract);

  const collection_count_db = await database.Collections.countDocuments({});
  console.log('Collection Count in DB',collection_count_db);

  if (collection_count_contract != collection_count_db){
    await send_message("Collection count in DB is not the same as collection count in contract");
  }

  if (bid_queue_count_db > 0){
    await send_message("There are " + bid_queue_count_db + " in the Bid Queue");
  }
  if (json_queue_count_db > 0){
    await send_message("There are " + json_queue_count_db + " in the JSON Queue");
  }
  if (image_queue_count_db > 0){
    await send_message("There are " + image_queue_count_db + " in the Image Queue");
  }
  if (nft_queue_count_db > 0){
    await send_message("There are " + nft_queue_count_db + " in the NFT Queue");
  }
  if (collection_queue_count_db > 0){
    await send_message("There are " + collection_queue_count_db + " in the Collection Queue");
  }
  if (nft_queue_all_count_db>0)
    await send_message("There are " + nft_queue_all_count_db + " in the Scan All NFT Queue");
  console.log(`End Checking--->`);
}
connectDb().then(async () => {
  console.log(`ARTZERO Telegram Bot is active!`);
  const provider = new WsProvider(process.env.WSSPROVIDER);
  api = new ApiPromise({
    provider,
    rpc: jsonrpc,
    types: {
      ContractsPsp34Id: {
        _enum: {
          U8: "u8",
          U16: "u16",
          U32: "u32",
          U64: "u64",
          U128: "u128",
          Bytes: "Vec<u8>",
        },
      },
    },
  });
  api.on("connected", () => {
    api.isReady.then((api) => {
      console.log("Smartnet Astar Connected");
    });
  });

  api.on("ready", () => {
    console.log("Smartnet Astar Ready");
    const collection_contract = new ContractPromise(
      api,
      collection_manager.CONTRACT_ABI,
      collection_manager.CONTRACT_ADDRESS
    );
    console.log('Collection Contract is ready');
    collection_manager_calls.setContract(collection_contract);
    telegram_check();
    setInterval(telegram_check, 5.5 * 60 * 1000);

  });

  api.on("error", (err) => {
    console.log('error', err );
  });
  //telegram_check();

});
