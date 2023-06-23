import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME, END_BLOCK_NUMBER,
    GET_CONFIG_FORM_DB, START_BLOCK_NUMBER
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {Abi} from "@polkadot/api-contract";
import {global_vars, SOCKET_STATUS} from "./global";
import {marketplace} from "../contracts/marketplace";
import {staking} from "../contracts/staking";
import {collection_manager} from "../contracts/collection_manager";
import {reScanBlocks, scanBlocks} from "./actions";
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
    StakingEventSchemaRepository,
    UnListEventSchemaRepository,
    ConfigRepository,
    ProjectsSchemaRepository,
    AzeroDomainEventRepository,
    NftQueueScanAllSchemaRepository, NftQueueSchemaRepository, ReScannedBlocksSchemaRepository
} from "../repositories";
import {launchpad_psp34_nft_standard} from "../contracts/launchpad_psp34_nft_standard";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {azero_domain} from "../contracts/azns_registry";
@cronJob()
export class CronJobAzEventsCollectorReScan implements Provider<CronJob> {
    constructor(
        @repository(ReScannedBlocksSchemaRepository)
        public reScannedBlocksSchemaRepository: ReScannedBlocksSchemaRepository,
        @repository(NewListEventSchemaRepository)
        public newListEventSchemaRepository: NewListEventSchemaRepository,
        @repository(UnListEventSchemaRepository)
        public unListEventSchemaRepository: UnListEventSchemaRepository,
        @repository(PurchaseEventSchemaRepository)
        public purchaseEventSchemaRepository: PurchaseEventSchemaRepository,
        @repository(BidWinEventSchemaRepository)
        public bidWinEventSchemaRepository: BidWinEventSchemaRepository,
        @repository(StakingEventSchemaRepository)
        public stakingEventSchemaRepository: StakingEventSchemaRepository,
        @repository(ClaimRewardEventSchemaRepository)
        public claimRewardEventSchemaRepository: ClaimRewardEventSchemaRepository,
        @repository(LaunchpadMintingEventSchemaRepository)
        public launchpadMintingEventSchemaRepository: LaunchpadMintingEventSchemaRepository,
        @repository(WithdrawEventSchemaRepository)
        public withdrawEventSchemaRepository: WithdrawEventSchemaRepository,
        @repository(AddRewardEventSchemaRepository)
        public addRewardEventSchemaRepository: AddRewardEventSchemaRepository,
        @repository(CollectionEventSchemaRepository)
        public collectionEventSchemaRepository: CollectionEventSchemaRepository,
        @repository(ProjectsSchemaRepository)
        public projectsSchemaRepository: ProjectsSchemaRepository,
        @repository(AzeroDomainEventRepository)
        public azeroDomainEventRepository: AzeroDomainEventRepository,
        @repository(NftQueueScanAllSchemaRepository)
        public nftQueueScanAllSchemaRepository: NftQueueScanAllSchemaRepository,
        @repository(NftQueueSchemaRepository)
        public nftQueueSchemaRepository: NftQueueSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_EVENTS_COLLECTOR_RESCAN,
            name: CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_EVENTS_COLLECTOR_RESCAN;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - RUN JOB AZ_EVENTS_COLLECTOR_RESCAN NOW: ${currentTime}`);

                        try {
                            const reScannedBlocksRepo = this.reScannedBlocksSchemaRepository;
                            const newListEventRepo = this.newListEventSchemaRepository;
                            const unListEventRepo = this.unListEventSchemaRepository;
                            const purchaseEventRepo = this.purchaseEventSchemaRepository;
                            const bidWinEventRepo = this.bidWinEventSchemaRepository;
                            const stakingEventRepo = this.stakingEventSchemaRepository;
                            const claimRewardEventRepo = this.claimRewardEventSchemaRepository;
                            const launchpadMintingEventRepo = this.launchpadMintingEventSchemaRepository;
                            const withdrawEventRepo = this.withdrawEventSchemaRepository;
                            const addRewardEventRepo = this.addRewardEventSchemaRepository;
                            const collectionEventRepo = this.collectionEventSchemaRepository;
                            const projectsRepo = this.projectsSchemaRepository;
                            const azeroDomainEventRepo = this.azeroDomainEventRepository;
                            const nftQueueScanAllRepo = this.nftQueueScanAllSchemaRepository;
                            const nftQueueSchemaRepo = this.nftQueueSchemaRepository;

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
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Smartnet AZERO Ready`);
                                    global_vars.isScanning = false;

                                    const abi_marketplace_contract = new Abi(marketplace.CONTRACT_ABI);
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Marketplace Contract ABI is ready`);

                                    const abi_staking_contract = new Abi(staking.CONTRACT_ABI);
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Staking Contract ABI is ready`);

                                    const abi_collection_contract = new Abi(collection_manager.CONTRACT_ABI);
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Collection Contract ABI is ready`);

                                    const api_launchpad_psp34_nft_standard = new Abi(launchpad_psp34_nft_standard.CONTRACT_ABI);
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - Launchpad Contract ABI is ready`);

                                    const api_azero_doman = new Abi(azero_domain.CONTRACT_ABI);
                                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - AzeroDomain Contract ABI is ready`);

                                    let startBlockNumber = START_BLOCK_NUMBER;
                                    let endBlockNumber = END_BLOCK_NUMBER;

                                    // @ts-ignore
                                    await eventApi.rpc.chain.subscribeNewHeads((header: any) => {
                                        const currentBlock = parseInt(header.number.toString());
                                        endBlockNumber = (endBlockNumber > currentBlock) ? currentBlock : endBlockNumber;
                                        try {
                                            reScanBlocks(
                                                startBlockNumber,
                                                endBlockNumber,
                                                eventApi,
                                                api_azero_doman,
                                                api_launchpad_psp34_nft_standard,
                                                abi_marketplace_contract,
                                                abi_staking_contract,
                                                abi_collection_contract,
                                                reScannedBlocksRepo,
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
                                                projectsRepo,
                                                azeroDomainEventRepo,
                                                nftQueueScanAllRepo,
                                                nftQueueSchemaRepo
                                            );
                                        } catch (e) {
                                            console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - ERROR: ${e.message}`);
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
                    console.log(`${CONFIG_TYPE_NAME.AZ_EVENTS_COLLECTOR_RESCAN} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}