import {
    CRONJOB_ENABLE,
    CRONJOB_TIME
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime, sleep} from "../utils/Tools";
import {global_vars} from "./global";
@cronJob()
export class CronJobThreads implements Provider<CronJob> {
    constructor() {}
    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.THREADS,
            onTick: async () => {
                try {
                    if (CRONJOB_ENABLE.THREADS) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log(`RUN JOB THREAD NOW: ${currentTime}`);
                        try {
                            new Promise(async () => {
                                const currentThreadTime = convertToUTCTime(new Date());
                                global_vars.theadCounter = global_vars.theadCounter + 1;
                                const theadId = global_vars.theadCounter;
                                console.log(`${theadId} - Start Promise: ${currentThreadTime} at ${convertToUTCTime(new Date())}`);
                                await sleep(10000);
                                console.log(`${theadId} - Stop Promise: ${currentThreadTime} at ${convertToUTCTime(new Date())}`);
                            });
                        } catch (e) {
                            console.log(`ERROR: ${e.message}`);
                        }
                    }
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
            },
            start: true,
        });
    }
}