require("dotenv").config({ path: __dirname + "/.env" });

let { ApiPromise, WsProvider } = require("@polkadot/api");
let { ContractPromise } = require("@polkadot/api-contract");
let jsonrpc = require("@polkadot/types/interfaces/jsonrpc");
let { numberToU8a, stringToHex } = require("@polkadot/util");
let { send_telegram_message, delay } = require("./utils.js");
let mongoose = require("mongoose");
let database = require("./database.js");

let { nft721_psp34_standard } = require("./Contracts/nft721_psp34_standard.js");
let nft721_psp34_standard_calls = require("./Contracts/nft721_psp34_standard_calls.js");

let { artzero_nft } = require("./Contracts/artzero_nft.js");
let artzero_nft_calls = require("./Contracts/artzero_nft_calls.js");

let { collection_manager } = require("./Contracts/collection_manager.js");
let collection_manager_calls = require("./Contracts/collection_manager_calls.js");

let { marketplace } = require("./Contracts/marketplace.js");
let marketplace_calls = require("./Contracts/marketplace_calls.js");
let { APICall, readOnlyGasLimit } = require("./utils.js");

const removeDB = async () => {
  await database.Collections.remove({});
  console.log("Collections DB cleared");
};

//Only run at TGE once all minted --> no need
const check_new_AZ_NFTs = async () => {
  if (global_vars.is_check_new_AZ_NFT) return;
  global_vars.is_check_new_AZ_NFT = true;
  try {
    console.log("Checking New AZ NFTs ...");
    //read current database to get total NFTs
    global_vars.az_nft_count_db = await database.NFTs.countDocuments({
      nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
    });
    console.log("AZ NFT Count in DB", global_vars.az_nft_count_db);

    //Read current total supply
    global_vars.az_nft_count_contract = await artzero_nft_calls.getLastTokenId(
      global_vars.caller
    );
    console.log("AZ NFT Count in Contract", global_vars.az_nft_count_contract);

    if (global_vars.az_nft_count_contract > global_vars.az_nft_count_db) {
      for (
        var i = global_vars.az_nft_count_db + 1;
        i <= global_vars.az_nft_count_contract;
        i++
      ) {
        let queue_data = await database.NFTQueue.findOne({
          nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
          tokenID: i,
        });
        if (!queue_data) {
          let owner = await artzero_nft_calls.ownerOf(global_vars.caller, {
            u64: i,
          });
          if (owner) {
            let found = await database.NFTs.findOne({
              nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
              tokenID: i,
            });
            if (!found)
              await database.NFTQueue.create({
                type: "update",
                nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
                tokenID: i,
              });
          }
          await delay(1000);
        }
      }
    }
  } catch (e) {
    console.log("check_new_AZ_NFTs - " + e.message);
    send_telegram_message("check_new_AZ_NFTs - " + e.message);
    global_vars.is_check_new_AZ_NFT = false;
  }
  global_vars.is_check_new_AZ_NFT = false;
};

const check_NFT_queue = async () => {
  if (global_vars.is_check_NFT_queue) return;
  global_vars.is_check_NFT_queue = true;

  try {
    console.log("Checking for NFT Queue ...");
    let queue_data = await database.NFTQueue.find({});
    let records_length = queue_data.length;
    console.log("Start debug NFT Queue");
    console.log("NFT Queue length:", records_length);

    for (var j = 0; j < records_length; j++) {
      let nftContractAddress = queue_data[j].nftContractAddress;

      let tokenID = queue_data[j].tokenID;

      let found_collection = await database.Collections.findOne({
        nftContractAddress: nftContractAddress,
      });
      if (!found_collection) {
        console.log("Collection Not found in DB", nftContractAddress);
        await database.NFTQueue.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        continue;
      }

      const nft_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      console.log("NFT Contract is ready 1", nftContractAddress, tokenID);
      //nft721_psp34_standard_calls.setContract(nft_contract);
      console.log("Before check is_clocked");
      //Check is Locked
      let is_locked = false;
      if (found_collection.showOnChainMetadata) {
        is_locked = await nft721_psp34_standard_calls.isLockedNft(
          nft_contract,
          global_vars.caller,
          { u64: tokenID }
        );
      }
      console.log("After check is_clocked");
      console.log("Before check totalSupply");
      console.log("nftContractAddress", nftContractAddress);
      console.log("global_vars.caller", global_vars.caller);
      console.log("Before totalSupply");
      //Check total Supply
      let totalSupply = await nft721_psp34_standard_calls.getLastTokenId(
        nft_contract,
        global_vars.caller
      );
      console.log("totalSupply", totalSupply, "tokenID", tokenID);
      console.log("After check totalSupply");
      console.log("Before check tokenID > totalSupply");
      if (tokenID > totalSupply) {
        await database.NFTQueue.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        continue;
      }
      console.log("After check tokenID > totalSupply");

      //check if the token exists, if not delete from the database as token can be burnt
      //Get Owner
      console.log("Before check owner");
      let owner = await nft721_psp34_standard_calls.ownerOf(
        nft_contract,
        global_vars.caller,
        { u64: tokenID }
      );
      console.log("owner", owner);
      console.log("After check owner");

      if (!owner) {
        console.log("Check owner and remove from database and queue");
        await database.NFTQueue.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        await database.NFTs.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        //update Collection nft_count
        let nft_count = await database.NFTs.count({
          nftContractAddress: nftContractAddress,
        });
        await database.Collections.updateOne(
          { nftContractAddress: nftContractAddress },
          { nft_count: nft_count }
        );
        continue;
      }

      // Get Metadata & traits new format
      const metaData = {};

      if (!found_collection.showOnChainMetadata) {
        // metaData off chain
        // - getBaseTokenUriType1
        let tokenUri = "";

        try {
          const { result, output } = await nft_contract.query[
            "psp34Traits::tokenUri"
          ](global_vars.caller, { value: 0, gasLimit: await readOnlyGasLimit(api) }, 1);
          
          if (result.isOk) {
            console.log(output.toHuman().Ok);
            tokenUri = output.toHuman().Ok?.replace("1.json", "");
          }

          console.log("xx >> tokenUri", tokenUri);
          console.log("xx >> tokenID", tokenID);
          // - getNftAttrsType1

          const offChainData = await APICall.getMetadataOffChain({
            tokenUri,
            tokenID,
          });

          // - reformat attributes

          const traits = offChainData?.attributes?.reduce((p, c) => {
            return { ...p, [c.trait_type]: c.value };
          }, {});

          metaData.traits = traits;

          metaData.nftName = offChainData.name;
          metaData.description = offChainData.description;
          metaData.avatar = offChainData.image;
        } catch (error) {
          console.log(
            "xx>> psp34Traits::tokenUri error.message",
            error.message
          );
          send_telegram_message(
            "psp34Traits::tokenUri >> check_NFT_queue - " + e.message
          );
        }
      }

      //Get all On-chain MetaData if exists
      let attributes = [];
      let attributeValues = [];

      if (found_collection?.showOnChainMetadata) {
        let attributeCount =
          await nft721_psp34_standard_calls.getAttributeCount(
            nft_contract,
            global_vars.caller
          );

        console.log("attributeCount", attributeCount);

        for (var i = 1; i <= attributeCount; i++) {
          let attribute = await nft721_psp34_standard_calls.getAttributeName(
            nft_contract,
            global_vars.caller,
            i
          );
          attributes.push(attribute);
        }
        console.log("attributes", attributes);

        attributeValues = await nft721_psp34_standard_calls.getAttributes(
          nft_contract,
          global_vars.caller,
          { u64: tokenID },
          attributes
        );
        console.log("attributeValues", attributeValues);

        // Reformat metaData & traits for rarity & filter
        // Add to NFT database

        metaData.nftName = attributeValues[0];
        metaData.description = attributeValues[1];
        metaData.avatar = attributeValues[2];

        const attrsList = attributes.slice(3, attributes.length);
        const attrsValList = attributeValues.slice(3, attributeValues.length);

        /**
         * Expect:
         *  "traits": {
         *     "Background": "Blue",
         *     "Hair": "Yellow",
         *   }
         */

        const traits = [...attrsValList].reduce(
          (p, c, i) => (!!c ? { ...p, [attrsList[i]]: c } : p),
          {}
        );

        metaData.traits = traits;

        // END - Reformat metaData & traits for rarity & filter
      }
      //Get For Sale Information
      let forSaleInformation = await marketplace_calls.getNftSaleInfo(
        global_vars.caller,
        nftContractAddress,
        { u64: tokenID }
      );

      console.log("forSaleInformation", forSaleInformation);

      var obj = {
        owner: owner,
        attributes: attributes,
        attributesValue: attributeValues,
        listed_date: forSaleInformation
          ? parseFloat(forSaleInformation.listedDate.replace(/,/g, ""))
          : 0,
        price: forSaleInformation
          ? parseFloat(forSaleInformation.price.replace(/,/g, ""))
          : 0,
        is_for_sale: forSaleInformation ? forSaleInformation.isForSale : false,
        nft_owner: forSaleInformation ? forSaleInformation.nftOwner : "",
        is_locked: is_locked,
        ...metaData,
      };

      let found = await database.NFTs.findOne({
        nftContractAddress: nftContractAddress,
        tokenID: tokenID,
      });

      if (found) {
        console.log(
          "Updating new NFT Information to DB",
          nftContractAddress,
          tokenID
        );
        await database.NFTs.updateOne(
          { nftContractAddress: nftContractAddress, tokenID: tokenID },
          obj
        );
      } else {
        console.log("Adding new NFT to DB");
        obj.nftContractAddress = nftContractAddress;
        obj.tokenID = tokenID;

        await database.NFTs.create(obj);
        //update Collection nft_count

        let nft_count = await database.NFTs.count({
          nftContractAddress: nftContractAddress,
        });

        await database.Collections.updateOne(
          { nftContractAddress: nftContractAddress },
          { nft_count: nft_count }
        );
      }

      // Re-calculate rarity
      // fetch all NFTs & update rarity table to db of Collection
      // after update NFT info/ or add new NFT to db
      let allNFTsFound = await database.NFTs.find({
        nftContractAddress,
      });

      const rarityTable = {};

      allNFTsFound.map((item) => {
        const traitsMap = item.traits;

        if (traitsMap) {
          const traitsMapObj = item.traits?.toJSON({ flattenMaps: true });

          Object.entries(traitsMapObj).map(([k, v]) => {
            if (!rarityTable[k]) rarityTable[k] = [];

            const idx = rarityTable[k].findIndex((i) => i.name === v);

            idx === -1
              ? rarityTable[k].push({ name: v, count: 1 })
              : rarityTable[k][idx].count++;
          });
        }
      });

      /**
       * Expect:
       *  "rarityTable": {
       *     "Background": [
       *      { name: "Blue", count: 1 },
       *      { name: "Yellow", count: 2 },
       *      { name: "Blue", count: 4 },
       *      ],
       *     "Hair":  [
       *        { name: "Yellow", count: 2 },
       *      ]
       *  }
       */
      
      await database.Collections.updateOne(
        { nftContractAddress },
        { rarityTable }
      );

      // END - Re-calculate rarity

      await database.NFTQueue.deleteOne({
        nftContractAddress: nftContractAddress,
        tokenID: tokenID,
      });
    }
  } catch (e) {
    console.log("xx>> e.message", e.message);

    send_telegram_message("check_NFT_queue - " + e.message);
    global_vars.is_check_NFT_queue = false;
  }

  global_vars.is_check_NFT_queue = false;
};

const check_NFT_queue_all = async () => {
  if (global_vars.is_scan_all_NFTs) return;
  if (global_vars.is_check_NFT_queue_all) return;
  global_vars.is_check_NFT_queue_all = true;

  try {
    console.log("Checking for NFT Queue All...");
    let queue_data = await database.NFTQueueAll.find({});
    let records_length = queue_data.length;
    console.log("NFT Queue length:", records_length);

    for (var j = 0; j < records_length; j++) {
      let nftContractAddress = queue_data[j].nftContractAddress;

      let tokenID = queue_data[j].tokenID;

      let found_collection = await database.Collections.findOne({
        nftContractAddress: nftContractAddress,
      });
      if (!found_collection) {
        console.log("Collection Not found in DB 2");
        await database.NFTQueueAll.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        continue;
      }

      const nft_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      console.log("NFT Contract is ready 2", nftContractAddress, tokenID);
      //nft721_psp34_standard_calls.setContract(nft_contract);

      //Check is Locked
      let is_locked = false;
      if (found_collection.showOnChainMetadata) {
        is_locked = await nft721_psp34_standard_calls.isLockedNft(
          nft_contract,
          global_vars.caller,
          { u64: tokenID }
        );
      }

      //Check total Supply
      let totalSupply = await nft721_psp34_standard_calls.getLastTokenId(
        nft_contract,
        global_vars.caller
      );
      console.log("totalSupply", totalSupply, "tokenID", tokenID);

      if (tokenID > totalSupply) {
        await database.NFTQueueAll.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        continue;
      }

      //check if the token exists, if not delete from the database as token can be burnt
      //Get Owner
      let owner = await nft721_psp34_standard_calls.ownerOf(
        nft_contract,
        global_vars.caller,
        { u64: tokenID }
      );
      if (!owner) {
        console.log("NFT not exist, remove from database and queue");
        await database.NFTQueueAll.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        await database.NFTs.deleteOne({
          nftContractAddress: nftContractAddress,
          tokenID: tokenID,
        });
        //update Collection nft_count
        let nft_count = await database.NFTs.count({
          nftContractAddress: nftContractAddress,
        });
        await database.Collections.updateOne(
          { nftContractAddress: nftContractAddress },
          { nft_count: nft_count }
        );
        continue;
      }

      //Get all On-chain MetaData if exists

      let attributeCount = await nft721_psp34_standard_calls.getAttributeCount(
        nft_contract,
        global_vars.caller
      );
      console.log(attributeCount);
      let attributes = [];
      for (var i = 1; i <= attributeCount; i++) {
        let attribute = await nft721_psp34_standard_calls.getAttributeName(
          nft_contract,
          global_vars.caller,
          i
        );
        attributes.push(attribute);
      }
      //console.log(attributes);

      let attributeValues = await nft721_psp34_standard_calls.getAttributes(
        nft_contract,
        global_vars.caller,
        { u64: tokenID },
        attributes
      );
      //console.log(attributeValues);

      //Get For Sale Information
      let forSaleInformation = await marketplace_calls.getNftSaleInfo(
        global_vars.caller,
        nftContractAddress,
        { u64: tokenID }
      );
      console.log("forSaleInformation", forSaleInformation);
      var obj = {
        owner: owner,
        attributes: attributes,
        attributesValue: attributeValues,
        listed_date: forSaleInformation
          ? parseFloat(forSaleInformation.listedDate.replace(/,/g, ""))
          : 0,
        price: forSaleInformation
          ? parseFloat(forSaleInformation.price.replace(/,/g, ""))
          : 0,
        is_for_sale: forSaleInformation ? forSaleInformation.isForSale : false,
        nft_owner: forSaleInformation ? forSaleInformation.nftOwner : "",
        is_locked: is_locked,
      };
      let found = await database.NFTs.findOne({
        nftContractAddress: nftContractAddress,
        tokenID: tokenID,
      });
      if (found) {
        console.log(
          "Updating new NFT Information to DB",
          nftContractAddress,
          tokenID
        );
        await database.NFTs.updateOne(
          { nftContractAddress: nftContractAddress, tokenID: tokenID },
          obj
        );
      } else {
        console.log("Adding new NFT to DB");
        obj.nftContractAddress = nftContractAddress;
        obj.tokenID = tokenID;
        await database.NFTs.create(obj);
        //update Collection nft_count
        let nft_count = await database.NFTs.count({
          nftContractAddress: nftContractAddress,
        });
        await database.Collections.updateOne(
          { nftContractAddress: nftContractAddress },
          { nft_count: nft_count }
        );
      }

      await database.NFTQueueAll.deleteOne({
        nftContractAddress: nftContractAddress,
        tokenID: tokenID,
      });
    }
  } catch (e) {
    send_telegram_message("check_NFT_queue_all - " + e.message);
    global_vars.is_check_NFT_queue_all = false;
  }

  global_vars.is_check_NFT_queue_all = false;
};

const scanAllNFTs = async () => {
  await delay(3000);
  if (global_vars.is_scan_all_NFTs) return;
  global_vars.is_scan_all_NFTs = true;
  try {
    let data = await database.Collections.find({ isActive: true }).sort({
      index: -1,
    });
    let records_length = data.length;

    for (var j = 0; j < records_length; j++) {
      let nftContractAddress = data[j].nftContractAddress;

      await database.CollectionQueue.create({
        type: "update",
        nftContractAddress: nftContractAddress,
      });
      console.log("added Collection update to queue", nftContractAddress);
      const nft_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      console.log("NFT Contract is ready 3");
      //nft721_psp34_standard_calls.setContract(nft_contract);

      let totalSupply = await nft721_psp34_standard_calls.getTotalSupply(
        nft_contract,
        global_vars.caller
      );
      console.log("totalSupply", totalSupply);
      if (totalSupply == 0) continue;
      for (var index = 1; index <= totalSupply; index++) {
        let queue_data = await database.NFTQueueAll.findOne({
          nftContractAddress: nftContractAddress,
          tokenID: index,
        });
        if (!queue_data) {
          console.log("added NFT update to queue", index);
          await database.NFTQueueAll.create({
            type: "update",
            nftContractAddress: nftContractAddress,
            tokenID: index,
          });
        }
      }
      await delay(500);
    }
  } catch (e) {
    console.log("scanAllNFTs - " + e.message);
    send_telegram_message("scanAllNFTs - " + e.message);
  }

  global_vars.is_scan_all_NFTs = false;
  check_NFT_queue_all();
};

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
};

var global_vars = {};
var api = null;

connectDb().then(async () => {
  console.log(`ARTZERO NFT Monitoring is active!`);
  console.log("Caller Address:", process.env.CALLER);
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
      console.log("Smartnet AZERO Connected");
    });
  });

  api.on("ready", () => {
    console.log("Smartnet AZERO Ready");

    const marketplace_contract = new ContractPromise(
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS
    );
    console.log("Marketplace Contract is ready");
    marketplace_calls.setContract(marketplace_contract);

    const az_nft_contract = new ContractPromise(
      api,
      artzero_nft.CONTRACT_ABI,
      artzero_nft.CONTRACT_ADDRESS
    );
    console.log("ArtZero NFT Contract is ready 4");
    artzero_nft_calls.setContract(az_nft_contract);

    const collection_contract = new ContractPromise(
      api,
      collection_manager.CONTRACT_ABI,
      collection_manager.CONTRACT_ADDRESS
    );
    console.log("Collection Contract is ready");
    collection_manager_calls.setContract(collection_contract);

    global_vars.is_check_NFT_queue = false;
    global_vars.is_scan_all_NFTs = false;
    global_vars.is_check_new_AZ_NFT = false;
    global_vars.is_check_NFT_queue_all = false;

    //scanAllNFTs();
    setInterval(scanAllNFTs, 3 * 60 * 60 * 1000);
    setInterval(check_NFT_queue, 5 * 1000);
    setInterval(check_new_AZ_NFTs, 7 * 1000);
  });

  api.on("error", (err) => {
    console.log("error", err);
  });
});
