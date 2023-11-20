import {global_vars} from "./global";
import {
    APICall, checkProjectSchema,
    convertNumberWithoutCommas,
    convertStringToPrice,
    delay, hexToAscii, isAzEnabled,
    randomString,
    readOnlyGasLimit,
    send_message,
    send_telegram_message,
    strToNumber,
    todayFolder,
    convertStringToDateTime
} from "../utils/utils";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import * as marketplace_calls from "../contracts/marketplace_calls";
import * as artzero_nft_calls from "../contracts/artzero_nft_calls";
import * as nft721_psp34_standard_calls from "../contracts/nft721_psp34_standard_calls";
import * as launchpad_manager_calls from "../contracts/launchpad_manager_calls";
import * as launchpad_psp34_nft_standard_calls from "../contracts/launchpad_psp34_nft_standard_calls";
import * as staking_calls from "../contracts/staking_calls";
import * as azero_domains_nft_calls from "../contracts/azero_domains_nft_calls";
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
    UnListEventSchemaRepository, BlackListRepository, AzeroDomainEventRepository, ReScannedBlocksSchemaRepository
} from "../repositories";
import {
    AzeroDomainEvent,
    collections,
    images, nftqueuealls, nftqueues,
    nfts, ObjRegister, ObjTransfer,
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
import {convertToUTCTime, isBlackListCollection, logger, sleep} from "../utils/Tools";
import {globalApi, localApi} from "../index";
import {launchpad_manager} from "../contracts/launchpad_manager";
import dotenv from "dotenv";
import {totalSupply} from "../contracts/nft721_psp34_standard_calls";
import * as crypto from "crypto";
import {azero_domains_nft} from "../contracts/azero_domains_nft";
import {getRegistrationPeriod} from "../contracts/azero_domains_nft_calls";
import { KeyringPair$Json } from "@polkadot/keyring/types";

dotenv.config();

export async function scanNftTransferAction(
    blocknumber: number,
    api: ApiPromise,
    abi_nft721_psp34_standard: Abi,
    collectionsRepo: CollectionsSchemaRepository
) {
    if (global_vars.isScanning) {
        //This to make sure always process the latest block in case still scanning old blocks
        // console.log('Process latest block: ', blocknumber);
        const blockHash = await api.rpc.chain.getBlockHash(blocknumber);
        // @ts-ignore
        const eventRecords = await api.query.system.events.at(blockHash);
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - Start processEventRecords at ${blocknumber} now: ${convertToUTCTime(new Date())}`);
        // console.log({eventRecords: eventRecords});
        await processEventRecords(
            eventRecords,
            blocknumber,
            abi_nft721_psp34_standard,
            collectionsRepo
        );
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - Stop processEventRecords at ${blocknumber} now: ${convertToUTCTime(new Date())}`);
        return;
    }
    global_vars.isScanning = true;
}

export async function processEventRecords(
    eventRecords: any,
    to_scan: number,
    abi_nft721_psp34_standard: Abi,
    collectionsRepo: CollectionsSchemaRepository
) {
    try {
        for (const record of eventRecords) {
            // Extract the phase, event and the event types
            const {phase, event: {data, method, section}} = record;
            if (section == "contracts" && method == "ContractEmitted") {
                const [accId, bytes] = data.map((data: any, _: any) => data).slice(0, 2);
                const contract_address = accId.toString();
                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - Contract Address ${contract_address}`);
                let collection = await collectionsRepo.count({nftContractAddress: contract_address});
                if (collection) {
                    const decodedEvent = abi_nft721_psp34_standard.decodeEvent(bytes);
                    let event_name = decodedEvent.event.identifier;
                    const eventValues = [];
                    for (let i = 0; i < decodedEvent.args.length; i++) {
                        const value = decodedEvent.args[i];
                        eventValues.push(value.toString());
                    }
                    if (event_name == 'Transfer') {

                    }
                }
            }
        }
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - ERROR: ${e.message}`);
    }
}
