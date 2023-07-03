import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {repository} from "@loopback/repository";
import {
    CollectionEventSchemaRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository, ConfigRepository, ImageRemoveQueueSchemaRepository, NftsSchemaRepository,
} from "../repositories";
import {global_vars, SOCKET_STATUS} from "./global";
import {check_collection_queue, check_new_collections} from "./actions";
import {globalApi} from "../index";


@cronJob()
export class CronJobAzCollectionMonitor implements Provider<CronJob> {
    constructor(
        @repository(CollectionEventSchemaRepository)
        public collectionEventSchemaRepository: CollectionEventSchemaRepository,
        @repository(CollectionQueueSchemaRepository)
        public collectionQueueSchemaRepository: CollectionQueueSchemaRepository,
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
        @repository(NftsSchemaRepository)
        public nfTsSchemaRepository: NftsSchemaRepository,
        @repository(ImageRemoveQueueSchemaRepository)
        public imageRemoveQueueSchemaRepository: ImageRemoveQueueSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_COLLECTION_MONITOR,
            name: CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_COLLECTION_MONITOR;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - RUN JOB AZ_COLLECTION_MONITOR NOW: ${currentTime}`);
                        const collectionsRepo = this.collectionsSchemaRepository;
                        const collectionQueueRepo = this.collectionQueueSchemaRepository;
                        const nftRepo = this.nfTsSchemaRepository;
                        const imageRemoveQueueRepo = this.imageRemoveQueueSchemaRepository;
                        console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - WARNING - socketStatus: ${global_vars.socketStatus}`);
                        if (globalApi){
                            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - WARNING - globalApi: isConnected ${JSON.stringify(globalApi.isConnected)}`);
                        }
                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        try {
                            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - Smartnet Astar Ready`);
                            global_vars.is_check_new_collections = false;
                            global_vars.is_check_collection_queue = false;
                            try {
                                await check_new_collections(
                                    collectionsRepo,
                                    nftRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                            }

                            try {
                                await check_collection_queue(
                                    collectionsRepo,
                                    collectionQueueRepo,
                                    nftRepo,
                                    imageRemoveQueueRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                            }
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_COLLECTION_MONITOR} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}