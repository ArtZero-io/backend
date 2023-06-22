import {CONFIG_TYPE_NAME, CRONJOB_ENABLE, CRONJOB_TIME, GET_CONFIG_FORM_DB } from "../utils/constant";
import {Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {global_vars, SOCKET_STATUS} from "./global";
import {check_bid_queue} from "./actions";
import {repository} from "@loopback/repository";
import {check_new_azero_domains_nft_queue} from "./actions";
import {
    AzeroDomainEventRepository,
    BidQueueSchemaRepository,
    BidsSchemaRepository,
    ConfigRepository,
    NftsSchemaRepository,
    CollectionsSchemaRepository
} from "../repositories";
import {globalApi} from "../index";

@cronJob()
export class CronJobAzeroDomainCollector implements Provider<CronJob> {
    constructor(
        @repository(BidsSchemaRepository)
        public bidsSchemaRepository: BidsSchemaRepository,
        @repository(BidQueueSchemaRepository)
        public bidQueueSchemaRepository: BidQueueSchemaRepository,
        @repository(NftsSchemaRepository)
        public nfTsSchemaRepository: NftsSchemaRepository,
        @repository(AzeroDomainEventRepository)
        public azeroDomainEventRepository: AzeroDomainEventRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.AZ_AZERO_DOMAINS_COLLECTOR,
            name: CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_COLLECTOR,
            onTick: async () => {
                
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_AZERO_DOMAINS_COLLECTOR;
                    if (getConfig) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_COLLECTOR} - Start CronJobAzeroDomainCollector`);
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_COLLECTOR} - RUN JOB AZ_AZERO_DOMAINS_COLLECTOR NOW: ${currentTime}`);
                        const bidsRepo = this.bidsSchemaRepository;
                        const bidQueueRepo = this.bidQueueSchemaRepository;
                        const nfTsRepo = this.nfTsSchemaRepository;
                        const collectionsRepo = this.collectionsSchemaRepository;
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_COLLECTOR} - ARTZERO Azero Domain Colector is active!`);
                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        global_vars.is_check_new_az_domain_nft = false;
                        try {
                            await check_new_azero_domains_nft_queue(
                                bidsRepo,
                                bidQueueRepo,
                                nfTsRepo,
                                collectionsRepo
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_COLLECTOR} - ERROR CronJobAzeroDomainCollector: ${e.message}`);console.log(e);
                        }
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_COLLECTOR} - End CronJobAzeroDomainCollector`);
                    }
            },
            start: true,
        });
    }
}