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
import {push_to_cloudflare} from "./actions";
import {repository} from "@loopback/repository";
import {ConfigRepository, ImagesSchemaRepository} from "../repositories";
@cronJob()
export class CronJobAzCloudflareSyncMonitor implements Provider<CronJob> {
    constructor(
        @repository(ImagesSchemaRepository)
        public imagesSchemaRepository: ImagesSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_CLOUDFLARE_SYNC_MONITOR,
            name: CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_CLOUDFLARE_SYNC_MONITOR;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - RUN JOB AZ_CLOUDFLARE_SYNC_MONITOR NOW: ${currentTime}`);
                        const imagesRepo = this.imagesSchemaRepository;
                        global_vars.is_push_to_cloudflare_status = false;
                        try {
                            await push_to_cloudflare(
                                imagesRepo
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_CLOUDFLARE_SYNC_MONITOR} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}