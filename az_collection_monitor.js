require("dotenv").config({ path: __dirname + "/.env" });

let { ApiPromise, WsProvider } = require("@polkadot/api");
let { ContractPromise } = require("@polkadot/api-contract");
let jsonrpc = require("@polkadot/types/interfaces/jsonrpc");
let { numberToU8a, stringToHex } = require("@polkadot/util");
let {send_telegram_message} = require("./utils.js");
let mongoose = require('mongoose');
let database = require('./database.js');
let {collection_manager} = require('./Contracts/collection_manager.js');
let collection_manager_calls = require('./Contracts/collection_manager_calls.js');

let {marketplace} = require('./Contracts/marketplace.js');
let marketplace_calls = require('./Contracts/marketplace_calls.js');

const removeDB = async () => {
  await database.Collections.remove({});
  console.log("Collections DB cleared");
}

const check_new_collections = async () =>{
  if (global_vars.is_check_new_collections) return;
  global_vars.is_check_new_collections = true;
  try{
    console.log('Checking New Collections ...');
    let collection_count_contract = await collection_manager_calls.getCollectionCount(global_vars.caller);
    console.log('Collection Count in Contract',collection_count_contract);
    global_vars.collection_count_contract = collection_count_contract;

    global_vars.collection_count_db = await database.Collections.countDocuments({});
    console.log('Collection Count in DB',global_vars.collection_count_db);

    //Add to Database
    for (var i=global_vars.collection_count_db+1;i<=collection_count_contract;i++){
      let address = await collection_manager_calls.getContractById(global_vars.caller,i);
      let collection = await collection_manager_calls.getCollectionByAddress(global_vars.caller,address);
      let attributes = await collection_manager_calls.getAttributes(global_vars.caller,address,
        ["name", "description", "avatar_image", "header_square_image", "header_image", "website", "twitter", "discord", "telegram", "is_doxxed", "is_duplication_checked"]
      );
      let volume = await marketplace_calls.getVolumeByCollection(global_vars.caller,address);

      let found = await database.Collections.findOne({nftContractAddress: address});
      let nft_count = await database.NFTs.count({"nftContractAddress":address});

      //console.log(found);
      console.log(collection);
      if (!found){
        var obj = {
          index: i,
          collectionOwner:collection.collectionOwner,
          nftContractAddress:collection.nftContractAddress,
          contractType:collection.contractType,
          isCollectRoyaltyFee:collection.isCollectRoyaltyFee,
          royaltyFee:collection.royaltyFee.replace(/,/g, ''),
          isActive:collection.isActive,
          showOnChainMetadata:collection.showOnChainMetadata,
          name:         attributes[0],
          description:  attributes[1],
          avatarImage:  attributes[2],
          squareImage:  attributes[3],
          headerImage:  attributes[4],
          website:      attributes[5],
          twitter:      attributes[6],
          discord:      attributes[7],
          telegram:     attributes[8],
          volume: volume,
          nft_count:nft_count,
          isDoxxed: (attributes[9] == '1') ? true : false,
          isDuplicationChecked: (attributes[10] == '1') ? true : false
        }
        console.log('added',i,address,obj);
        await database.Collections.create(obj);
      }
    }
  }
  catch (e)
  {
    send_telegram_message("check_new_collections - " + e.message);
    console.log(e);
    global_vars.is_check_new_collections = false;
  }

  global_vars.is_check_new_collections = false;
}

const check_collection_queue = async () =>{
  if (global_vars.is_check_new_collections) return;
  global_vars.is_check_new_collections = true;

  try{
    console.log('Checking for Collection Queue ...');
    let queue_data = await database.CollectionQueue.find({});
    let records_length = queue_data.length;
    console.log('Collection Queue length:',records_length);

    for (var j=0;j<records_length;j++){
      let nftContractAddress = queue_data[j].nftContractAddress;
      let collection = await collection_manager_calls.getCollectionByAddress(global_vars.caller,nftContractAddress);
      if (!collection) {
        await database.CollectionQueue.deleteOne({nftContractAddress : nftContractAddress});
        continue;
      }
      let attributes = await collection_manager_calls.getAttributes(global_vars.caller,nftContractAddress,
        ["name", "description", "avatar_image", "header_square_image", "header_image", "website", "twitter", "discord", "telegram", "is_doxxed", "is_duplication_checked"]
      );
      let volume = await marketplace_calls.getVolumeByCollection(global_vars.caller,nftContractAddress);
      //update Collection nft_count
      let nft_count = await database.NFTs.count({"nftContractAddress":nftContractAddress});

      var obj = {
        collectionOwner:collection.collectionOwner,
        contractType:collection.contractType,
        isCollectRoyaltyFee:collection.isCollectRoyaltyFee,
        royaltyFee:collection.royaltyFee.replace(/,/g, ''),
        isActive:collection.isActive,
        showOnChainMetadata:collection.showOnChainMetadata,
        name:         attributes[0],
        description:  attributes[1],
        avatarImage:  attributes[2],
        squareImage:  attributes[3],
        headerImage:  attributes[4],
        website:      attributes[5],
        twitter:      attributes[6],
        discord:      attributes[7],
        telegram:     attributes[8],
        volume: volume,
        nft_count: nft_count,
        isDoxxed: (attributes[9] == '1') ? true : false,
        isDuplicationChecked: (attributes[10] == '1') ? true : false
      }
      console.log('updated',nftContractAddress,obj);
      
      let currentCollection = await database.Collections.findOne({nftContractAddress: nftContractAddress});

      if (currentCollection) {
        if (currentCollection.avatarImage && currentCollection.avatarImage != obj.avatarImage) {
          await database.ImageRemoveQueue.create({
            input: currentCollection.avatarImage
          });
          console.log('Added ' + currentCollection.avatarImage + ' to remove image queue'); 
        }
        if (currentCollection.squareImage && currentCollection.squareImage != obj.squareImage) {
          await database.ImageRemoveQueue.create({
            input: currentCollection.squareImage
          });
          console.log('Added ' + currentCollection.squareImage + ' to remove image queue');
        }
        if (currentCollection.headerImage && currentCollection.headerImage != obj.headerImage) {
          await database.ImageRemoveQueue.create({
            input: currentCollection.headerImage
          });
          console.log('Added ' + currentCollection.headerImage + ' to remove image queue');
        }
      }
      
      await database.Collections.updateOne({nftContractAddress : nftContractAddress},obj);

      await database.CollectionQueue.deleteOne({nftContractAddress : nftContractAddress});

    }
  }
  catch(e){
    // send_telegram_message("check_collection_queue - " + e.message);
    console.log(e.message);
    global_vars.is_check_new_collections = false;
  }

  global_vars.is_check_new_collections = false;
}

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
};

var global_vars = {}
var api = null;

connectDb().then(async () => {
  console.log(`ARTZERO Collection Monitoring is active!`);
  console.log('Collection Address:',collection_manager.CONTRACT_ADDRESS);
  console.log('Caller Address:',process.env.CALLER);
  global_vars.caller = process.env.CALLER;

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

    const marketplace_contract = new ContractPromise(
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS
    );
    console.log('Marketplace Contract is ready');
    marketplace_calls.setContract(marketplace_contract);

    global_vars.is_check_new_collections = false;
    global_vars.is_check_collection_queue = false;

    setInterval(check_new_collections, 5 * 1000);
    // setInterval(check_bid_queue, 5 * 1000);
    setInterval(check_collection_queue, 6 * 1000);

  });

  api.on("error", (err) => {
    console.log('error', err );
  });


});
