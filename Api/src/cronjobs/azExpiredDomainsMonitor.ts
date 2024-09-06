import {CONFIG_TYPE_NAME, CRONJOB_ENABLE, CRONJOB_TIME, GET_CONFIG_FORM_DB } from "../utils/constant";
import {Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {global_vars, SOCKET_STATUS} from "./global";
import {repository} from "@loopback/repository";
import {check_expired_azero_domain_nft_queue} from "./actions";
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
export class CronJobAzExpiredDomainsMonitor implements Provider<CronJob> {
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
            cronTime: CRONJOB_TIME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR,
            name: CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR,
            onTick: async () => {
                
                    let getConfig:boolean = CRONJOB_ENABLE.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR;
                    if (getConfig) {
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR} - Start CronJobAzeroDomainCollector`);
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR} - RUN JOB AZ_AZERO_DOMAINS_COLLECTOR NOW: ${currentTime}`);
                        const nfTsRepo = this.nfTsSchemaRepository;
                        const collectionsRepo = this.collectionsSchemaRepository;
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR} - ARTZERO Azero Domain Colector is active!`);
                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        global_vars.is_check_expired_domain = false;
                        try {
                            await check_expired_azero_domain_nft_queue(
                                nfTsRepo,
                                collectionsRepo
                            );
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR} - ERROR CronJobAzeroDomainCollector: ${e.message}`);console.log(e);
                        }
                        console.log(`${CONFIG_TYPE_NAME.AZ_AZERO_DOMAINS_EXPIRED_DOMAIN_MONITOR} - End CronJobAzeroDomainCollector`);
                    }
            },
            start: true,
        });
    }
}