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
import {launchpad_manager} from "../contracts/launchpad_manager";
import {global_vars, SOCKET_STATUS} from "./global";
import * as launchpad_manager_calls from "../contracts/launchpad_manager_calls";
import {check_new_projects, check_project_queue} from "./actions";
import {repository} from "@loopback/repository";
import {ConfigRepository, ProjectQueueSchemaRepository, ProjectsSchemaRepository} from "../repositories";
import {globalApi} from "../index";
@cronJob()
export class CronJobAzProjectMonitor implements Provider<CronJob> {
    constructor(
        @repository(ProjectsSchemaRepository)
        public projectsSchemaRepository: ProjectsSchemaRepository,
        @repository(ProjectQueueSchemaRepository)
        public projectQueueSchemaRepository: ProjectQueueSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_PROJECT_MONITOR,
            name: CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_PROJECT_MONITOR;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig = apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - RUN JOB AZ_PROJECT_MONITOR NOW: ${currentTime}`);

                        const projectsRepo = this.projectsSchemaRepository;
                        const projectQueueRepo = this.projectQueueSchemaRepository;

                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Astar Project Monitoring is active!`);
                        try {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - Smartnet Astar Ready`);
                            global_vars.is_check_new_projects = false;
                            global_vars.is_check_project_queue = false;
                            try {
                                await check_new_projects(
                                    globalApi,
                                    projectsRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
                            }

                            try {
                                await check_project_queue(
                                    globalApi,
                                    projectsRepo,
                                    projectQueueRepo
                                );
                            } catch (e) {
                                console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
                            }
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_PROJECT_MONITOR} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}