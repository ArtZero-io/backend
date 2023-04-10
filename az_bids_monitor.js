require("dotenv").config({ path: __dirname + "/.env" });
let BN = require("bn.js");

let { ApiPromise, WsProvider } = require("@polkadot/api");
let { ContractPromise } = require("@polkadot/api-contract");
let jsonrpc = require("@polkadot/types/interfaces/jsonrpc");
let { numberToU8a, stringToHex } = require("@polkadot/util");
let {send_telegram_message} = require("./utils.js");
let mongoose = require('mongoose');
let database = require('./database.js');

let {artzero_nft} = require('./Contracts/artzero_nft.js');
let artzero_nft_calls = require('./Contracts/artzero_nft_calls.js');

let {marketplace} = require('./Contracts/marketplace.js');
let marketplace_calls = require('./Contracts/marketplace_calls.js');

const check_bid_queue = async () => {
  if (global_vars.is_check_Bid) return;
  global_vars.is_check_Bid = true;
  try{
    console.log('Checking for Bid Queue ...');
    let queue_data = await database.BidQueue.find({});
    let records_length = queue_data.length;
    console.log('Bid Queue length:',records_length);

    for (var j=0;j<records_length;j++){
      let nftContractAddress = queue_data[j].nftContractAddress;
      let seller = queue_data[j].seller;
      let tokenID = queue_data[j].tokenID;
      console.log(nftContractAddress,seller,tokenID);
      let ret = await marketplace_calls.getAllBids(global_vars.caller, nftContractAddress, seller, {"u64":tokenID});
      console.log('Result getAllBids', ret);
      if (!ret){
        //Not Exist, remove queue
        await database.BidQueue.deleteOne({nftContractAddress : nftContractAddress, tokenID: tokenID, seller: seller});
      }else {
        await database.Bids.deleteMany({nftContractAddress : nftContractAddress, tokenID: tokenID, seller: seller});
        //get Current NFT
        let NFT = await database.NFTs.findOne({nftContractAddress : nftContractAddress, tokenID: tokenID});

        let bid_length = ret.length;
        let current_highest_bid = new BN(0);
        for (var kk = 0; kk<bid_length; kk++){
          var obj = {
            nftContractAddress: nftContractAddress,
            seller: seller,
            tokenID: tokenID,
            bidder: ret[kk].bidder,
            bid_date: ret[kk].bidDate.replace(/,/g, ''),
            bid_value: ret[kk].bidValue.replace(/,/g, '')
          }
          //add to Bid Database
          await database.Bids.create(obj);
          if (NFT){
            if (current_highest_bid.lt(new BN(obj.bid_value)) ) {
              current_highest_bid = new BN(obj.bid_value);
            }
          }
        }
        if (NFT){
          await database.NFTs.updateOne({nftContractAddress : nftContractAddress, tokenID: tokenID},{"highest_bid":current_highest_bid.toString()});
        }
        await database.BidQueue.deleteOne({nftContractAddress : nftContractAddress, tokenID: tokenID, seller: seller});
      }
      //console.log('ret',ret);
    }
  }
  catch (e){
    send_telegram_message("check_bid_queue - " + e.message);
  }


  global_vars.is_check_Bid = false;
}

//Auto check all bids in the database to see if there is any changes
const auto_check_queue = async () => {
  if (global_vars.is_check_Bid) return;
  global_vars.is_auto_check_Bid = true;
  try{

    let bids = await database.Bids.find({});
    let records_length = bids.length;
    console.log('bids length:',records_length);

    for (var j=0;j<records_length;j++){
      var obj = {
        nftContractAddress:bids[j].nftContractAddress,
        tokenID:bids[j].tokenID,
        seller:bids[j].seller
      }
      //add to Bid Database
      let found = await database.BidQueue.findOne(obj);
      if (!found)
        await database.BidQueue.create(obj);
    }
  } catch (e){
      send_telegram_message("auto_check_queue - " + e.message);
  }

  global_vars.is_auto_check_Bid = false;
}

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
};

var global_vars = {}
var api = null;

connectDb().then(async () => {
  console.log(`ARTZERO Bid Monitor is active!`);

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

    const marketplace_contract = new ContractPromise(
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS
    );
    console.log('Marketplace Contract is ready');
    marketplace_calls.setContract(marketplace_contract);

    const az_nft_contract = new ContractPromise(
      api,
      artzero_nft.CONTRACT_ABI,
      artzero_nft.CONTRACT_ADDRESS
    );
    console.log('ArtZero NFT Contract is ready');
    artzero_nft_calls.setContract(az_nft_contract);

    global_vars.is_check_Bid = false;
    global_vars.is_auto_check_Bid = false;

    auto_check_queue();
    setInterval(check_bid_queue, 5 * 1000);
    setInterval(auto_check_queue, 60 * 1000);

  });

  api.on("error", (err) => {
    console.log('error', err );
  });


});
