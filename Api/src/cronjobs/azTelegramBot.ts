import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime, delay, sleep} from "../utils/Tools";
import {ContractPromise} from "@polkadot/api-contract";
import {collection_manager} from "../contracts/collection_manager";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import {repository} from "@loopback/repository";
import {
    BidQueueSchemaRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository,
    ConfigRepository,
    ImageQueueSchemaRepository,
    JsonQueueSchemaRepository,
    NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    ProjectQueueSchemaRepository,
    RewardQueueSchemaRepository
} from "../repositories";
import {telegram_check} from "./actions";
import {global_vars, SOCKET_STATUS} from "./global";
import {globalApi} from "../index";
@cronJob()
export class CronJobAzTelegramBot implements Provider<CronJob> {
    constructor(
        @repository(BidQueueSchemaRepository)
        public bidQueueSchemaRepository: BidQueueSchemaRepository,
        @repository(JsonQueueSchemaRepository)
        public jsonQueueSchemaRepository: JsonQueueSchemaRepository,
        @repository(NftQueueSchemaRepository)
        public nftQueueSchemaRepository: NftQueueSchemaRepository,
        @repository(NftQueueScanAllSchemaRepository)
        public nftQueueScanAllSchemaRepository: NftQueueScanAllSchemaRepository,
        @repository(ProjectQueueSchemaRepository)
        public projectQueueSchemaRepository: ProjectQueueSchemaRepository,
        @repository(RewardQueueSchemaRepository)
        public rewardQueueSchemaRepository: RewardQueueSchemaRepository,
        @repository(ImageQueueSchemaRepository)
        public imageQueueSchemaRepository: ImageQueueSchemaRepository,
        @repository(CollectionQueueSchemaRepository)
        public collectionQueueSchemaRepository: CollectionQueueSchemaRepository,
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_TELEGRAM_BOT,
            name: CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_TELEGRAM_BOT;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        await delay(15000);
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - RUN JOB AZ_TELEGRAM_BOT NOW: ${currentTime}`);

                        const bidQueueRepo = this.bidQueueSchemaRepository;
                        const jsonQueueRepo = this.jsonQueueSchemaRepository;
                        const nftQueueRepo = this.nftQueueSchemaRepository;
                        const nftQueueScanAllRepo = this.nftQueueScanAllSchemaRepository;
                        const projectQueueRepo = this.projectQueueSchemaRepository;
                        const rewardQueueRepo = this.rewardQueueSchemaRepository;
                        const imageQueueRepo = this.imageQueueSchemaRepository;
                        const collectionQueueRepo = this.collectionQueueSchemaRepository;
                        const collectionsRepo = this.collectionsSchemaRepository;

                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - ARTZERO Telegram Bot is active!`);
                        try {
                            console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - Smartnet AZERO Ready`);
                            const collection_contract = new ContractPromise(
                                globalApi,
                                collection_manager.CONTRACT_ABI,
                                collection_manager.CONTRACT_ADDRESS
                            );
                            console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - Collection Contract is ready`);
                            collection_manager_calls.setContract(collection_contract);
                            try {
                                await telegram_check(
                                    bidQueueRepo,
                                    jsonQueueRepo,
                                    nftQueueRepo,
                                    nftQueueScanAllRepo,
                                    projectQueueRepo,
                                    rewardQueueRepo,
                                    imageQueueRepo,
                                    collectionQueueRepo,
                                    collectionsRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - ERROR: ${e.message}`);
                            }
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_TELEGRAM_BOT} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}