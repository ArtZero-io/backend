import {global_vars} from "./global";
import {
    APICall, checkProjectSchema,
    convertNumberWithoutCommas,
    convertStringToPrice,
    delay,
    randomString,
    readOnlyGasLimit,
    reformatAddress,
    send_message,
    send_telegram_message,
    strToNumber,
    todayFolder
} from "../utils/utils";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import * as marketplace_calls from "../contracts/marketplace_calls";
import * as artzero_nft_calls from "../contracts/artzero_nft_calls";
import * as nft721_psp34_standard_calls from "../contracts/nft721_psp34_standard_calls";
import * as launchpad_manager_calls from "../contracts/launchpad_manager_calls";
import * as launchpad_psp34_nft_standard_calls from "../contracts/launchpad_psp34_nft_standard_calls";
import * as staking_calls from "../contracts/staking_calls";
import {
    AddRewardEventSchemaRepository,
    BidQueueSchemaRepository,
    BidsSchemaRepository,
    BidWinEventSchemaRepository,
    ClaimRewardEventSchemaRepository,
    LaunchpadMintingEventSchemaRepository,
    WithdrawEventSchemaRepository,
    CollectionEventSchemaRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository,
    ImageQueueSchemaRepository,
    ImageRemoveQueueSchemaRepository,
    ImagesSchemaRepository,
    JsonQueueSchemaRepository,
    NewListEventSchemaRepository,
    NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    NftsSchemaRepository,
    ProjectQueueSchemaRepository,
    ProjectsSchemaRepository,
    ProjectWhitelistQueuesRepository,
    PurchaseEventSchemaRepository,
    RewardQueueSchemaRepository,
    ScannedBlocksSchemaRepository,
    StakingEventSchemaRepository,
    UnListEventSchemaRepository, BlackListRepository
} from "../repositories";
import {
    collections,
    images, nftqueuealls, nftqueues,
    nfts,
    projects,
    ProjectWhitelistData,
    WhiteListPhaseData,
    WhiteListUserData
} from "../models";
import {Abi, ContractPromise} from "@polkadot/api-contract";
import {artzero_nft} from "../contracts/artzero_nft";
import {nft721_psp34_standard} from "../contracts/nft721_psp34_standard";
import {ApiPromise} from "@polkadot/api";
import {launchpad_psp34_nft_standard} from "../contracts/launchpad_psp34_nft_standard";
import axios from "axios";
import fs from "fs";
import isIPFS from "is-ipfs";
import FileType from "file-type";
import {
    CACHE_IMAGE,
    CONFIG_TYPE_NAME,
    MAX_NFT_QUEUE_ALL_IN_PROCESSING,
    NETWORK_SS58,
    TIME_RESET_NFT_QUEUE_ALL
} from "../utils/constant";
import sharp from "sharp";
import download from "download";
import {marketplace} from "../contracts/marketplace";
import {staking} from "../contracts/staking";
import {collection_manager} from "../contracts/collection_manager";
import BN from "bn.js";
import FormData from "form-data";
import {Keyring} from "@polkadot/keyring";
import {convertToUTCTime, isBlackListCollection} from "../utils/Tools";
import {globalApi, localApi} from "../index";
import {launchpad_manager} from "../contracts/launchpad_manager";
import dotenv from "dotenv";
dotenv.config();

export async function check_new_collections(
    collectionsRepo: CollectionsSchemaRepository,
    nftRepo: NftsSchemaRepository
) {
    if (global_vars.is_check_new_collections) return;
    global_vars.is_check_new_collections = true;
    try {
        const collection_contract = new ContractPromise(
            globalApi,
            collection_manager.CONTRACT_ABI,
            collection_manager.CONTRACT_ADDRESS
        );
        collection_manager_calls.setContract(collection_contract);
        const marketplace_contract = new ContractPromise(
            globalApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Checking New Collections ...`);
        let collection_count_contract = await collection_manager_calls.getCollectionCount(global_vars.caller);
        collection_count_contract = collection_count_contract ? collection_count_contract : 0;
        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Collection Count in Contract: `, collection_count_contract);
        global_vars.collection_count_contract = collection_count_contract;

        global_vars.collection_count_db = (await collectionsRepo.count({})).count;
        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Collection Count in DB: `, global_vars.collection_count_db);
        //Add to Database
        for (let i = global_vars.collection_count_db + 1; i <= collection_count_contract; i++) {
            let address = await collection_manager_calls.getContractById(global_vars.caller, i);
            let collection = await collection_manager_calls.getCollectionByAddress(global_vars.caller, address);

          // new attr type of IPFS hash
          let res = await collection_manager_calls.getAttributes(
            global_vars.caller,
            address,
            ['metadata'],
          );

          let collectionInfo;

          if (res && res[0]) {
            try {
              collectionInfo = await APICall.getNftInfoByHash({
                hash: res[0],
              });
              console.log(
                `${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR}-collectionInfo: `,
                collectionInfo,
              );
            } catch (err) {
              console.log('Error fetch collectionInfo hash ', address);
            }
          } else {
            console.log('Error collectionInfo of hash ', address);
          }
          // END new attr type of IPFS hash

          let volume = await marketplace_calls.getVolumeByCollection(
            global_vars.caller,
            address,
          );
          let found = await collectionsRepo.findOne({
            where: {
              nftContractAddress: address,
            },
          });
          let nft_count = (await nftRepo.count({nftContractAddress: address}))
            .count;
          if (!found) {
            const obj: collections = new collections({
              index: i,
              collectionOwner: collection.collectionOwner,
              nftContractAddress: collection.nftContractAddress,
              contractType: collection.contractType,
              isCollectRoyaltyFee: collection.isCollectRoyaltyFee,
              royaltyFee: collection.royaltyFee.replace(/,/g, ''),
              isActive: collection.isActive,
              showOnChainMetadata: collection.showOnChainMetadata,
              name: collectionInfo?.name,
              description: collectionInfo?.description,
              avatarImage: collectionInfo?.avatarImage,
              squareImage: collectionInfo?.squareImage,
              headerImage: collectionInfo?.headerImage,
              website: collectionInfo?.website,
              twitter: collectionInfo?.twitter,
              discord: collectionInfo?.discord,
              telegram: collectionInfo?.telegram,
              isDoxxed: collectionInfo?.isDoxxed == '1',
              isDuplicationChecked: collectionInfo?.isDuplicationChecked == '1',
              volume: volume,
              nft_count: nft_count,
              createdTime: new Date(),
              updatedTime: new Date(),
            });
            console.log(
              `${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - added `,
              i,
              address,
              obj,
            );
            try {
              await collectionsRepo.create(obj);
            } catch (e) {
              console.log(
                `${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`,
              );
            }
          }
        }
    } catch (e) {
        send_telegram_message("check_new_collections - " + e.message);
        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
        global_vars.is_check_new_collections = false;
    }
    global_vars.is_check_new_collections = false;
}

export async function check_collection_queue(
    collectionsRepo: CollectionsSchemaRepository,
    collectionQueueRepo: CollectionQueueSchemaRepository,
    nftRepo: NftsSchemaRepository,
    imageRemoveQueueRepo: ImageRemoveQueueSchemaRepository
) {
    if (global_vars.is_check_collection_queue) return;
    global_vars.is_check_collection_queue = true;
    try {
        const collection_contract = new ContractPromise(
            globalApi,
            collection_manager.CONTRACT_ABI,
            collection_manager.CONTRACT_ADDRESS
        );
        collection_manager_calls.setContract(collection_contract);
        const marketplace_contract = new ContractPromise(
            globalApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Checking for Collection Queue ...`);
        let queue_data = await collectionQueueRepo.find({});
        let records_length = queue_data.length;
        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Collection Queue length: `, records_length);
        for (let j = 0; j < records_length; j++) {
            let nftContractAddress = queue_data[j].nftContractAddress;
            if (!nftContractAddress) {
                continue;
            }
            let collection = await collection_manager_calls.getCollectionByAddress(global_vars.caller, nftContractAddress);
            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR}: `, {collection: collection});
            if (!collection) {
                await collectionQueueRepo.deleteAll({nftContractAddress: nftContractAddress});
                continue;
            }

            // new attr type of IPFS hash
            let res = await collection_manager_calls.getAttributes(
                global_vars.caller,
                nftContractAddress,
                ['metadata'],
            );

            let collectionInfo;

            if (res && res[0]) {
                try {
                collectionInfo = await APICall.getNftInfoByHash({
                    hash: res[0],
                });
                console.log(
                    `${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR}-check_collection_queue collectionInfo: `,
                    collectionInfo,
                );
                } catch (err) {
                console.log(
                    'Error fetch check_collection_queue collectionInfo hash ',
                    nftContractAddress,
                );
                }
            } else {
                console.log(
                'Error check_collection_queue collectionInfo of hash ',
                nftContractAddress,
                );
            }
            // END new attr type of IPFS hash

            let volume = await marketplace_calls.getVolumeByCollection(global_vars.caller, nftContractAddress);
            //update Collection nft_count
            let nft_count = (await nftRepo.count({"nftContractAddress": nftContractAddress})).count;
            const obj: collections = new collections(
                {
                    collectionOwner: collection.collectionOwner,
                    contractType: collection.contractType,
                    isCollectRoyaltyFee: collection.isCollectRoyaltyFee,
                    royaltyFee: collection.royaltyFee.replace(/,/g, ''),
                    isActive: collection.isActive,
                    showOnChainMetadata: collection.showOnChainMetadata,
                    name: collectionInfo?.name,
                    description: collectionInfo?.description,
                    avatarImage: collectionInfo?.avatarImage,
                    squareImage: collectionInfo?.squareImage,
                    headerImage: collectionInfo?.headerImage,
                    website: collectionInfo?.website,
                    twitter: collectionInfo?.twitter,
                    discord: collectionInfo?.discord,
                    telegram: collectionInfo?.telegram,
                    isDoxxed: collectionInfo?.isDoxxed == '1',
                    isDuplicationChecked: collectionInfo?.isDuplicationChecked == '1',
                    volume: volume,
                    nft_count: nft_count,
                    createdTime: new Date(),
                    updatedTime: new Date()
                }
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - updated`, nftContractAddress, obj);
            let currentCollection = await collectionsRepo.findOne({
                where: {
                    nftContractAddress: nftContractAddress
                }
            });
            if (currentCollection) {
                if (currentCollection.avatarImage && currentCollection.avatarImage != obj.avatarImage) {
                    try {
                        await imageRemoveQueueRepo.create({
                            input: currentCollection.avatarImage,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                    }
                    console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Added ${currentCollection.avatarImage} to remove image queue`);
                }
                if (currentCollection.squareImage && currentCollection.squareImage != obj.squareImage) {
                    try {
                        await imageRemoveQueueRepo.create({
                            input: currentCollection.squareImage,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                    }
                    console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Added ${currentCollection.squareImage} to remove image queue`);
                }
                if (currentCollection.headerImage && currentCollection.headerImage != obj.headerImage) {
                    try {
                        await imageRemoveQueueRepo.create({
                            input: currentCollection.headerImage,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                    }
                    console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Added ${currentCollection.headerImage} to remove image queue`);
                }
            }
            try {
                await collectionsRepo.updateAll(obj, {nftContractAddress: nftContractAddress});
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
            }
            await collectionQueueRepo.deleteAll({nftContractAddress: nftContractAddress});
        }
    } catch (e) {
        // send_telegram_message("check_collection_queue - " + e.message);
        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
        global_vars.is_check_collection_queue = false;
    }
    global_vars.is_check_collection_queue = false;
}


export async function check_NFT_queue_all(
    api: ApiPromise,
    nftRepo: NftsSchemaRepository,
    nftQueueRepo: NftQueueSchemaRepository,
    nftQueueScanAllRepo: NftQueueScanAllSchemaRepository,
    collectionsRepo: CollectionsSchemaRepository,
) {
    if (global_vars.is_scan_all_NFTs) return;
    if (global_vars.is_check_NFT_queue_all) return;
    global_vars.is_check_NFT_queue_all = true;
    try {
        const marketplace_contract = new ContractPromise(
            localApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);
        const az_nft_contract = new ContractPromise(
            localApi,
            artzero_nft.CONTRACT_ABI,
            artzero_nft.CONTRACT_ADDRESS
        );
        artzero_nft_calls.setContract(az_nft_contract);
        const collection_contract = new ContractPromise(
            localApi,
            collection_manager.CONTRACT_ABI,
            collection_manager.CONTRACT_ADDRESS
        );
        collection_manager_calls.setContract(collection_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Start find and update status of ${MAX_NFT_QUEUE_ALL_IN_PROCESSING} NFTs in check_NFT_queue_all at ${convertToUTCTime(new Date())}`);
        // const currentTime = new Date();
        // if (currentTime.getMinutes() === TIME_RESET_NFT_QUEUE_ALL) {
        //     try {
        //         await nftQueueScanAllRepo.updateAll({
        //             isProcessing: false
        //         }, {
        //             isProcessing: true
        //         });
        //     } catch (e) {
        //         console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING: ${e.message}`);
        //     }
        // }
        let queue_data = await nftQueueScanAllRepo.find({
            where: {
                isProcessing: false
            },
            limit: MAX_NFT_QUEUE_ALL_IN_PROCESSING
        });
        if (!queue_data || queue_data.length === 0) {
            return;
        }
        for (const queueData of queue_data) {
            try {
                await nftQueueScanAllRepo.updateById(queueData._id, {
                    isProcessing: true
                });
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING: ${e.message}`);
            }
        }
        console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Stop find and update status of ${queue_data.length} NFTs in check_NFT_queue_all at ${convertToUTCTime(new Date())}`);

        let records_length = queue_data.length;
        console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Start processing ${records_length} NFTs in check_NFT_queue_all at ${convertToUTCTime(new Date())}`);
        for (const queueData of queue_data) {
            let nftContractAddress = queueData.nftContractAddress;
            let tokenID = queueData.tokenID;
            if (!nftContractAddress || !tokenID) continue;
            let found_collection = await collectionsRepo.findOne({
                where: {
                    nftContractAddress: nftContractAddress,
                }
            });
            if (!found_collection) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Collection Not found in DB 2`);
                await nftQueueScanAllRepo.deleteAll({
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
            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - NFT Contract is ready 2: `, nftContractAddress, tokenID);
            nft721_psp34_standard_calls.setContract(nft_contract);
            //Check is Locked
            let is_locked = false;
            if (found_collection.showOnChainMetadata) {
                is_locked = await nft721_psp34_standard_calls.isLockedNft(
                    nft_contract,
                    global_vars.caller,
                    {u64: tokenID}
                );
            }
            //Check total Supply
            let totalSupply = await nft721_psp34_standard_calls.getLastTokenId(
                nft_contract,
                global_vars.caller
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - totalSupply: ${totalSupply}, tokenID: ${tokenID}`);
            if (totalSupply && tokenID > totalSupply) {
                await nftQueueScanAllRepo.deleteAll({
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
                {u64: tokenID}
            );
            if (!owner) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - NFT not exist, remove from database and queue`);
                await nftQueueScanAllRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                await nftRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                //update Collection nft_count
                let nft_count = (await nftRepo.count({
                    nftContractAddress: nftContractAddress,
                })).count;
                try {
                    await collectionsRepo.updateAll(
                        {nft_count: nft_count},
                        {nftContractAddress: nftContractAddress}
                    );
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                }
                continue;
            }
            //Get all On-chain MetaData if exists
            let attributeCount = await nft721_psp34_standard_calls.getAttributeCount(
                nft_contract,
                global_vars.caller
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT}: `, attributeCount);

            let attributes: string[] = [];
            let attributeValues: string[] = [];

            // Get Metadata & traits new format
            const metaData = {
                traits: undefined,
                nftName: undefined,
                description: undefined,
                avatar: undefined
            };
            if (!found_collection.showOnChainMetadata) {
                // metaData off chain
                // - getBaseTokenUriType1
                let tokenUri = "";
                try {
                    // @ts-ignore
                    const {result, output} = await nft_contract.query[
                        "psp34Traits::tokenUri"
                        ](
                        global_vars.caller,
                        {value: 0, gasLimit: await readOnlyGasLimit(api)},
                        1
                    );
                    if (result.isOk && output) {
                        // @ts-ignore
                        tokenUri = output.toHuman()?.Ok?.replace("1.json", "");
                    }
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx >> tokenUri: `, tokenUri);
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx >> tokenID: `, tokenID);
                    // - getNftAttrsType1
                    const offChainData = await APICall.getMetadataOffChain({
                        tokenUri,
                        tokenID,
                    });
                    // - reformat attributes
                    metaData.traits = offChainData?.attributes?.reduce((p: any, c: any) => {
                        return {...p, [c.trait_type]: c.value};
                    }, {});
                    metaData.nftName = offChainData?.name;
                    metaData.description = offChainData?.description;
                    metaData.avatar = offChainData?.image;
                } catch (error) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx>> psp34Traits::tokenUri error.message: ${error.message}`);
                    send_telegram_message(
                        `psp34Traits::tokenUri >> check_NFT_queue - nftContractAddress:${nftContractAddress} - tokenUri:${tokenUri} - tokenID:${tokenID}: ${error.message}`
                    );
                }
            }
            //Get all On-chain MetaData if exists
            if (found_collection?.showOnChainMetadata) {
                // TODO: New Version
                // New attr getter format
                const res = await nft721_psp34_standard_calls.getAttributes(
                    nft_contract,
                    global_vars.caller,
                    {u64: tokenID},
                    ["metadata"]
                );
                if (res && res[0]) {
                    const nftInfo = await APICall.getNftInfoByHash({
                        hash: res[0],
                    });
                    // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - nftInfo: `, nftInfo);
                    if (!nftInfo) continue;
                    metaData.nftName = nftInfo?.name;
                    metaData.description = nftInfo?.description;
                    metaData.avatar = nftInfo?.image;
                    const attrsArr = nftInfo?.attributes;
                    /**
                     * Expect:
                     *  "traits": {
                     *     "Background": "Blue",
                     *     "Hair": "Yellow",
                     *   }
                     */
                    const traits = [...attrsArr].reduce(
                        (p, c) => (!!c ? {...p, [c.name]: c.value} : p),
                        {}
                    );
                    metaData.traits = traits;
                    // END - Reformat metaData & traits for rarity & filter
                }
            }

            //Get For Sale Information
            let forSaleInformation = await marketplace_calls.getNftSaleInfo(
                global_vars.caller,
                nftContractAddress,
                {u64: tokenID}
            );
            let obj: nfts = new nfts(
                {
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
                    updatedTime: new Date(),
                    ...metaData
                }
            );
            let found = await nftRepo.findOne({
                where: {
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                }
            });
            if (found) {
                console.log(
                    `${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Updating new NFT Information to DB: `,
                    nftContractAddress,
                    tokenID
                );
                try {
                    await nftRepo.updateById(found._id, obj);
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                }
            } else {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Adding new NFT to DB`);
                obj.nftContractAddress = nftContractAddress;
                obj.tokenID = tokenID;
                obj.createdTime = new Date();
                try {
                    await nftRepo.create(obj);
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                }
                //update Collection nft_count
                let nft_count = (await nftRepo.count({
                    nftContractAddress: nftContractAddress,
                })).count;
                try {
                    await collectionsRepo.updateAll(
                        {nft_count: nft_count},
                        {nftContractAddress: nftContractAddress}
                    );
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                }
            }
            try {
                await nftQueueScanAllRepo.deleteById(queueData._id);
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING: ${e.message}`);
            }
        }
        console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Stop processing ${records_length} in check_NFT_queue_all at ${convertToUTCTime(new Date())}`);
    } catch (e) {
        send_telegram_message("check_NFT_queue_all - " + e.message);
        global_vars.is_check_NFT_queue_all = false;
    }
    global_vars.is_check_NFT_queue_all = false;
}

export async function scanAllNFTs(
    api: ApiPromise,
    nftRepo: NftsSchemaRepository,
    nftQueueRepo: NftQueueSchemaRepository,
    nftQueueScanAllRepo: NftQueueScanAllSchemaRepository,
    collectionsRepo: CollectionsSchemaRepository,
    collectionQueueRepo: CollectionQueueSchemaRepository,
) {
    await delay(3000);
    if (global_vars.is_scan_all_NFTs) return;
    global_vars.is_scan_all_NFTs = true;
    try {
        const marketplace_contract = new ContractPromise(
            localApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);
        const az_nft_contract = new ContractPromise(
            localApi,
            artzero_nft.CONTRACT_ABI,
            artzero_nft.CONTRACT_ADDRESS
        );
        artzero_nft_calls.setContract(az_nft_contract);
        const collection_contract = new ContractPromise(
            localApi,
            collection_manager.CONTRACT_ABI,
            collection_manager.CONTRACT_ADDRESS
        );
        collection_manager_calls.setContract(collection_contract);

        try {
            await nftQueueScanAllRepo.updateAll({
                isProcessing: false
            }, {
                isProcessing: true
            });
        } catch (e) {
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
        }

        let data = await collectionsRepo.find({
            where: {
                isActive: true
            },
            order: ["index ASC"]
        });
        let records_length = data.length;
        for (let j = 0; j < records_length; j++) {
            let nftContractAddress = data[j].nftContractAddress;
            if (!nftContractAddress) continue;
            try {
                const currentData = await collectionQueueRepo.findOne({
                    where: {
                        nftContractAddress: nftContractAddress
                    }
                });
                if (currentData) {
                    await collectionQueueRepo.updateById(currentData._id, {
                        type: "update",
                        nftContractAddress: nftContractAddress,
                        updatedTime: new Date()
                    })
                } else {
                    await collectionQueueRepo.create({
                        type: "update",
                        nftContractAddress: nftContractAddress,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                }
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
            }
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - added Collection update to queue: `, nftContractAddress);
            const nft_contract = new ContractPromise(
                api,
                nft721_psp34_standard.CONTRACT_ABI,
                nftContractAddress
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - NFT Contract is ready 3`);
            nft721_psp34_standard_calls.setContract(nft_contract);
            let totalSupply = await nft721_psp34_standard_calls.getTotalSupply(
                nft_contract,
                global_vars.caller
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - totalSupply: `, totalSupply);
            if (totalSupply == 0) continue;
            for (let index = 1; index <= totalSupply; index++) {
                let queue_data = await nftQueueScanAllRepo.findOne({
                    where: {
                        nftContractAddress: nftContractAddress,
                        tokenID: index,
                    }
                });
                if (queue_data) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL}: `, {queue_data: queue_data?.tokenID});
                } else {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - added NFT update to queue: `, index);
                    try {
                        await nftQueueScanAllRepo.create(new nftqueuealls({
                            type: "update",
                            nftContractAddress: nftContractAddress,
                            tokenID: index,
                            isProcessing: false,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        }));
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
                    }
                }
            }
            await delay(500);
        }
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
        send_telegram_message("scanAllNFTs - " + e.message);
    }
    global_vars.is_scan_all_NFTs = false;
    await check_NFT_queue_all(
        api,
        nftRepo,
        nftQueueRepo,
        nftQueueScanAllRepo,
        collectionsRepo,
    );
}

export async function check_NFT_queue(
    api: ApiPromise,
    nftRepo: NftsSchemaRepository,
    nftQueueRepo: NftQueueSchemaRepository,
    collectionsRepo: CollectionsSchemaRepository,
    blackListRepo: BlackListRepository,
    nftQueueData?: nftqueues
) {
    if (global_vars.is_check_NFT_queue) return;
    global_vars.is_check_NFT_queue = true;
    try {
        const marketplace_contract = new ContractPromise(
            globalApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);
        const az_nft_contract = new ContractPromise(
            globalApi,
            artzero_nft.CONTRACT_ABI,
            artzero_nft.CONTRACT_ADDRESS
        );
        artzero_nft_calls.setContract(az_nft_contract);
        const collection_contract = new ContractPromise(
            globalApi,
            collection_manager.CONTRACT_ABI,
            collection_manager.CONTRACT_ADDRESS
        );
        collection_manager_calls.setContract(collection_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Checking for NFT Queue ...`);
        let queue_data: nftqueues[] = [];
        if (nftQueueData) {
            queue_data.push(nftQueueData);
        } else {
            queue_data = await nftQueueRepo.find({});
        }
        let records_length = queue_data.length;
        // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Start debug NFT Queue`);
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - NFT Queue length: `, records_length);
        for (let j = 0; j < records_length; j++) {
            let nftContractAddress: string | undefined = queue_data[j].nftContractAddress;
            if (!nftContractAddress) continue;
            let tokenID = queue_data[j].tokenID;
            if (!tokenID) continue;
            let found_collection = await collectionsRepo.findOne({
                where: {
                    nftContractAddress: nftContractAddress,
                }
            });
            if (!found_collection) {
                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Collection Not found in DB`, nftContractAddress);
                await nftQueueRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                continue;
            }
            if ((found_collection && (await isBlackListCollection(blackListRepo, nftContractAddress)))) {
                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - WARNING: Collection in black list - ${nftContractAddress}`);
                await nftQueueRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                continue;
            }
            console.log({nftContractAddress: nftContractAddress});
            const nft_contract = new ContractPromise(
                api,
                nft721_psp34_standard.CONTRACT_ABI,
                nftContractAddress
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - NFT Contract is ready 1 `, nftContractAddress, tokenID);
            nft721_psp34_standard_calls.setContract(nft_contract);
            //Check is Locked
            let is_locked = false;
            if (found_collection.showOnChainMetadata) {
                is_locked = await nft721_psp34_standard_calls.isLockedNft(
                    nft_contract,
                    global_vars.caller,
                    {u64: tokenID}
                );
            }
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - nftContractAddress: `, nftContractAddress);
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - global_vars.caller: `, global_vars.caller);
            //Check total Supply
            let totalSupply = await nft721_psp34_standard_calls.getLastTokenId(
                nft_contract,
                global_vars.caller
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - totalSupply: ${totalSupply}, tokenID: ${tokenID}`);
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - After check totalSupply`);
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Before check tokenID > totalSupply`);
            if (totalSupply && tokenID > totalSupply) {
                await nftQueueRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                continue;
            }
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - After check tokenID > totalSupply`);
            //check if the token exists, if not delete from the database as token can be burnt
            //Get Owner
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Before check owner`);
            let owner = await nft721_psp34_standard_calls.ownerOf(
                nft_contract,
                global_vars.caller,
                {u64: tokenID}
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - owner: `, owner);
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - After check owner`);
            if (!owner) {
                // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Check owner and remove from database and queue`);
                await nftQueueRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                await nftRepo.deleteAll({
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                });
                //update Collection nft_count
                let nft_count = (await nftRepo.count({
                    nftContractAddress: nftContractAddress,
                })).count;
                try {
                    await collectionsRepo.updateAll(
                        {nft_count: nft_count},
                        {nftContractAddress: nftContractAddress}
                    );
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                }
                continue;
            }
            // Get Metadata & traits new format
            const metaData = {
                traits: undefined,
                nftName: undefined,
                description: undefined,
                avatar: undefined
            };
            if (!found_collection.showOnChainMetadata) {
                // metaData off chain
                // - getBaseTokenUriType1
                let tokenUri = "";
                try {
                    // @ts-ignore
                    const {result, output} = await nft_contract.query[
                        "psp34Traits::tokenUri"
                        ](
                        global_vars.caller,
                        {value: 0, gasLimit: await readOnlyGasLimit(api)},
                        1
                    );
                    if (result.isOk && output) {
                        // @ts-ignore
                        tokenUri = output.toHuman()?.Ok?.replace("1.json", "");
                    }
                    // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx >> tokenUri: `, tokenUri);
                    // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx >> tokenID: `, tokenID);
                    // - getNftAttrsType1
                    const offChainData = await APICall.getMetadataOffChain({
                        tokenUri,
                        tokenID,
                    });
                    // - reformat attributes
                    metaData.traits = offChainData?.attributes?.reduce((p: any, c: any) => {
                        return {...p, [c.trait_type]: c.value};
                    }, {});
                    metaData.nftName = offChainData?.name;
                    metaData.description = offChainData?.description;
                    metaData.avatar = offChainData?.image;
                } catch (error) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx>> psp34Traits::tokenUri error.message: ${error.message}`);
                    send_telegram_message(
                        `psp34Traits::tokenUri >> check_NFT_queue - nftContractAddress:${nftContractAddress} - tokenUri:${tokenUri} - tokenID:${tokenID}: ${error.message}`
                    );
                }
            }
            //Get all On-chain MetaData if exists
            let attributes: string[] = [];
            let attributeValues: string[] = [];
            if (found_collection?.showOnChainMetadata) {
                // TODO: Old Version
                // let attributeCount: number =
                //     await nft721_psp34_standard_calls.getAttributeCount(
                //         nft_contract,
                //         global_vars.caller
                //     );
                // console.log("attributeCount", attributeCount);
                // for (let i = 1; i <= attributeCount; i++) {
                //     let attribute = await nft721_psp34_standard_calls.getAttributeName(
                //         nft_contract,
                //         global_vars.caller,
                //         i
                //     );
                //     attributes.push(attribute);
                // }
                // console.log("attributes", attributes);
                // attributeValues = await nft721_psp34_standard_calls.getAttributes(
                //     nft_contract,
                //     global_vars.caller,
                //     {u64: tokenID},
                //     attributes
                // );
                // console.log("attributeValues", attributeValues);

                // TODO: New Version
                // New attr getter format
                const res = await nft721_psp34_standard_calls.getAttributes(
                    nft_contract,
                    global_vars.caller,
                    {u64: tokenID},
                    ["metadata"]
                );
                if (res && res[0]) {
                    const nftInfo = await APICall.getNftInfoByHash({
                        hash: res[0],
                    });
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - nftInfo: `, nftInfo);
                    if (!nftInfo) continue;
                    metaData.nftName = nftInfo?.name;
                    metaData.description = nftInfo?.description;
                    metaData.avatar = nftInfo?.image;
                    const attrsArr = nftInfo?.attributes;
                    /**
                     * Expect:
                     *  "traits": {
                     *     "Background": "Blue",
                     *     "Hair": "Yellow",
                     *   }
                     */
                    const traits = [...attrsArr].reduce(
                        (p, c) => (!!c ? {...p, [c.name]: c.value} : p),
                        {}
                    );
                    metaData.traits = traits;
                    // END - Reformat metaData & traits for rarity & filter
                }

                // TODO: Old Version
                // // Reformat metaData & traits for rarity & filter
                // // Add to NFT database
                // metaData.nftName = attributeValues[0];
                // metaData.description = attributeValues[1];
                // metaData.avatar = attributeValues[2];
                // const attrsList = attributes.slice(3, attributes.length);
                // const attrsValList = attributeValues.slice(3, attributeValues.length);
                // metaData.traits = [...attrsValList].reduce(
                //     (p, c, i) => (!!c ? {...p, [attrsList[i]]: c} : p),
                //     {}
                // );
                // // END - Reformat metaData & traits for rarity & filter
            }
            //Get For Sale Information
            let forSaleInformation = await marketplace_calls.getNftSaleInfo(
                global_vars.caller,
                nftContractAddress,
                {u64: tokenID}
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - forSaleInformation: `, forSaleInformation);
            let obj: nfts = new nfts(
                {
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
                }
            );
            let found = await nftRepo.findOne({
                where: {
                    nftContractAddress: nftContractAddress,
                    tokenID: tokenID,
                }
            });
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR}:`, {found: found});
            if (found) {
                console.log(
                    `${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Updating new NFT Information to DB: `,
                    nftContractAddress,
                    tokenID
                );
                try {
                    await nftRepo.updateAll(
                        obj,
                        {nftContractAddress: nftContractAddress, tokenID: tokenID},
                    );
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                }
            } else {
                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Adding new NFT to DB`);
                obj.nftContractAddress = nftContractAddress;
                obj.tokenID = tokenID;
                try {
                    await nftRepo.create(obj);
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                }
                //update Collection nft_count
                let nft_count = (await nftRepo.count({
                    nftContractAddress: nftContractAddress,
                })).count;
                try {
                    await collectionsRepo.updateAll(
                        {nft_count: nft_count},
                        {nftContractAddress: nftContractAddress}
                    );
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                }
            }
            // Re-calculate rarity
            // fetch all NFTs & update rarity table to db of Collection
            // after update NFT info/ or add new NFT to db
            let allNFTsFound = await nftRepo.find({
                where: {
                    nftContractAddress: nftContractAddress
                }
            });
            const rarityTable: any = {};
            allNFTsFound.map((item: any) => {
                const traitsMap = item.traits;
                // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR}: `, {traitsMap: traitsMap});
                if (traitsMap) {
                    const traitsMapObj: any = item.traits;
                    Object.entries(traitsMapObj).map(([k, v]) => {
                        if (!rarityTable[k]) rarityTable[k] = [];
                        const idx = rarityTable[k].findIndex((i: any) => i.name === v);
                        idx === -1 ? rarityTable[k].push({name: v, count: 1}) : rarityTable[k][idx].count++;
                    });
                }
            });
            // console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR}: `, {rarityTable: JSON.stringify(rarityTable)});
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
            try {
                await collectionsRepo.updateAll(
                    {rarityTable: rarityTable},
                    {nftContractAddress: nftContractAddress}
                );
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
            }
            // END - Re-calculate rarity
            await nftQueueRepo.deleteAll({
                nftContractAddress: nftContractAddress,
                tokenID: tokenID,
            });
        }
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - xx>> e.message: `, e.message);
        send_telegram_message("check_NFT_queue - " + e.message);
        global_vars.is_check_NFT_queue = false;
    }
    global_vars.is_check_NFT_queue = false;
}

// Only run at TGE once all minted --> no need
export async function check_new_AZ_NFTs(
    nftRepo: NftsSchemaRepository,
    nftQueueRepo: NftQueueSchemaRepository,
) {
    if (global_vars.is_check_new_AZ_NFT) return;
    global_vars.is_check_new_AZ_NFT = true;
    try {
        const marketplace_contract = new ContractPromise(
            globalApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);
        const az_nft_contract = new ContractPromise(
            globalApi,
            artzero_nft.CONTRACT_ABI,
            artzero_nft.CONTRACT_ADDRESS
        );
        artzero_nft_calls.setContract(az_nft_contract);
        const collection_contract = new ContractPromise(
            globalApi,
            collection_manager.CONTRACT_ABI,
            collection_manager.CONTRACT_ADDRESS
        );
        collection_manager_calls.setContract(collection_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Checking New AZ NFTs ...`);
        //read current database to get total NFTs
        global_vars.az_nft_count_db = (await nftRepo.count({
            nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
        })).count;
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - AZ NFT Count in DB: `, global_vars.az_nft_count_db);
        //Read current total supply
        const lastTokenId = await artzero_nft_calls.getLastTokenId(
            global_vars.caller
        );
        global_vars.az_nft_count_contract = lastTokenId ? parseInt(lastTokenId) : 0;
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - AZ NFT Count in Contract: `, global_vars.az_nft_count_contract);
        if (global_vars.az_nft_count_contract > global_vars.az_nft_count_db) {
            for (
                let i = global_vars.az_nft_count_db + 1;
                i <= global_vars.az_nft_count_contract;
                i++
            ) {
                let queue_data = await nftQueueRepo.findOne({
                    where: {
                        nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
                        tokenID: i,
                    }
                });
                if (!queue_data) {
                    let owner = await artzero_nft_calls.ownerOf(global_vars.caller, {
                        u64: i,
                    });
                    if (owner) {
                        let found = await nftRepo.findOne({
                            where: {
                                nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
                                tokenID: i,
                            }
                        });
                        if (!found) {
                            try {
                                await nftQueueRepo.create({
                                    type: "update",
                                    nftContractAddress: artzero_nft.CONTRACT_ADDRESS,
                                    tokenID: i,
                                    createdTime: new Date(),
                                    updatedTime: new Date()
                                });
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                            }
                        }
                    }
                    await delay(1000);
                }
            }
        }
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
        send_telegram_message("check_new_AZ_NFTs - " + e.message);
        global_vars.is_check_new_AZ_NFT = false;
    }
    global_vars.is_check_new_AZ_NFT = false;
}

export async function checkAllWhiteListQueue(
    api: ApiPromise,
    projectsRepo: ProjectsSchemaRepository,
    projectWhitelistQueuesRepo: ProjectWhitelistQueuesRepository,
    callerAccount: string,
    nftContractAddress?: string
) {
    if (global_vars.is_check_project_queue_whitelist) return;
    global_vars.is_check_project_queue_whitelist = true;

    try {
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - Checking for Project Whitelist Queue ...`);
        let projectsData: projects[] = [];
        if (!nftContractAddress) {
            projectsData = await projectsRepo.find({});    // switch to projectWhitelistQueuesRepo later
        } else {
            const currentProject = await projectsRepo.findOne({
                where: {
                    nftContractAddress: nftContractAddress
                }
            });
            if (currentProject) {
                projectsData.push(currentProject);
            }
        }
        let recordsLength = projectsData.length;
        console.log({recordsLength: recordsLength});
        for (let j = 0; j < recordsLength; j++) {
            let project_contract_address = projectsData[j].nftContractAddress;
            if (!project_contract_address) continue;
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - Start checkAllWhiteListQueue for ${project_contract_address}: ${convertToUTCTime(new Date())}`);
            const launchpad_psp34_nft_standard_contract = new ContractPromise(
                api,
                launchpad_psp34_nft_standard.CONTRACT_ABI,
                project_contract_address
            );
            // TODO: Update availableTokenAmount first!
            try {
                const availableTokenAmount =
                    await launchpad_psp34_nft_standard_calls.getAvailableTokenAmount(
                        api,
                        launchpad_psp34_nft_standard_contract,
                        global_vars.caller
                    );
                await projectsRepo.updateById(projectsData[j]._id, {
                    availableTokenAmount: (availableTokenAmount) ? parseInt(convertNumberWithoutCommas(availableTokenAmount)) : 0,
                    updatedTime: new Date()
                });
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - ERROR: ${e.message}`);
            }
            // TODO: Update whitelist data
            // let project_information_hash = await launchpad_psp34_nft_standard_calls.getProjectInfo(
            //     launchpad_psp34_nft_standard_contract,
            //     callerAccount
            // );
            // console.log({project_information_hash: project_information_hash});
            const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(
                api,
                launchpad_psp34_nft_standard_contract,
                callerAccount
            );
            if (!totalPhase) continue;
            let whiteListData: ProjectWhitelistData[] = [];
            for (let phaseId = 1; phaseId <= totalPhase; phaseId++) {
                const whiteListUserData = await checkWhiteList(
                    api,
                    launchpad_psp34_nft_standard_contract,
                    callerAccount,
                    project_contract_address,
                    phaseId
                );
                const phaseData = await getPhaseData(
                    api,
                    launchpad_psp34_nft_standard_contract,
                    callerAccount,
                    project_contract_address,
                    phaseId
                );
                if (whiteListUserData) {
                    whiteListData.push(new ProjectWhitelistData({
                        phaseId: phaseId,
                        userData: whiteListUserData,
                        phaseData: phaseData,
                        isActive: phaseData?.isActive
                    }));
                }
            }
            try {
                await projectsRepo.updateById(projectsData[j]._id, {
                    whiteList: whiteListData,
                    updatedTime: new Date()
                });
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - ERROR: ${e.message}`);
            }
            await projectWhitelistQueuesRepo.deleteAll({
                nftContractAddress: project_contract_address,
            });
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - Stop checkAllWhiteListQueue for ${project_contract_address}: ${convertToUTCTime(new Date())}`);
        }
    } catch (e) {
        send_telegram_message("check_project_queue - " + e.message);
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - ERROR: ${e.message}`);
    }
    global_vars.is_check_project_queue_whitelist = false;
}

export async function getPhaseData(
    api: ApiPromise,
    contract: ContractPromise,
    callerAccount: string,
    selectedProjectAddress: string,
    phaseId: number,
): Promise<WhiteListPhaseData | undefined> {
    const data = await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
        api,
        contract,
        callerAccount,
        phaseId
    );
    const totalCountWLAddress = await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
        api,
        contract,
        callerAccount,
        phaseId
    );
    if (!data) return undefined;
    return new WhiteListPhaseData({
        // info relate to public
        publicMintingFee: strToNumber(data?.publicMintingFee),
        publicMaxMintingAmount: strToNumber(data?.publicMaxMintingAmount), // max amount per mint
        publicMintingAmount: strToNumber(data?.publicMintingAmount), // total NFT amount of PL portion
        publicClaimedAmount: strToNumber(data?.publicClaimedAmount),
        publicRemainAmount: strToNumber(data?.publicMintingAmount) - strToNumber(data.publicClaimedAmount),


        // info relate to WL
        whitelistAmount: strToNumber(data?.whitelistAmount), // total NFT amount of WL portion
        claimedAmount: strToNumber(data?.claimedAmount),
        totalCountWLAddress: strToNumber(totalCountWLAddress), // WL address total count

        // common info
        totalAmount: strToNumber(data?.totalAmount), // total NFT amount of whole phase
        isActive: data?.isActive,
        isPublic: data?.isPublic,
        title: data?.title,
        startTime: strToNumber(data?.startTime),
        endTime: strToNumber(data?.endTime),
        createdTime: new Date(),
        updatedTime: new Date()

        // expect data return on-chain
        // {
        //     "isActive": true,
        //     "title": "Phase Name Test proj2",
        //     "isPublic": true,
        //     "publicMintingFee": "9,990,000,000,000",
        //     "publicMintingAmount": "222",
        //     "publicMaxMintingAmount": "5",
        //     "publicClaimedAmount": "0",
        //     "whitelistAmount": "42",
        //     "claimedAmount": "0",
        //     "totalAmount": "264",
        //     "startTime": "1,678,156,200,000",
        //     "endTime": "1,678,156,500,000"
        // }

        // current return of phase data
        // {
        //     "phaseId": 1,
        //     "userData": [],
        //     "phaseData": {
        //         "publicClaimedAmount": 0,
        //         "publicRemainAmount": 222,
        //         "publicMintingFee": 9990000000000,
        //         "publicMintingAmount": 222,
        //         "publicMaxMintingAmount": 5,
        //         "totalCountWLAddress": 0,
        //         "whitelistAmount": 42,
        //         "claimedAmount": 0,
        //         "totalAmount": 264,
        //         "isActive": true,
        //         "startTime": 1678156200000,
        //         "endTime": 1678156500000,
        //         "createdTime": "2023-03-09T02:20:48.790Z",
        //         "updatedTime": "2023-03-09T02:20:48.790Z"
        //     },
        //     "isActive": true => REMOVE
        // }
    });
}

// suggest /getWhitelistAddressesOfPhase or whatever
// return array list of object if any
export async function checkWhiteList(
    api: ApiPromise,
    contract: ContractPromise,
    callerAccount: string,
    selectedProjectAddress: string,
    phaseId: number
): Promise<WhiteListUserData[] | null> {
    try {
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
            api,
            launchpad_psp34_nft_standard.CONTRACT_ABI,
            selectedProjectAddress
        );
        launchpad_psp34_nft_standard_calls.setContract(
            launchpad_psp34_nft_standard_contract
        );
        const totalPhaseAccountLink =
            await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
                api,
                contract,
                callerAccount,
                phaseId
            );
        const userPublicClaimedAmount = await launchpad_psp34_nft_standard_calls.getPhaseAccountPublicClaimedAmount(
            api,
            callerAccount,
            selectedProjectAddress,
            phaseId
        );
        let whiteListUserDataTableTmp: WhiteListUserData[] = [];
        for (let i = 0; i < totalPhaseAccountLink; i++) {
            const whitelistPhaseAccountAddress =
                await launchpad_psp34_nft_standard_calls.getPhaseAccountLink(
                    api,
                    contract,
                    callerAccount,
                    phaseId,
                    i
                );
            const whiteListData =
                await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
                    api,
                    contract,
                    callerAccount,
                    phaseId,
                    whitelistPhaseAccountAddress
                );
            if (whiteListData) {
                const whiteListUserData = new WhiteListUserData(
                    {
                        address: whitelistPhaseAccountAddress,
                        whitelistAmount: whiteListData.whitelistAmount,
                        claimedAmount: whiteListData.claimedAmount,
                        mintingFee: convertStringToPrice(whiteListData.mintingFee),
                        userPublicClaimedAmount: (userPublicClaimedAmount) ? parseFloat(userPublicClaimedAmount) : 0,
                        phaseId: phaseId
                    }
                );
                whiteListUserDataTableTmp.push(whiteListUserData);
            }
        }
        return whiteListUserDataTableTmp;
    } catch (e) {
        console.log(`ERROR: ${e.message}`);
    }
    return [];
}

export async function check_new_projects(
    api: ApiPromise,
    projectsRepo: ProjectsSchemaRepository
) {
    if (global_vars.is_check_new_projects) return;
    global_vars.is_check_new_projects = true;
    try {
        const launchpad_contract = new ContractPromise(
            globalApi,
            launchpad_manager.CONTRACT_ABI,
            launchpad_manager.CONTRACT_ADDRESS
        );
        launchpad_manager_calls.setContract(launchpad_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Checking New Projects ...`);
        let project_count_contract = await launchpad_manager_calls.getProjectCount(
            global_vars.caller
        );
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Projects Count in Contract`, project_count_contract);
        global_vars.project_count_contract = project_count_contract;

        let project_count_db = (await projectsRepo.count({})).count;
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Count in DB`, project_count_db);
        global_vars.project_count_db = project_count_db;
        if (project_count_db < project_count_contract) {
            for (let i = project_count_db + 1; i <= project_count_contract; i++) {
                let project_contract_address =
                    await launchpad_manager_calls.getProjectById(global_vars.caller, i);
                const project_contract = new ContractPromise(
                    api,
                    launchpad_psp34_nft_standard.CONTRACT_ABI,
                    project_contract_address
                );
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Contract Address: `, project_contract_address);
                let project_data = await launchpad_manager_calls.getProjectByNftAddress(
                    global_vars.caller,
                    project_contract_address
                );
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Data: `, project_data);
                let project_information_hash =
                    await launchpad_psp34_nft_standard_calls.getProjectInfo(
                        project_contract,
                        global_vars.caller
                    );
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Information Hash: `, project_information_hash);
                let owner_project_address =
                    await launchpad_psp34_nft_standard_calls.getOwner(
                        project_contract,
                        global_vars.caller
                    );
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Owner Project Address: `, owner_project_address);
                const availableTokenAmount =
                    await launchpad_psp34_nft_standard_calls.getAvailableTokenAmount(
                        api,
                        project_contract,
                        global_vars.caller
                    );
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - availableTokenAmount: `, availableTokenAmount);
                if (project_information_hash && project_data) {
                    const {data} = await axios({
                        url: `${CACHE_IMAGE.INFURA_IPFS_BASE_URL}${project_information_hash}`,
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "cache-control": "no-cache",
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - data xx>>: `, data);
                    let found = await projectsRepo.findOne({
                        where: {
                            nftContractAddress: project_contract_address,
                        }
                    });
                    if (!found) {
                        const obj: projects = new projects(
                            {
                                index: i,
                                collectionOwner: owner_project_address,
                                nftContractAddress: project_contract_address,
                                isActive: project_data.isActive,
                                name: data.name,
                                description: data.description,
                                teamMembers: JSON.stringify(data.team_members),
                                roadmaps: JSON.stringify(data.roadmaps),
                                avatarImage: data.avatar,
                                squareImage: data.headerSquare,
                                headerImage: data.header,
                                website: data.website,
                                twitter: data.twitter,
                                discord: data.discord,
                                telegram: data.telegram,
                                nftName: data.nft_name,
                                nftSymbol: data.nft_symbol,
                                startTime: parseInt(convertNumberWithoutCommas(project_data.startTime)),
                                endTime: parseInt(convertNumberWithoutCommas(project_data.endTime)),
                                nft_count: parseInt(convertNumberWithoutCommas(project_data.totalSupply)),
                                availableTokenAmount: (availableTokenAmount) ? parseInt(convertNumberWithoutCommas(availableTokenAmount)) : 0,
                                updatedTime: new Date(),
                                createdTime: new Date()
                            }
                        );
                        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Data: `, obj);
                        try {
                            await projectsRepo.create(obj);
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
                        }
                    }
                }
            }
        }
    } catch (e) {
        send_telegram_message("check_new_projects - " + e.message);
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
        global_vars.is_check_new_projects = false;
    }
    global_vars.is_check_new_projects = false;
}

export async function check_project_queue(
    api: ApiPromise,
    projectsRepo: ProjectsSchemaRepository,
    projectQueueRepo: ProjectQueueSchemaRepository
) {
    if (global_vars.is_check_collection_queue) return;
    global_vars.is_check_collection_queue = true;
    try {
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Checking for Project Queue ...`);
        let queue_data = await projectQueueRepo.find({});
        let records_length = queue_data.length;
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project queue length:`, records_length);
        for (let j = 0; j < records_length; j++) {
            let project_contract_address = queue_data[j].nftContractAddress;
            if (!project_contract_address) continue;
            const project_contract = new ContractPromise(
                api,
                launchpad_psp34_nft_standard.CONTRACT_ABI,
                project_contract_address
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Contract Address`, project_contract_address);
            let project_data = await launchpad_manager_calls.getProjectByNftAddress(
                global_vars.caller,
                project_contract_address
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Data`, project_data);
            let project_information_hash =
                await launchpad_psp34_nft_standard_calls.getProjectInfo(
                    project_contract,
                    global_vars.caller
                );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Project Information Hash`, project_information_hash);
            let owner_project_address =
                await launchpad_psp34_nft_standard_calls.getOwner(
                    project_contract,
                    global_vars.caller
                );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Owner Project Address`, owner_project_address);
            const availableTokenAmount =
                await launchpad_psp34_nft_standard_calls.getAvailableTokenAmount(
                    api,
                    project_contract,
                    global_vars.caller
                );
            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - availableTokenAmount: `, availableTokenAmount);
            if (project_information_hash && project_data) {
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Passing check project information and project data`);
                const {data} = await axios({
                    url: `${CACHE_IMAGE.INFURA_IPFS_BASE_URL}${project_information_hash}`,
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - xx>> check_project_queue data `, data);
                const obj: projects = new projects(
                    {
                        collectionOwner: owner_project_address,
                        nftContractAddress: project_contract_address,
                        isActive: project_data.isActive,
                        name: data.name,
                        description: data.description,
                        teamMembers: JSON.stringify(data.team_members),
                        roadmaps: JSON.stringify(data.roadmaps),
                        avatarImage: data.avatar,
                        squareImage: data.headerSquare,
                        headerImage: data.header,
                        website: data.website,
                        twitter: data.twitter,
                        discord: data.discord,
                        telegram: data.telegram,
                        nftName: data.nft_name,
                        nftSymbol: data.nft_symbol,
                        startTime: parseInt(convertNumberWithoutCommas(project_data.startTime)),
                        endTime: parseInt(convertNumberWithoutCommas(project_data.endTime)),
                        nft_count: parseInt(convertNumberWithoutCommas(project_data.totalSupply)),
                        availableTokenAmount: (availableTokenAmount) ? parseInt(convertNumberWithoutCommas(availableTokenAmount)) : 0,
                        updatedTime: new Date()
                    }
                );
                console.log(obj);
                try {
                    await projectsRepo.updateAll(
                        obj,
                        {nftContractAddress: project_contract_address}
                    );
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
                }
                await projectQueueRepo.deleteAll({
                    nftContractAddress: project_contract_address,
                });
                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - updated: `, project_contract_address, obj);
            }
        }
    } catch (e) {
        send_telegram_message("check_project_queue - " + e.message);
        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
        global_vars.is_check_collection_queue = false;
    }
    global_vars.is_check_collection_queue = false;
}

export async function check_Image_queue(
    imageQueueSchemaRepo: ImageQueueSchemaRepository,
    imageRepo: ImagesSchemaRepository
) {
    if (global_vars.is_check_Image_queue) return;
    global_vars.is_check_Image_queue = true;
    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Checking for Image Queue ...`);
    let queue_data = await imageQueueSchemaRepo.find({});
    let records_length = queue_data.length;
    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Image Queue length: `, records_length);
    for (let j = 0; j < records_length; j++) {
        console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE}: `, queue_data[j]);
        let input = queue_data[j].input;
        let is1024 = queue_data[j].is1024;
        let is1440 = queue_data[j].is1440;
        let is1920 = queue_data[j].is1920;
        let is500 = queue_data[j].is500;
        let is100 = queue_data[j].is100;
        if (!input) continue;
        input = input.replace("ipfs://", "/ipfs/");
        // console.log('is CID',isIPFS.cid(input));
        // console.log('is url',isIPFS.url(input));
        // console.log('is path',isIPFS.path(input));
        // const filePath = `${__dirname}/images_cache/` + todayFolder();
        const filePath = `${process.env.CACHE_IMAGES_FOLDER}/` + todayFolder();
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true});
        }
        try {
            if (isIPFS.path(input)) {
                // let fileType = await getFileTypeFromCID(ipfs,input);
                let removed_input = input.replace('/ipfs/', '');
                const fileURL = CACHE_IMAGE.INFURA_IPFS_BASE_URL + removed_input;
                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Downloading IPFS Path: `, fileURL);
                let fileName = randomString(5);
                await download(fileURL, filePath, {filename: fileName})
                    .then(async (content: any) => {
                        // let fileType =  await FileType.fromBuffer(content, {
                        //     length: 100 // or however many bytes you need
                        // });
                        let fileType = await FileType.fromBuffer(content);
                        console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE}: `, fileType);
                        if (fileType == undefined) {
                            return;
                        }
                        let fullPath = filePath + "/" + fileName;
                        console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Download Completed: `, fullPath);
                        if (is1024) {
                            await sharp(fullPath)
                                .resize({width: 1024})
                                .toFile(filePath + "/" + fileName + "_1024." + fileType.ext);
                            console.log('Resizer 1024 Completed');
                        }
                        if (is1440) {
                            await sharp(fullPath)
                                .resize({width: 1440})
                                .toFile(filePath + "/" + fileName + "_1440." + fileType.ext);
                            console.log('Resizer 1440 Completed');
                        }
                        if (is1920) {
                            await sharp(fullPath)
                                .resize({width: 1920})
                                .toFile(filePath + "/" + fileName + "_1920." + fileType.ext);
                            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 1920 Completed`);
                        }
                        if (is500) {
                            //Resize 500
                            await sharp(fullPath)
                                .resize({width: 500})
                                .toFile(filePath + "/" + fileName + "_500." + fileType.ext);
                            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 500 Completed`);
                        }
                        if (is100) {
                            //Resize 100
                            await sharp(fullPath)
                                .resize({width: 100})
                                .toFile(filePath + "/" + fileName + "_100." + fileType.ext);
                            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 100 Completed`);
                        }
                        let found = await imageRepo.findOne({
                            where: {
                                input: input
                            }
                        });
                        if (!found) {
                            try {
                                await imageRepo.create({
                                    input: input,
                                    isCloudFlare: false,
                                    locationOrigin: fullPath,
                                    location1440: is1440 ? filePath + "/" + fileName + "_1440." + fileType.ext : "",
                                    location1920: is1920 ? filePath + "/" + fileName + "_1920." + fileType.ext : "",
                                    location1024: is1024 ? filePath + "/" + fileName + "_1024." + fileType.ext : "",
                                    location500: filePath + "/" + fileName + "_500." + fileType.ext,
                                    location100: filePath + "/" + fileName + "_100." + fileType.ext,
                                    createdTime: new Date(),
                                    updatedTime: new Date()
                                });
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                            }
                        } else {
                            let obj: images = new images({
                                isCloudFlare: false,
                            });
                            if (is1440) obj.location1440 = is1440 ? filePath + "/" + fileName + "_1440." + fileType.ext : "";
                            if (is1920) obj.location1920 = is1920 ? filePath + "/" + fileName + "_1920." + fileType.ext : "";
                            if (is1024) obj.location1024 = is1024 ? filePath + "/" + fileName + "_1024." + fileType.ext : "";
                            if (is500) obj.location500 = is500 ? filePath + "/" + fileName + "_500." + fileType.ext : "";
                            if (is100) obj.location100 = is100 ? filePath + "/" + fileName + "_100." + fileType.ext : "";
                            try {
                                await imageRepo.updateAll(obj, {input: input});
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                            }
                        }
                        // await fs.unlinkSync(fullPath);
                        await imageQueueSchemaRepo.deleteAll({input: input});
                        await delay(3000);
                    });
            } else if (isIPFS.cid(input)) {
                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Downloading CID: `, input);

                const file = CACHE_IMAGE.INFURA_IPFS_BASE_URL + input;
                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE}: `, file);
                await download(file, filePath)
                    .then(async (content) => {
                        // let fileType =  await FileType.fromBuffer(content, {
                        //     length: 100 // or however many bytes you need
                        // });
                        let fileTypeTmp = await FileType.fromBuffer(content);
                        if (fileTypeTmp == undefined) {
                            return;
                        }
                        let fileType = {
                            ext: fileTypeTmp.ext,
                            mime: fileTypeTmp.mime
                        };
                        if (fileType.ext == 'apng') {
                            fileType.ext = 'png';
                        }
                        let fullPath = filePath + "/" + input + "." + fileType.ext;
                        console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Download Completed: `, fullPath);
                        if (fileType.ext != "gif") {
                            if (is1024) {
                                //Resize 1024
                                await sharp(fullPath)
                                    .resize({width: 1024})
                                    .toFile(filePath + "/" + input + "_1024." + fileType.ext);
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE}: Resizer 1024 Completed`);
                            }
                            if (is1440) {
                                await sharp(fullPath)
                                    .resize({width: 1440})
                                    .toFile(filePath + "/" + input + "_1440." + fileType.ext);
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 1440 Completed`);
                            }
                            if (is1920) {
                                await sharp(fullPath)
                                    .resize({width: 1920})
                                    .toFile(filePath + "/" + input + "_1920." + fileType.ext);
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 1920 Completed`);
                            }
                            if (is500) {
                                //Resize 500
                                await sharp(fullPath)
                                    .resize({width: 500})
                                    .toFile(filePath + "/" + input + "_500." + fileType.ext);
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 500 Completed`);
                            }
                            if (is100) {
                                //Resize 100
                                await sharp(fullPath)
                                    .resize({width: 100})
                                    .toFile(filePath + "/" + input + "_100." + fileType.ext);
                                console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Resizer 100 Completed`);
                            }
                            let found = await imageRepo.findOne({
                                where: {
                                    input: input
                                }
                            });
                            if (!found) {
                                try {
                                    await imageRepo.create({
                                        input: input,
                                        isCloudFlare: false,
                                        locationOrigin: fullPath,
                                        location1920: is1920 ? filePath + "/" + input + "_1920." + fileType.ext : "",
                                        location1440: is1440 ? filePath + "/" + input + "_1440." + fileType.ext : "",
                                        location1024: is1024 ? filePath + "/" + input + "_1024." + fileType.ext : "",
                                        location500: filePath + "/" + input + "_500." + fileType.ext,
                                        location100: filePath + "/" + input + "_100." + fileType.ext,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                                }
                            } else {
                                let obj: images = new images({
                                    isCloudFlare: false
                                });
                                if (is1440) obj.location1440 = is1440 ? filePath + "/" + input + "_1440." + fileType.ext : "";
                                if (is1920) obj.location1920 = is1920 ? filePath + "/" + input + "_1920." + fileType.ext : "";
                                if (is1024) obj.location1024 = is1024 ? filePath + "/" + input + "_1024." + fileType.ext : "";
                                if (is500) obj.location500 = is500 ? filePath + "/" + input + "_500." + fileType.ext : "";
                                if (is100) obj.location100 = is100 ? filePath + "/" + input + "_100." + fileType.ext : "";
                                try {
                                    await imageRepo.updateAll(obj, {input: input});
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                                }
                            }
                            // await fs.unlinkSync(fullPath);
                        } else {
                            let found = await imageRepo.findOne({
                                where: {
                                    input: input
                                }
                            });
                            if (!found) {
                                try {
                                    await imageRepo.create({
                                        input: input,
                                        isCloudFlare: false,
                                        locationOrigin: fullPath,
                                        location1920: fullPath,
                                        location1440: fullPath,
                                        location1024: fullPath,
                                        location500: fullPath,
                                        location100: fullPath,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                                }
                            } else {
                                let obj: images = new images({
                                    isCloudFlare: false
                                });
                                if (is1440) obj.location1440 = fullPath;
                                if (is1920) obj.location1920 = fullPath;
                                if (is1024) obj.location1024 = fullPath;
                                if (is500) obj.location500 = fullPath;
                                if (is100) obj.location100 = fullPath;
                                try {
                                    await imageRepo.updateAll(obj, {input: input});
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                                }
                            }
                        }
                        await imageQueueSchemaRepo.deleteAll({input: input});
                        await delay(3000);
                    })
            }
            //Not recognize
            await imageQueueSchemaRepo.deleteAll({input: input});
        } catch (e) {
            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
        }
    }
    global_vars.is_check_Image_queue = false;
}

export async function scanBlocks(
    blocknumber: number,
    api: ApiPromise,
    api_launchpad_psp34_nft_standard: Abi,
    abi_marketplace_contract: Abi,
    abi_staking_contract: Abi,
    abi_collection_contract: Abi,
    scannedBlocksRepo: ScannedBlocksSchemaRepository,
    newListEventRepo: NewListEventSchemaRepository,
    unListEventRepo: UnListEventSchemaRepository,
    purchaseEventRepo: PurchaseEventSchemaRepository,
    bidWinEventRepo: BidWinEventSchemaRepository,
    stakingEventRepo: StakingEventSchemaRepository,
    claimRewardEventRepo: ClaimRewardEventSchemaRepository,
    launchpadMintingEventRepo: LaunchpadMintingEventSchemaRepository,
    withdrawEventRepo: WithdrawEventSchemaRepository,
    addRewardEventRepo: AddRewardEventSchemaRepository,
    collectionEventRepo: CollectionEventSchemaRepository,
    projectsRepo: ProjectsSchemaRepository
) {
    if (global_vars.isScanning) {
        //This to make sure always process the latest block in case still scanning old blocks
        // console.log('Process latest block: ', blocknumber);
        const blockHash = await api.rpc.chain.getBlockHash(blocknumber);
        // @ts-ignore
        const eventRecords = await api.query.system.events.at(blockHash);
        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Start processEventRecords now: ${convertToUTCTime(new Date())}`);
        await processEventRecords(
            eventRecords,
            blocknumber,
            api_launchpad_psp34_nft_standard,
            abi_marketplace_contract,
            abi_staking_contract,
            abi_collection_contract,
            newListEventRepo,
            unListEventRepo,
            purchaseEventRepo,
            bidWinEventRepo,
            stakingEventRepo,
            claimRewardEventRepo,
            launchpadMintingEventRepo,
            withdrawEventRepo,
            addRewardEventRepo,
            collectionEventRepo,
            projectsRepo
        );
        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Stop processEventRecords now: ${convertToUTCTime(new Date())}`);
        return;
    }
    global_vars.isScanning = true;
    try {
        //Check database to see the last checked blockNumber
        let lastBlock_db = await scannedBlocksRepo.findOne({
            where: {
                lastScanned: true
            }
        });
        let last_scanned_blocknumber = 0;
        if (lastBlock_db && lastBlock_db?.blockNumber) {
            last_scanned_blocknumber = lastBlock_db.blockNumber;
        } else {
            try {
                await scannedBlocksRepo.create({
                    lastScanned: true,
                    blockNumber: 0,
                    createdTime: new Date(),
                    updatedTime: new Date()
                });
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
            }
        }
        if (last_scanned_blocknumber == 0) last_scanned_blocknumber = blocknumber;
        for (let to_scan = last_scanned_blocknumber; to_scan <= blocknumber; to_scan++) {
            // console.log('Scanning block', to_scan);
            if (last_scanned_blocknumber > 0 && last_scanned_blocknumber % 43200 == 0) {
                send_telegram_message("scanBlocks - syncing " + last_scanned_blocknumber + "/" + blocknumber);
            }
            const blockHash = await api.rpc.chain.getBlockHash(to_scan);
            // @ts-ignore
            const eventRecords = await api.query.system.events.at(blockHash);
            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Start processEventRecords ${to_scan} now: ${convertToUTCTime(new Date())}`);
            await processEventRecords(
                eventRecords,
                to_scan,
                api_launchpad_psp34_nft_standard,
                abi_marketplace_contract,
                abi_staking_contract,
                abi_collection_contract,
                newListEventRepo,
                unListEventRepo,
                purchaseEventRepo,
                bidWinEventRepo,
                stakingEventRepo,
                claimRewardEventRepo,
                launchpadMintingEventRepo,
                withdrawEventRepo,
                addRewardEventRepo,
                collectionEventRepo,
                projectsRepo
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Stop processEventRecords ${to_scan} now: ${convertToUTCTime(new Date())}`);
            try {
                await scannedBlocksRepo.updateAll({
                    lastScanned: true,
                    blockNumber: to_scan,
                    updatedTime: new Date()
                });
            } catch (e) {
                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
            }
        }
    } catch (e) {
        send_telegram_message("scanBlocks - " + e.message);
    }
    global_vars.isScanning = false;
}

export async function processEventRecords(
    eventRecords: any,
    to_scan: number,
    api_launchpad_psp34_nft_standard: Abi,
    abi_marketplace_contract: Abi,
    abi_staking_contract: Abi,
    abi_collection_contract: Abi,
    newListEventRepo: NewListEventSchemaRepository,
    unListEventRepo: UnListEventSchemaRepository,
    purchaseEventRepo: PurchaseEventSchemaRepository,
    bidWinEventRepo: BidWinEventSchemaRepository,
    stakingEventRepo: StakingEventSchemaRepository,
    claimRewardEventRepo: ClaimRewardEventSchemaRepository,
    launchpadMintingEventRepo: LaunchpadMintingEventSchemaRepository,
    withdrawEventRepo: WithdrawEventSchemaRepository,
    addRewardEventRepo: AddRewardEventSchemaRepository,
    collectionEventRepo: CollectionEventSchemaRepository,
    projectsRepo: ProjectsSchemaRepository
) {
    try {
        for (const record of eventRecords) {
            // Extract the phase, event and the event types
            const {phase, event: {data, method, section}} = record;
            if (section == "contracts" && method == "ContractEmitted") {
                // console.log({record: {
                //         section: section,
                //         method: method
                //     }});
                const [accId, bytes] = data.map((data: any, _: any) => data).slice(0, 2);
                const contract_address = accId.toString();
                if (contract_address == marketplace.CONTRACT_ADDRESS) {
                    try {
                        // console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Event from Marketplace Contract...`);
                        const decodedEvent = abi_marketplace_contract.decodeEvent(bytes);
                        let event_name = decodedEvent.event.identifier;
                        const eventValues = [];

                        for (let i = 0; i < decodedEvent.args.length; i++) {
                            const value = decodedEvent.args[i];
                            eventValues.push(value.toString());
                        }
                        if (event_name == 'NewListEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                trader: reformatAddress(eventValues[0], NETWORK_SS58),
                                nftContractAddress: reformatAddress(eventValues[1], NETWORK_SS58),
                                tokenID: eventValues[2] ? JSON.parse(eventValues[2]).u64 : 0,
                                price: eventValues[3] ?  parseFloat(eventValues[3]) / 10**18 : 0,
                            }
                            let found = await newListEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await newListEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added NewListEvent: `, obj);
                            }
                        } else if (event_name == 'UnListEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                trader: reformatAddress(eventValues[0], NETWORK_SS58),
                                nftContractAddress: reformatAddress(eventValues[1], NETWORK_SS58),
                                tokenID: eventValues[2] ? JSON.parse(eventValues[2]).u64 : 0,
                            };
                            let found = await unListEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await unListEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added UnListEvent: `, obj);
                            }
                        } else if (event_name == 'PurchaseEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                buyer: reformatAddress(eventValues[0], NETWORK_SS58),
                                seller: reformatAddress(eventValues[1], NETWORK_SS58),
                                nftContractAddress: reformatAddress(eventValues[2], NETWORK_SS58),
                                tokenID: eventValues[3] ? JSON.parse(eventValues[3]).u64 : 0,
                                price: eventValues[4] ? parseFloat(eventValues[4]) / 10**18 : 0,
                                platformFee: eventValues[5] ?  parseFloat(eventValues[5]) / 10**18 : 0,
                                royaltyFee: eventValues[6] ?  parseFloat(eventValues[6]) / 10**18 : 0,
                            }
                            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - eventValues: `, eventValues);
                            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - PurchaseEvent: `, obj);
                            let found = await purchaseEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await purchaseEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added PurchaseEvent: `, obj);
                            }
                        } else if (event_name == 'BidWinEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                buyer: reformatAddress(eventValues[0], NETWORK_SS58),
                                seller: reformatAddress(eventValues[1], NETWORK_SS58),
                                nftContractAddress: reformatAddress(eventValues[2], NETWORK_SS58),
                                tokenID: eventValues[3] ? JSON.parse(eventValues[3]).u64 : 0,
                                price: eventValues[4] ?  parseFloat(eventValues[4]) / 10**18 : 0,
                                platformFee: eventValues[5] ?  parseFloat(eventValues[5]) / 10**18 : 0,
                                royaltyFee: eventValues[6] ?  parseFloat(eventValues[6]) / 10**18 : 0,
                            }
                            let found = await bidWinEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await bidWinEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added BidWinEvent: `, obj);
                            }
                        }
                        console.log(to_scan, contract_address, event_name, eventValues);
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                    }
                } else if (contract_address == staking.CONTRACT_ADDRESS) {
                    try {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Event from Staking Contract...`);
                        const decodedEvent = abi_staking_contract.decodeEvent(bytes);
                        let event_name = decodedEvent.event.identifier;
                        const eventValues = [];

                        for (let i = 0; i < decodedEvent.args.length; i++) {
                            const value = decodedEvent.args[i];
                            eventValues.push(value.toString());
                        }
                        if (event_name == 'NewStakeEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                staker: reformatAddress(eventValues[0], NETWORK_SS58),
                                eventName: 'NewStakeEvent',
                                tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
                            }
                            let found = await stakingEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await stakingEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added NewStakeEvent: `, obj);
                            }
                        } else if (event_name == 'UnstakeEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                staker: reformatAddress(eventValues[0], NETWORK_SS58),
                                eventName: 'UnstakeEvent',
                                tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
                            }
                            let found = await stakingEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await stakingEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added UnstakeEvent: `, obj);
                            }
                        } else if (event_name == 'RequestUnstakeEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                staker: reformatAddress(eventValues[0], NETWORK_SS58),
                                eventName: 'RequestUnstakeEvent',
                                tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
                            }
                            let found = await stakingEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await stakingEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added RequestUnstakeEvent: `, obj);
                            }
                        } else if (event_name == 'CancelRequestUnstakeEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                staker: reformatAddress(eventValues[0], NETWORK_SS58),
                                eventName: 'CancelRequestUnstakeEvent',
                                tokenID: eventValues[1] ? JSON.parse(eventValues[1]).u64 : 0
                            }
                            let found = await stakingEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await stakingEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added CancelRequestUnstakeEvent: `, obj);
                            }
                        } else if (event_name == 'ClaimReward') {
                            let obj = {
                                blockNumber: to_scan,
                                staker: reformatAddress(eventValues[0], NETWORK_SS58),
                                rewardAmount: eventValues[1] ? parseFloat(eventValues[1]) / 10 ** 18 : 0,
                                stakedAmount: eventValues[2] ? parseFloat(eventValues[2]) : 0
                            };
                            let found = await claimRewardEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await claimRewardEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added ClaimRewardEvent: `, obj);
                            }
                        } else if (event_name == 'WithdrawFeeEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                receiver: reformatAddress(eventValues[1], NETWORK_SS58),
                                withdrawAmount: eventValues[0] ? parseFloat(eventValues[0]) / 10 ** 18 : 0
                            };
                            let found = await withdrawEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await withdrawEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added WithdrawFeeEvent: `, obj);
                            }
                        } else if (event_name == 'LaunchpadMintingEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                mode: eventValues[0],
                                minter: reformatAddress(eventValues[1], NETWORK_SS58),
                                phaseId: parseInt(eventValues[2]),
                                mintAmount: eventValues[3] ? parseFloat(eventValues[3]) / 10 ** 18 : 0,
                                mintingFee: eventValues[4] ? parseFloat(eventValues[4]) / 10 ** 18 : 0,
                                projectMintFee: eventValues[5] ? parseFloat(eventValues[5]) / 10 ** 18 : 0
                            };
                            let found = await launchpadMintingEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await launchpadMintingEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added LaunchpadMintingEvent: `, obj);
                            }
                        } else if (event_name == 'AddReward') {
                            let obj = {
                                blockNumber: to_scan,
                                rewardAmount: eventValues[0] ? parseFloat(eventValues[0]) / 10 ** 18 : 0,
                                totalStakedAmount: eventValues[1] ? parseFloat(eventValues[1]) / 10 ** 18 : 0,
                            }
                            let found = await addRewardEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await addRewardEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added AddReward: `, obj);
                            }
                        }
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                    }
                } else if (contract_address == collection_manager.CONTRACT_ADDRESS) {
                    try {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Event from Collection Manager Contract...`);
                        const decodedEvent = abi_collection_contract.decodeEvent(bytes);
                        let event_name = decodedEvent.event.identifier;
                        const eventValues = [];

                        for (let i = 0; i < decodedEvent.args.length; i++) {
                            const value = decodedEvent.args[i];
                            eventValues.push(value.toString());
                        }

                        if (event_name == 'AddNewCollectionEvent') {
                            let obj = {
                                blockNumber: to_scan,
                                collectionOwner: reformatAddress(eventValues[0], NETWORK_SS58),
                                nftContractAddress: reformatAddress(eventValues[1], NETWORK_SS58),
                                contractType: eventValues[2],
                                isActive: (eventValues[3] == "true")
                            }
                            let found = await collectionEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await collectionEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added AddNewCollectionEvent: `, obj);
                            }
                        }
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                    }
                } else if (await checkProjectSchema(contract_address, projectsRepo)) {
                    try {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - Event from Project Contract...`);
                        const decodedEvent = api_launchpad_psp34_nft_standard.decodeEvent(bytes);
                        let event_name = decodedEvent.event.identifier;
                        // console.log({decodedEvent: decodedEvent});
                        const eventValues:any[] = [];
                        for (let i = 0; i < decodedEvent.args.length; i++) {
                            const value = decodedEvent.args[i];
                            eventValues.push(value.toString());
                        }
                        // console.log({eventValues: eventValues});
                        if (event_name == 'WithdrawFeeEvent') {
                            let obj = {
                                nftContractAddress: contract_address,
                                blockNumber: to_scan,
                                receiver: reformatAddress(eventValues[1], NETWORK_SS58),
                                withdrawAmount: eventValues[0] ? parseFloat(eventValues[0]) / 10 ** 18 : 0
                            };
                            let found = await withdrawEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await withdrawEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added WithdrawFeeEvent: `, obj);
                            }
                        } else if (event_name == 'LaunchpadMintingEvent') {
                            let obj = {
                                nftContractAddress: contract_address,
                                blockNumber: to_scan,
                                mode: eventValues[0],
                                minter: reformatAddress(eventValues[1], NETWORK_SS58),
                                phaseId: parseInt(eventValues[2]),
                                mintAmount: eventValues[3] ? parseInt(eventValues[3]) : 0,
                                mintingFee: eventValues[4] ? parseFloat(eventValues[4]) / 10 ** 18 : 0,
                                projectMintFee: eventValues[5] ? parseFloat(eventValues[5]) / 10 ** 18 : 0
                            };
                            let found = await launchpadMintingEventRepo.findOne({
                                where: obj
                            });
                            if (!found) {
                                try {
                                    await launchpadMintingEventRepo.create({
                                        ...obj,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                                }
                                console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - added LaunchpadMintingEvent: `, obj);
                            }
                        }
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
                    }
                }
            }
        }
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR} - ERROR: ${e.message}`);
    }
}

export async function auto_check_queue(
    bidsSchemaRepo: BidsSchemaRepository,
    bidQueueRepo: BidQueueSchemaRepository
) {
    if (global_vars.is_check_Bid) return;
    global_vars.is_auto_check_Bid = true;
    try {
        const marketplace_contract = new ContractPromise(
            globalApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);
        const az_nft_contract = new ContractPromise(
            globalApi,
            artzero_nft.CONTRACT_ABI,
            artzero_nft.CONTRACT_ADDRESS
        );
        artzero_nft_calls.setContract(az_nft_contract);

        // TODO: Get all Bids from network and save to bidQueue Table
        // let ret = await marketplace_calls.getAllBids(
        //     global_vars.caller,
        //     nftContractAddress,
        //     seller,
        //     {u64: tokenID}
        // );
        let bids = await bidsSchemaRepo.find({});
        let records_length = bids.length;
        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - bids length:`, records_length);
        for (let j = 0; j < records_length; j++) {
            let obj = {
                nftContractAddress: bids[j].nftContractAddress,
                tokenID: bids[j].tokenID,
                seller: bids[j].seller
            }
            //add to Bids Queue Database
            let found = await bidQueueRepo.findOne({
                where: obj
            });
            if (!found) {
                try {
                    console.log(`DEBUG: CREATE DATA IN BID_QUEUE - ${convertToUTCTime(new Date())}`);
                    await bidQueueRepo.create({
                        ...obj,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - ERROR: ${e.message}`);
                }
            }
        }
    } catch (e) {
        send_telegram_message("auto_check_queue - " + e.message);
    }
    global_vars.is_auto_check_Bid = false;
}

export async function check_bid_queue(
    bidsRepo: BidsSchemaRepository,
    bidQueueRepo: BidQueueSchemaRepository,
    nfTsRepo: NftsSchemaRepository
) {
    if (global_vars.is_check_Bid) return;
    global_vars.is_check_Bid = true;
    try {
        const marketplace_contract = new ContractPromise(
            globalApi,
            marketplace.CONTRACT_ABI,
            marketplace.CONTRACT_ADDRESS
        );
        marketplace_calls.setContract(marketplace_contract);
        const az_nft_contract = new ContractPromise(
            globalApi,
            artzero_nft.CONTRACT_ABI,
            artzero_nft.CONTRACT_ADDRESS
        );
        artzero_nft_calls.setContract(az_nft_contract);

        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - Checking for Bid Queue ...`);
        let queue_data = await bidQueueRepo.find({});
        let records_length = queue_data.length;
        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - Bid Queue length: ${records_length}`);
        for (let j = 0; j < records_length; j++) {
            let nftContractAddress = queue_data[j].nftContractAddress;
            let seller = queue_data[j].seller;
            let tokenID = queue_data[j].tokenID;
            console.log(` - ${nftContractAddress} ${seller} ${tokenID}`);
            if (!nftContractAddress || !seller || !tokenID) continue;
            let ret = await marketplace_calls.getAllBids(
                global_vars.caller,
                nftContractAddress,
                seller,
                {u64: tokenID}
            );
            console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - Result getAllBids: `, ret);
            if (!ret) {
                //Not Exist, remove queue
                try {
                    await bidQueueRepo.deleteById(queue_data[j]._id);
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - WARNING: `, e.message);
                }
            } else {
                // TODO: Check hash before call RPC, shouldn't deleteAll here! => Check if same hash, deleteById only
                await bidsRepo.deleteAll({nftContractAddress: nftContractAddress, tokenID: tokenID, seller: seller});
                //get Current NFT
                let NFT = await nfTsRepo.findOne({
                    where: {
                        nftContractAddress: nftContractAddress,
                        tokenID: tokenID
                    }
                });
                let bid_length = ret.length;
                let current_highest_bid = new BN(0);
                for (let kk = 0; kk < bid_length; kk++) {
                    let obj = {
                        nftContractAddress: nftContractAddress,
                        seller: seller,
                        tokenID: tokenID,
                        bidder: ret[kk].bidder,
                        bid_date: ret[kk].bidDate.replace(/,/g, ''),
                        bid_value: ret[kk].bidValue.replace(/,/g, '')
                    }
                    //add to Bid Database
                    try {
                        console.log(`DEBUG: CREATE DATA IN BIDs - ${convertToUTCTime(new Date())}`);
                        await bidsRepo.create({
                            ...obj,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - ERROR: ${e.message}`);
                    }
                    if (NFT) {
                        if (current_highest_bid.lt(new BN(obj.bid_value))) {
                            current_highest_bid = new BN(obj.bid_value);
                        }
                    }
                }
                if (NFT) {
                    try {
                        await nfTsRepo.updateAll(
                            {highest_bid: parseFloat(current_highest_bid.toString())},
                            {nftContractAddress: nftContractAddress, tokenID: tokenID},
                        );
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - ERROR: ${e.message}`);
                    }
                }
                // console.log({queue_data: queue_data[j]});
                try {
                    await bidQueueRepo.deleteById(queue_data[j]._id);
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - WARNING: ${e.message}`);
                }
            }
        }
    } catch (e) {
        send_telegram_message("check_bid_queue - " + e.message);
    }
    global_vars.is_check_Bid = false;
}

export async function telegram_check(
    bidQueueRepo: BidQueueSchemaRepository,
    jsonQueueRepo: JsonQueueSchemaRepository,
    nftQueueRepo: NftQueueSchemaRepository,
    nftQueueScanAllRepo: NftQueueScanAllSchemaRepository,
    projectQueueRepo: ProjectQueueSchemaRepository,
    rewardQueueRepo: RewardQueueSchemaRepository,
    imageQueueRepo: ImageQueueSchemaRepository,
    collectionQueueRepo: CollectionQueueSchemaRepository,
    collectionsRepo: CollectionsSchemaRepository
) {
    try {
        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - <---Checking...`);
        const bid_queue_count_db = (await bidQueueRepo.count({})).count;
        const json_queue_count_db = (await jsonQueueRepo.count({})).count;
        const image_queue_count_db = (await imageQueueRepo.count({})).count;
        const nft_queue_count_db = (await nftQueueRepo.count({})).count;
        const nft_queue_all_count_db = (await nftQueueScanAllRepo.count({})).count;
        const collection_queue_count_db = (await collectionQueueRepo.count({})).count;
        let collection_count_contract = await collection_manager_calls.getCollectionCount(global_vars.caller);
        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - Collection Count in Contract`, collection_count_contract);
        const collection_count_db = (await collectionsRepo.count({})).count;
        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - Collection Count in DB`, collection_count_db);
        if (collection_count_contract != collection_count_db) {
            await send_message("Collection count in DB is not the same as collection count in contract");
        }
        if (bid_queue_count_db > 0) {
            await send_message("There are " + bid_queue_count_db + " in the Bid Queue");
        }
        if (json_queue_count_db > 0) {
            await send_message("There are " + json_queue_count_db + " in the JSON Queue");
        }
        if (image_queue_count_db > 0) {
            await send_message("There are " + image_queue_count_db + " in the Image Queue");
        }
        if (nft_queue_count_db > 0) {
            await send_message("There are " + nft_queue_count_db + " in the NFT Queue");
        }
        if (collection_queue_count_db > 0) {
            await send_message("There are " + collection_queue_count_db + " in the Collection Queue");
        }
        if (nft_queue_all_count_db > 0) {
            await send_message("There are " + nft_queue_all_count_db + " in the Scan All NFT Queue");
        }
        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - End Checking--->`);
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - ERROR: ${e.message}`);
    }
}


export async function push_to_cloudflare(
    imagesRepo: ImagesSchemaRepository
) {
    if (global_vars.is_push_to_cloudflare_status) return;
    global_vars.is_push_to_cloudflare_status = true;
    console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Checking for Image Queue ...`);
    let images_not_on_cloudflare = await imagesRepo.find({
        where: {
            isCloudFlare: false
        }
    })
    let records_length = images_not_on_cloudflare.length;
    console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Image not pushed to cloudflare length: `, records_length);
    for (let j = 0; j < records_length; j++) {
        try {
            console.log(images_not_on_cloudflare[j]);
            let originImage = images_not_on_cloudflare[j].locationOrigin;
            if (!originImage) {
                console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Not found locationOrigin of input ${images_not_on_cloudflare[j]?.input}`);
                continue;
            }
            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Starting push file: ${originImage} to Cloudflare`);
            let cloud_flare_image_custom_id = originImage?.replace(/\.[^/.]+$/, "").split('/').pop();
            cloud_flare_image_custom_id = `astar/${cloud_flare_image_custom_id}`;
            let location1440 = images_not_on_cloudflare[j].location1440;
            let location1920 = images_not_on_cloudflare[j].location1920;
            let location1024 = images_not_on_cloudflare[j].location1024;
            let location500 = images_not_on_cloudflare[j].location500;
            let location100 = images_not_on_cloudflare[j].location100;
            if (!fs.existsSync(originImage)) {
                console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - File not exist on server, checking on CloudFlare`);
                try {
                    const {status} = await axios.get('https://api.cloudflare.com/client/v4/accounts/' + process.env.CLOUDFLARE_ACCOUNT_ID + '/images/v1/' + cloud_flare_image_custom_id, {
                        headers: {
                            'Authorization': 'Bearer ' + process.env.CLOUDFLARE_API_KEY,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (status == 200) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - File on CloudFlare`);
                        try {
                            await imagesRepo.updateAll(
                                {
                                    isCloudFlare: true,
                                    location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
                                    location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
                                    location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
                                    location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
                                    location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
                                },
                                {input: images_not_on_cloudflare[j].input}
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
                        }
                        await delay(1000);
                        if (location1440 && fs.existsSync(location1440)) await fs.unlinkSync(location1440);
                        if (location1920 && fs.existsSync(location1920)) await fs.unlinkSync(location1920);
                        if (location1024 && fs.existsSync(location1024)) await fs.unlinkSync(location1024);
                        if (location500 && fs.existsSync(location500)) await fs.unlinkSync(location500);
                        if (location100 && fs.existsSync(location100)) await fs.unlinkSync(location100);
                        if (fs.existsSync(originImage)) await fs.unlinkSync(originImage);
                        send_telegram_message(`Updated image ${originImage} on CloudFlare!\n` + 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100');
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - File not exist: `, e);
                }
            } else {
                let form = new FormData();
                form.append('file', fs.readFileSync(originImage), originImage);
                form.append('id', cloud_flare_image_custom_id);
                console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Custom Id: ${cloud_flare_image_custom_id}`);
                try {
                    const {status, data} = await axios.post(
                        'https://api.cloudflare.com/client/v4/accounts/' + process.env.CLOUDFLARE_ACCOUNT_ID + '/images/v1',
                        form,
                        {
                            headers: {
                                ...form.getHeaders(),
                                'Authorization': 'Bearer ' + process.env.CLOUDFLARE_API_KEY
                            }
                        }
                    );
                    if (status == 200) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR}: `, {
                            isCloudFlare: true,
                            location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
                            location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
                            location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
                            location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
                            location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
                        });
                        try {
                            await imagesRepo.updateAll(
                                {
                                    isCloudFlare: true,
                                    location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
                                    location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
                                    location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
                                    location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
                                    location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
                                },
                                {input: images_not_on_cloudflare[j].input}
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
                        }
                        await delay(1000);
                        if (location1440 && fs.existsSync(location1440)) await fs.unlinkSync(location1440);
                        if (location1920 && fs.existsSync(location1920)) await fs.unlinkSync(location1920);
                        if (location1024 && fs.existsSync(location1024)) await fs.unlinkSync(location1024);
                        if (location500 && fs.existsSync(location500)) await fs.unlinkSync(location500);
                        if (location100 && fs.existsSync(location100)) await fs.unlinkSync(location100);
                        if (fs.existsSync(originImage)) await fs.unlinkSync(originImage);
                        send_telegram_message(`Cached image ${originImage} on CloudFlare!\n` + 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100');
                    } else {
                        send_telegram_message('Cannot cache image ' + originImage);
                    }
                } catch (e) {
                    if (e.response?.status == 409) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR}: Cached image ${originImage} exist on CloudFlare!`);
                        try {
                            await imagesRepo.updateAll(
                                {
                                    isCloudFlare: true,
                                    location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
                                    location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
                                    location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
                                    location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
                                    location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
                                },
                                {input: images_not_on_cloudflare[j].input}
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
                        }
                        await delay(1000);
                        if (location1440 && fs.existsSync(location1440)) await fs.unlinkSync(location1440);
                        if (location1920 && fs.existsSync(location1920)) await fs.unlinkSync(location1920);
                        if (location1024 && fs.existsSync(location1024)) await fs.unlinkSync(location1024);
                        if (location500 && fs.existsSync(location500)) await fs.unlinkSync(location500);
                        if (location100 && fs.existsSync(location100)) await fs.unlinkSync(location100);
                        if (fs.existsSync(originImage)) await fs.unlinkSync(originImage);
                        send_telegram_message(`Updated image ${originImage} on CloudFlare!\n` + 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100');
                    } else {
                        console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
                        send_telegram_message("Cache image has input " + originImage + " false: " + e.message);
                    }
                }
            }
        } catch (e) {
            send_telegram_message("Cache image has input has error: " + e.message);
            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
        }
    }
    global_vars.is_push_to_cloudflare_status = false;
}

export async function setClaimedStatus():Promise<object> {
    try {
        if (!process.env.CALLER) return {
            count: 0,
            listAddress: []
        };
        const staking_contract = new ContractPromise(
            globalApi,
            staking.CONTRACT_ABI,
            staking.CONTRACT_ADDRESS
        );
        staking_calls.setContract(staking_contract);

        // let admin_address = await staking_calls.getAdminAddress(process.env.CALLER);
        // console.log("admin_address",admin_address);
        let is_locked = await staking_calls.getIsLocked(process.env.CALLER);
        console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - is_locked: `, is_locked);
        let is_reward_started = await staking_calls.getRewardStarted(process.env.CALLER);
        console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - is_reward_started `, is_reward_started);
        console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - is_reward_started must be FALSE and is_locked must be TRUE to set Claimable`);
        //is_reward_started must be FALSE and is_locked must be TRUE to set Claimable
        const keyring = new Keyring({type: 'sr25519'});
        const keypair = keyring.createFromUri((process.env.PHRASE) ? process.env.PHRASE : '');
        console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - Caller: `, keypair.address);
        let is_admin = await staking_calls.isAdmin(process.env.CALLER, keypair.address);
        console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - is_admin: `, is_admin);
        if (!is_admin) {
            console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - Caller: ${keypair.address} is not admin`);
            return {
                count: 0,
                listAddress: []
            };
        }
        if (is_locked && !is_reward_started) {
            let listAddress: string[] = [];
            let staker_count = await staking_calls.getTotalCountOfStakeholders(process.env.CALLER);
            console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE}:`, staker_count);
            for (let i = 0; i < staker_count; i++) {
                try {
                    let staker = await staking_calls.getStakedAccountsAccountByIndex(process.env.CALLER, i);
                    let isClaimed = await staking_calls.isClaimed(process.env.CALLER, staker);
                    console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE}: `, i + 1, "staker", staker, "is claimed", isClaimed);
                    console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - set isClaimed to FALSE for`, staker);
                    await staking_calls.setClaimedStatus(keypair, process.env.CALLER, staker);
                    isClaimed = await staking_calls.isClaimed(process.env.CALLER, staker);
                    console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE}:`, i + 1, "staker", staker, "is claimed", isClaimed);
                    if (staker) {
                        listAddress.push(staker);
                    }
                } catch (e) {
                    console.log(`ERROR: ${e.messages}`);
                }
            }
            return {
                count: staker_count,
                listAddress: listAddress
            }
        }
    } catch (e) {
        console.log(`ERROR: ${e.messages}`);
    }
    return {
        count: 0,
        listAddress: []
    }
}