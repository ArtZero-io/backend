import {CONFIG_TYPE_NAME, CRONJOB_ENABLE, CRONJOB_TIME, GET_CONFIG_FORM_DB } from "../utils/constant";
import {Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {global_vars, SOCKET_STATUS} from "./global";
import {check_bid_queue} from "./actions";
import {repository} from "@loopback/repository";
import {BidQueueSchemaRepository, BidsSchemaRepository, ConfigRepository, NftsSchemaRepository} from "../repositories";
import {globalApi} from "../index";

@cronJob()
export class CronJobAzBidsMonitor implements Provider<CronJob> {
    constructor(
        @repository(BidsSchemaRepository)
        public bidsSchemaRepository: BidsSchemaRepository,
        @repository(BidQueueSchemaRepository)
        public bidQueueSchemaRepository: BidQueueSchemaRepository,
        @repository(NftsSchemaRepository)
        public nfTsSchemaRepository: NftsSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_BIDS_MONITOR,
            name: CONFIG_TYPE_NAME.AZ_BIDS_MONITOR,
            onTick: async () => {
                try {
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_BIDS_MONITOR;
                    if (GET_CONFIG_FORM_DB) {
                        const configRepo = this.configRepository;
                        const filter = {
                            typeConfig: CONFIG_TYPE_NAME.AZ_BIDS_MONITOR,
                            nodeIp: process.env.NODE_IP,
                            nodeCluster: process.env.NODE_CLUSTER
                        };
                        const apiConfig = await configRepo.findOne({
                            where: filter
                        });
                        if (!apiConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - Not found configuration`);
                            return;
                        }
                        if (apiConfig.mainConfig?.configJobs.isEnable) {
                            getConfig =  apiConfig.mainConfig.configJobs.isEnable;
                        }
                        if (!getConfig) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - Job is not enabled!`);
                            return;
                        }
                    }
                    if (getConfig) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - RUN JOB AZ_BIDS_MONITOR NOW: ${currentTime}`);
                        const bidsRepo = this.bidsSchemaRepository;
                        const bidQueueRepo = this.bidQueueSchemaRepository;
                        const nfTsRepo = this.nfTsSchemaRepository;
                        console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - ARTZERO Bid Monitor is active!`);
                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        global_vars.is_check_Bid = false;
                        try {
                            await check_bid_queue(
                                bidsRepo,
                                bidQueueRepo,
                                nfTsRepo
                            )
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.AZ_BIDS_MONITOR} - ERROR: ${e.message}`);console.log(e);
                }
            },
            start: true,
        });
    }
}