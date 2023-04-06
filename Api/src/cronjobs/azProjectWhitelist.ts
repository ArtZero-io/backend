import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
    GET_CONFIG_FORM_DB
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {global_vars, SOCKET_STATUS} from "./global";
import {
    checkAllWhiteListQueue,
} from "./actions";
import {repository} from "@loopback/repository";
import {
    ConfigRepository,
    ProjectsSchemaRepository,
    ProjectWhitelistQueuesRepository
} from "../repositories";
import {globalApi} from "../index";
@cronJob()
export class CronJobAzProjectWhitelist implements Provider<CronJob> {
    constructor(
        @repository(ProjectsSchemaRepository)
        public projectsSchemaRepository: ProjectsSchemaRepository,
        @repository(ProjectWhitelistQueuesRepository)
        public projectWhitelistQueuesRepository: ProjectWhitelistQueuesRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_PROJECT_WHITELIST,
            name: CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST,
            onTick: async () => {
                try {
                    let getConfig = CRONJOB_ENABLE.AZ_PROJECT_WHITELIST;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig?.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - RUN JOB AZ_PROJECT_WHITELIST NOW: ${currentTime}`);
                        const projectsRepo = this.projectsSchemaRepository;
                        const projectWhitelistQueuesRepo = this.projectWhitelistQueuesRepository;
                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - AZ_PROJECT_WHITELIST is active!`);
                        try {
                            await checkAllWhiteListQueue(
                                globalApi,
                                projectsRepo,
                                projectWhitelistQueuesRepo,
                                global_vars.caller,
                                undefined
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_WHITELIST} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}