import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB,
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {global_vars, SOCKET_STATUS} from "./global";
import {scanAllNFTs} from "./actions";
import {repository} from "@loopback/repository";
import {
    AzeroDomainEventRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository, ConfigRepository, NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    NftsSchemaRepository
} from "../repositories";
import {localApi} from "../index";
@cronJob()
export class CronJobAzNftMonitorScanAll implements Provider<CronJob> {
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
        @repository(AzeroDomainEventRepository)
        public azeroDomainEventRepository: AzeroDomainEventRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_NFT_MONITOR_SCAN_ALL,
            name: CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_NFT_MONITOR_SCAN_ALL;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - RUN JOB AZ_NFT_MONITOR NOW: ${currentTime}`);

                        const nftRepo = this.nfTsSchemaRepository;
                        const nftQueueRepo = this.nftQueueSchemaRepository;
                        const nftQueueScanAllRepo = this.nftQueueScanAllSchemaRepository;
                        const collectionsRepo = this.collectionsSchemaRepository;
                        const collectionQueueRepo = this.collectionQueueSchemaRepository;
                        const azeroDomainEventRepo = this.azeroDomainEventRepository;
                        if (!(global_vars.socketStatusLocal == SOCKET_STATUS.CONNECTED && localApi)) return;
                        try {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - Smartnet AZERO Ready`);
                            global_vars.is_scan_all_NFTs = false;
                            global_vars.is_check_NFT_queue_all = false;
                            try {
                                await scanAllNFTs(
                                    localApi,
                                    nftRepo,
                                    nftQueueRepo,
                                    nftQueueScanAllRepo,
                                    collectionsRepo,
                                    collectionQueueRepo,
                                    azeroDomainEventRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
                            }
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
                        }
                    }
                }catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_NFT_MONITOR_SCAN_ALL} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}