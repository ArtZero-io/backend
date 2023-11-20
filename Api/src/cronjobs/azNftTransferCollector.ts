import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {Abi} from "@polkadot/api-contract";
import {global_vars, SOCKET_STATUS} from "./global";
import {marketplace} from "../contracts/marketplace";
import {staking} from "../contracts/staking";
import {collection_manager} from "../contracts/collection_manager";
import {nft721_psp34_standard} from "../contracts/nft721_psp34_standard";
import {scanNftTransferAction} from "./scanNftTransferAction";
import {repository} from "@loopback/repository";
import {
    AddRewardEventSchemaRepository,
    BidWinEventSchemaRepository,
    ClaimRewardEventSchemaRepository,
    LaunchpadMintingEventSchemaRepository,
    WithdrawEventSchemaRepository,
    CollectionEventSchemaRepository,
    NewListEventSchemaRepository,
    PurchaseEventSchemaRepository,
    ScannedBlocksSchemaRepository,
    StakingEventSchemaRepository,
    UnListEventSchemaRepository,
    ConfigRepository,
    ProjectsSchemaRepository,
    AzeroDomainEventRepository,
    NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    CollectionsSchemaRepository
} from "../repositories";
import {launchpad_psp34_nft_standard} from "../contracts/launchpad_psp34_nft_standard";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {azero_domain} from "../contracts/azns_registry";
@cronJob()
export class CronJobAzNftTransferCollector implements Provider<CronJob> {
    constructor(
        @repository(ScannedBlocksSchemaRepository)
        public scannedBlocksSchemaRepository: ScannedBlocksSchemaRepository,
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_NFT_TRANSFER_COLLECTOR,
            name: CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_NFT_TRANSFER_COLLECTOR;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - RUN JOB AZ_NFT_TRANSFER_COLLECTOR NOW: ${currentTime}`);

                        try {
                            const scannedBlocksRepo = this.scannedBlocksSchemaRepository;
                            const collectionsRepo = this.collectionsSchemaRepository;
                            const rpc = process.env.WSSPROVIDER;
                            if (!rpc) {
                                console.log(`RPC not found! ${rpc}`);
                                return;
                            }
                            const provider = new WsProvider(rpc);
                            const eventApi = new ApiPromise({
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
                            eventApi.on("connected", () => {
                                eventApi.isReady.then(async (api: any) => {
                                    console.log(`Global RPC Connected: ${rpc}`);

                                    // TODO: Start scanBlocks
                                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - Smartnet AZERO Ready`);
                                    global_vars.isScanning = false;

                                    const abi_nft721_psp34_standard = new Abi(nft721_psp34_standard.CONTRACT_ABI);
                                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - PSP34 Standard Contract ABI is ready`);

                                    // @ts-ignore
                                    await eventApi.rpc.chain.subscribeNewHeads((header: any) => {
                                        try {
                                            scanNftTransferAction(
                                                parseInt(header.number.toString()),
                                                eventApi,
                                                abi_nft721_psp34_standard,
                                                collectionsRepo
                                            );
                                        } catch (e) {
                                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - ERROR: ${e.message}`);
                                        }
                                    });
                                });
                            });
                            eventApi.on("ready", async () => {
                                console.log("Global RPC Ready");
                                global_vars.socketStatus = SOCKET_STATUS.READY;
                            });
                            eventApi.on("error", (err: any) => {
                                console.log('error', err );
                                global_vars.socketStatus = SOCKET_STATUS.ERROR;
                            });
                        } catch (e) {
                            console.log(`API GLOBAL - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_TRANSFER_COLLECTOR} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}