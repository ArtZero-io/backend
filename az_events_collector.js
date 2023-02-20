require("dotenv").config({ path: __dirname + "/.env" });

let mongoose = require('mongoose');
let database = require('./database.js');
let bs58 = require('bs58');
let BN = require("bn.js");
let { ApiPromise, WsProvider } = require("@polkadot/api");
let { ContractPromise,Abi } = require("@polkadot/api-contract");
let jsonrpc = require("@polkadot/types/interfaces/jsonrpc");
let { numberToU8a, stringToHex } = require("@polkadot/util");
let {marketplace} = require('./Contracts/marketplace.js');
let {staking} = require('./Contracts/staking.js');
let {collection_manager} = require('./Contracts/collection_manager.js');
let {send_telegram_message} = require("./utils.js");
const STARTING_BLOCK = 1846180;
let marketplace_contract = null;
const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
};

var global_vars = {}
var abi_marketplace_contract = null;
var abi_staking_contract = null;
var abi_collection_contract = null;

const scanBlocks = async (blocknumber) =>{
  //console.log('blocknumber',blocknumber);
  if (global_vars.isScanning) {
    //This to make sure always process the latest block in case still scanning old blocks
    console.log('Process latest block',blocknumber);
    const blockHash = await api.rpc.chain.getBlockHash(blocknumber);
    const eventRecords = await api.query.system.events.at(blockHash);
    processEventRecords(eventRecords,blocknumber);
    return;
  }
  global_vars.isScanning = true;
  try {
    //Check database to see the last checked blockNumber
    let lastBlock_db = await database.ScannedBlocks.findOne({lastScanned:true});
    let last_scanned_blocknumber = 0;
    if (lastBlock_db){
      last_scanned_blocknumber = lastBlock_db.blockNumber;
    }
    else{
      let lastBlock_db = await database.ScannedBlocks.create({lastScanned:true,blockNumber:0});
    }
    if (last_scanned_blocknumber == 0) last_scanned_blocknumber = blocknumber;
    for (var to_scan = last_scanned_blocknumber; to_scan<=blocknumber; to_scan++ ){
      console.log('Scanning block',to_scan);
      if (last_scanned_blocknumber > 0 && last_scanned_blocknumber % 43200 == 0){
        send_telegram_message("scanBlocks - syncing " + last_scanned_blocknumber + "/" + blocknumber);
      }
      const blockHash = await api.rpc.chain.getBlockHash(to_scan);
      const eventRecords = await api.query.system.events.at(blockHash);

      processEventRecords(eventRecords,to_scan);

      await database.ScannedBlocks.updateOne({lastScanned:true,blockNumber:to_scan});
    }
  }
  catch (e){
    send_telegram_message("scanBlocks - " + e.message);
  }

  global_vars.isScanning = false;
}
const processEventRecords = async (eventRecords,to_scan) =>{
  eventRecords.forEach(async (record) => {
    // Extract the phase, event and the event types
    const { phase, event: { data, method, section } } = record;
    if (section == "contracts" && method == "ContractEmitted"){
        //console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
        const [accId, bytes] = data.map((data, _) => data).slice(0, 2);
        const contract_address = accId.toString();

        if (contract_address == marketplace.CONTRACT_ADDRESS){
          console.log('Event from Marketplace Contract...');
          const decodedEvent = abi_marketplace_contract.decodeEvent(bytes);
          let event_name = decodedEvent.event.identifier;
          const eventValues = [];

          for (let i = 0; i < decodedEvent.args.length; i++) {
            const value = decodedEvent.args[i];
            eventValues.push(value.toString());
          }
          if (event_name == 'NewListEvent'){
            let obj = {
              blockNumber: to_scan,
              trader: eventValues[0],
              nftContractAddress: eventValues[1],
              tokenID: eventValues[2] ? JSON.parse(eventValues[2]).u64 : 0,
              price: eventValues[3] ?  eventValues[3] / 10**12 : 0,
            };
            let found = await database.NewListEvent.findOne(obj);
            if (!found){
              await database.NewListEvent.create(obj);
              console.log('added NewListEvent',obj);
            }

          }
          else if (event_name == 'UnListEvent'){
            let obj = {
              blockNumber: to_scan,
              trader: eventValues[0],
              nftContractAddress: eventValues[1],
              tokenID: eventValues[2] ? JSON.parse(eventValues[2]).u64 : 0,
            };
            let found = await database.UnListEvent.findOne(obj);
            if (!found){
              await database.UnListEvent.create(obj);
              console.log('added UnListEvent',obj);
            }
          }
          else if (event_name == 'PurchaseEvent'){
            let obj = {
              blockNumber: to_scan,
              buyer: eventValues[0],
              seller: eventValues[1],
              nftContractAddress: eventValues[2],
              tokenID: eventValues[3] ? JSON.parse(eventValues[3]).u64 : 0,
              price: eventValues[4] ?  eventValues[4] / 10**12 : 0,
              platformFee: eventValues[5] ?  eventValues[5] / 10**12 : 0,
              royaltyFee: eventValues[6] ?  eventValues[6] / 10**12 : 0,
            }
            console.log('eventValues', eventValues);
            console.log('PurchaseEvent',obj);
            let found = await database.PurchaseEvent.findOne(obj);
            if (!found){
              await database.PurchaseEvent.create(obj);
              console.log('added PurchaseEvent',obj);
            }
          }
          else if (event_name == 'BidWinEvent'){
            let obj = {
              blockNumber: to_scan,
              buyer: eventValues[0],
              seller: eventValues[1],
              nftContractAddress: eventValues[2],
              tokenID: eventValues[3] ? JSON.parse(eventValues[3]).u64 : 0,
              price: eventValues[4] ?  eventValues[4] / 10**12 : 0,
              platformFee: eventValues[5] ?  eventValues[5] / 10**12 : 0,
              royaltyFee: eventValues[6] ?  eventValues[6] / 10**12 : 0,
            }
            let found = await database.BidWinEvent.findOne(obj);
            if (!found){
              await database.BidWinEvent.create(obj);
              console.log('added BidWinEvent',obj);
            }
          }
          console.log(to_scan,contract_address,event_name,eventValues);
        }
        else if (contract_address == staking.CONTRACT_ADDRESS){
          console.log('Event from Staking Contract...');
          const decodedEvent = abi_staking_contract.decodeEvent(bytes);
          let event_name = decodedEvent.event.identifier;
          const eventValues = [];

          for (let i = 0; i < decodedEvent.args.length; i++) {
            const value = decodedEvent.args[i];
            eventValues.push(value.toString());
          }
          if (event_name == 'NewStakeEvent'){
            let obj = {
              blockNumber: to_scan,
              staker: eventValues[0],
              eventName: 'NewStakeEvent',
              tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
            }
            let found = await database.StakingEvent.findOne(obj);
            if (!found){
              await database.StakingEvent.create(obj);
              console.log('added NewStakeEvent',obj);
            }
          }
          else if (event_name == 'UnstakeEvent'){
            let obj = {
              blockNumber: to_scan,
              staker: eventValues[0],
              eventName: 'UnstakeEvent',
              tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
            }
            let found = await database.StakingEvent.findOne(obj);
            if (!found){
              await database.StakingEvent.create(obj);
              console.log('added UnstakeEvent',obj);
            }
          }
          else if (event_name == 'RequestUnstakeEvent'){
            let obj = {
              blockNumber: to_scan,
              staker: eventValues[0],
              eventName: 'RequestUnstakeEvent',
              tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
            }
            let found = await database.StakingEvent.findOne(obj);
            if (!found){
              await database.StakingEvent.create(obj);
              console.log('added RequestUnstakeEvent',obj);
            }
          }
          else if (event_name == 'CancelRequestUnstakeEvent'){
            let obj = {
              blockNumber: to_scan,
              staker: eventValues[0],
              eventName: 'CancelRequestUnstakeEvent',
              tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
            }
            let found = await database.StakingEvent.findOne(obj);
            if (!found){
              await database.StakingEvent.create(obj);
              console.log('added CancelRequestUnstakeEvent',obj);
            }
          }
          else if (event_name == 'ClaimReward'){
            let obj = {
              blockNumber: to_scan,
              staker: eventValues[0],
              rewardAmount: eventValues[1] ?  eventValues[1] / 10**12 : 0,
              stakedAmount: eventValues[2] ?  eventValues[2] : 0
            }
            let found = await database.ClaimRewardEvent.findOne(obj);
            if (!found){
              await database.ClaimRewardEvent.create(obj);
              console.log('added ClaimRewardEvent',obj);
            }
          }
          else if (event_name == 'AddReward'){
            let obj = {
              blockNumber: to_scan,
              rewardAmount: eventValues[0] ?  eventValues[0] / 10**12 : 0,
              totalStakedAmount: eventValues[1] ?  eventValues[1] / 10**12 : 0,
            }
            let found = await database.AddRewardEvent.findOne(obj);
            if (!found){
              await database.AddRewardEvent.create(obj);
              console.log('added AddReward',obj);
            }
          }
        }
        else if (contract_address == collection_manager.CONTRACT_ADDRESS){
          console.log('Event from Collection Manager Contract...');
          const decodedEvent = abi_collection_contract.decodeEvent(bytes);
          let event_name = decodedEvent.event.identifier;
          const eventValues = [];

          for (let i = 0; i < decodedEvent.args.length; i++) {
            const value = decodedEvent.args[i];
            eventValues.push(value.toString());
          }

          if (event_name == 'AddNewCollectionEvent'){
            let obj = {
              blockNumber: to_scan,
              collectionOwner: eventValues[0],
              nftContractAddress: eventValues[1],
              contractType: eventValues[2],
              isActive: eventValues[3]
            }
            let found = await database.CollectionEvent.findOne(obj);
            if (!found){
              await database.CollectionEvent.create(obj);
              console.log('added AddNewCollectionEvent',obj);
            }
          }
        }

    }
  });
}
connectDb().then(async () => {

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
        console.log("Smartnet AZERO Connected");
      });
    });

    api.on("ready", async () => {
      console.log("Smartnet AZERO Ready");
      global_vars.isScanning = false;

      abi_marketplace_contract = new Abi(marketplace.CONTRACT_ABI);
      console.log('Marketplace Contract ABI is ready');

      abi_staking_contract = new Abi(staking.CONTRACT_ABI);
      console.log('Staking Contract ABI is ready');

      abi_collection_contract = new Abi(collection_manager.CONTRACT_ABI);
      console.log('Collection Contract ABI is ready');

      const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
        //console.log(`Chain is at block: #${header.number}`);
        scanBlocks(parseInt(header.number));
      });
    });

    api.on("error", (err) => {
      console.log('error', err );
    });

});
