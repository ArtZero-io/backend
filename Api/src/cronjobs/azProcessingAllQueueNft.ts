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
import {check_NFT_queue_all} from "./actions";
import {repository} from "@loopback/repository";
import {
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository, ConfigRepository, NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    NftsSchemaRepository
} from "../repositories";
import {globalApi, localApi} from "../index";
@cronJob()
export class CronJobAzProcessingAllQueueNft implements Provider<CronJob> {
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
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_PROCESSING_ALL_QUEUE_NFT,
            name: CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_PROCESSING_ALL_QUEUE_NFT;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - RUN JOB AZ_PROCESSING_ALL_QUEUE_NFT NOW: ${currentTime}`);

                        const nftRepo = this.nfTsSchemaRepository;
                        const nftQueueRepo = this.nftQueueSchemaRepository;
                        const nftQueueScanAllRepo = this.nftQueueScanAllSchemaRepository;
                        const collectionsRepo = this.collectionsSchemaRepository;
                        try {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING - socketStatus: ${global_vars.socketStatus}`);
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING - socketStatusLocal: ${global_vars.socketStatusLocal}`);
                            if (globalApi){
                                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING - globalApi: isConnected ${JSON.stringify(globalApi.isConnected)}`);
                            }
                            if (localApi){
                                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - WARNING - localApi: isConnected ${JSON.stringify(localApi.isConnected)}`);
                            }
                            if (!(global_vars.socketStatusLocal == SOCKET_STATUS.CONNECTED && localApi)) {
                                if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) {
                                    return;
                                } else{
                                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Smartnet Astar Ready`);
                                    // global_vars.is_scan_all_NFTs = false;
                                    global_vars.is_check_NFT_queue_all = false;
                                    try {
                                        await check_NFT_queue_all(
                                            globalApi,
                                            nftRepo,
                                            nftQueueRepo,
                                            nftQueueScanAllRepo,
                                            collectionsRepo,
                                        );
                                    } catch (e) {
                                        console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                                    }
                                }
                            } else {
                                console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - Smartnet Astar Ready`);
                                // global_vars.is_scan_all_NFTs = false;
                                global_vars.is_check_NFT_queue_all = false;
                                try {
                                    await check_NFT_queue_all(
                                        localApi,
                                        nftRepo,
                                        nftQueueRepo,
                                        nftQueueScanAllRepo,
                                        collectionsRepo,
                                    );
                                } catch (e) {
                                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                                }
                            }
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                        }
                    }
                }catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROCESSING_ALL_QUEUE_NFT} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}