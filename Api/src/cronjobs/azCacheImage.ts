import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {global_vars} from "./global";
import {check_Image_queue} from "./actions";
import {repository} from "@loopback/repository";
import {ConfigRepository, ImageQueueSchemaRepository, ImagesSchemaRepository} from "../repositories";
@cronJob()
export class CronJobAzCacheImage implements Provider<CronJob> {
    constructor(
        @repository(ImageQueueSchemaRepository)
        public imageQueueSchemaRepository: ImageQueueSchemaRepository,
        @repository(ImagesSchemaRepository)
        public imagesSchemaRepository: ImagesSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_CACHE_IMAGE,
            name: CONFIG_TYPE_NAME.AZ_CACHE_IMAGE,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_CACHE_IMAGE;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_CACHE_IMAGE,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - RUN JOB AZ_CACHE_IMAGE NOW: ${currentTime}`);
                        const imageQueueSchemaRepo = this.imageQueueSchemaRepository;
                        const imageRepo = this.imagesSchemaRepository;
                        console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ARTZERO Image Caching Service is active!`);
                        global_vars.is_check_Image_queue = false;
                        try {
                            await check_Image_queue(
                                imageQueueSchemaRepo,
                                imageRepo
                            );
                        } catch (e){
                            console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_CACHE_IMAGE} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}