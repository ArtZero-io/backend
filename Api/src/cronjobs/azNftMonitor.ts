import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {ContractPromise} from "@polkadot/api-contract";
import {global_vars, SOCKET_STATUS} from "./global";
import {marketplace} from "../contracts/marketplace";
import {artzero_nft} from "../contracts/artzero_nft";
import {collection_manager} from "../contracts/collection_manager";
import * as marketplace_calls from "../contracts/marketplace_calls";
import * as artzero_nft_calls from "../contracts/artzero_nft_calls";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import {check_new_AZ_NFTs, check_NFT_queue} from "./actions";
import {repository} from "@loopback/repository";
import {
    AzeroDomainEventRepository,
    BlackListRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository, ConfigRepository, NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    NftsSchemaRepository
} from "../repositories";
import {globalApi} from "../index";
@cronJob()
export class CronJobAzNftMonitor implements Provider<CronJob> {
    constructor(
        @repository(NftsSchemaRepository)
        public nfTsSchemaRepository: NftsSchemaRepository,
        @repository(NftQueueSchemaRepository)
        public nftQueueSchemaRepository: NftQueueSchemaRepository,
        @repository(NftQueueScanAllSchemaRepository)
        public nftQueueScanAllSchemaRepository: NftQueueScanAllSchemaRepository,
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
        @repository(CollectionQueueSchemaRepository)
        public collectionQueueSchemaRepository: CollectionQueueSchemaRepository,
        @repository(BlackListRepository)
        public blackListRepository: BlackListRepository,
        @repository(AzeroDomainEventRepository)
        public azeroDomainEventRepository: AzeroDomainEventRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_NFT_MONITOR,
            name: CONFIG_TYPE_NAME.AZ_NFT_MONITOR,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_NFT_MONITOR;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_NFT_MONITOR,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - RUN JOB AZ_NFT_MONITOR NOW: ${currentTime}`);

                        const nftRepo = this.nfTsSchemaRepository;
                        const nftQueueRepo = this.nftQueueSchemaRepository;
                        const collectionsRepo = this.collectionsSchemaRepository;
                        const blackListRepo = this.blackListRepository;
                        const azeroDomainEventRepo = this.azeroDomainEventRepository;
                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        try {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Smartnet AZERO Ready`);
                            const marketplace_contract = new ContractPromise(
                                globalApi,
                                marketplace.CONTRACT_ABI,
                                marketplace.CONTRACT_ADDRESS
                            );
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Marketplace Contract is ready`);
                            marketplace_calls.setContract(marketplace_contract);

                            const az_nft_contract = new ContractPromise(
                                globalApi,
                                artzero_nft.CONTRACT_ABI,
                                artzero_nft.CONTRACT_ADDRESS
                            );
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ArtZero NFT Contract is ready 4`);
                            artzero_nft_calls.setContract(az_nft_contract);

                            const collection_contract = new ContractPromise(
                                globalApi,
                                collection_manager.CONTRACT_ABI,
                                collection_manager.CONTRACT_ADDRESS
                            );
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - Collection Contract is ready`);
                            collection_manager_calls.setContract(collection_contract);
                            global_vars.is_check_NFT_queue = false;
                            global_vars.is_check_new_AZ_NFT = false;
                            try {
                                await check_NFT_queue(
                                    globalApi,
                                    nftRepo,
                                    nftQueueRepo,
                                    collectionsRepo,
                                    blackListRepo,
                                    azeroDomainEventRepo,
                                    undefined
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                            }

                            try {
                                await check_new_AZ_NFTs(
                                    nftRepo,
                                    nftQueueRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                            }
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}