import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {ContractPromise} from "@polkadot/api-contract";
import * as staking_calls from "../contracts/staking_calls";
import {staking} from "../contracts/staking";
import {delay} from "../utils/utils";
import {setClaimedStatus} from "./actions";
import {global_vars, SOCKET_STATUS} from "./global";
import {globalApi} from "../index";
import {repository} from "@loopback/repository";
import {ConfigRepository} from "../repositories";
@cronJob()
export class CronJobSetStakerClaimbe implements Provider<CronJob> {
    constructor(
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.SET_STAKER_CLAIMBE,
            name: CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE,
            onTick: async () => {
                try {
                    if (CRONJOB_ENABLE.SET_STAKER_CLAIMBE) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - RUN JOB AZ_TELEGRAM_BOT NOW: ${currentTime}`);

                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        try {
                            await setClaimedStatus();
                        } catch (e) {
                            console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`${CONFIG_TYPE_NAME.SET_STAKER_CLAIMBE} - ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}