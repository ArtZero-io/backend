import dotenv from "dotenv";
dotenv.config();
export const EACH_HOUR = '0 * * * *';                           // Every 1 hour
export const EACH_3_HOUR = '0 */3 * * *';                       // Every 3 hours
export const EACH_MINUTE = '* * * * *';                         // Every 1 minute
export const EACH_3_MINUTES = '*/3 * * * *';                    // Every 3 minute
export const EACH_5_MINUTES = '*/5 * * * *';                    // Every 5 minute
export const EACH_7_MINUTES = '*/7 * * * *';                    // Every 7 minute
export const EACH_11_MINUTES = '*/11 * * * *';                  // Every 11 minute
export const EACH_13_MINUTES = '*/13 * * * *';                  // Every 13 minute
export const EACH_15_MINUTES = '*/15 * * * *';                  // Every 15 minute
export const EACH_30_MINUTES = '*/30 * * * *';                  // Every 30 minutes
export const EACH_SECOND = '*/1 * * * * *';                     // Every 1 second
export const EACH_3_SECONDS = '*/3 * * * * *';                  // Every 3 seconds
export const EACH_5_SECONDS = '*/5 * * * * *';                  // Every 5 seconds
export const EACH_7_SECONDS = '*/7 * * * * *';                  // Every 7 seconds
export const EACH_11_SECONDS = '*/11 * * * * *';                // Every 11 seconds
export const EACH_13_SECONDS = '*/13 * * * * *';                // Every 13 seconds
export const EACH_10_SECONDS = '*/10 * * * * *';                // Every 10 seconds
export const EACH_15_SECONDS = '*/15 * * * * *';                // Every 15 seconds
export const EACH_30_SECONDS = '*/30 * * * * *';                // Every 30 seconds

// export const CRONJOB_TIME = {
//     AZ_NFT_MONITOR: EACH_3_SECONDS,
//     AZ_NFT_MONITOR_SCAN_ALL: EACH_3_HOUR,
//     AZ_PROCESSING_ALL_QUEUE_NFT: EACH_5_MINUTES,
//     AZ_COLLECTION_MONITOR: EACH_5_SECONDS,
//     AZ_BIDS_MONITOR: EACH_3_SECONDS,
//     AZ_BIDS_MONITOR_CHECK_QUEUE: EACH_MINUTE,
//     AZ_CACHE_IMAGE: EACH_7_SECONDS,
//     AZ_CLOUDFLARE_SYNC_MONITOR: EACH_3_SECONDS,
//     AZ_EVENTS_COLLECTOR: EACH_3_SECONDS,
//     AZ_PROJECT_MONITOR: EACH_7_SECONDS,
//     AZ_PROJECT_WHITELIST: EACH_15_SECONDS,
//     AZ_TELEGRAM_BOT: EACH_5_MINUTES,
//     SET_STAKER_CLAIMBE: EACH_3_SECONDS,
//     THREADS: EACH_3_SECONDS,
// };
export const CRONJOB_TIME = {
    AZ_NFT_MONITOR: process.env.CRONJOB_TIME_AZ_NFT_MONITOR ?? EACH_15_SECONDS,
    AZ_NFT_MONITOR_SCAN_ALL: process.env.CRONJOB_TIME_AZ_NFT_MONITOR_SCAN_ALL ?? EACH_3_HOUR,
    AZ_PROCESSING_ALL_QUEUE_NFT: process.env.CRONJOB_TIME_AZ_PROCESSING_ALL_QUEUE_NFT ?? EACH_5_MINUTES,
    AZ_COLLECTION_MONITOR: process.env.CRONJOB_TIME_AZ_COLLECTION_MONITOR ?? EACH_5_SECONDS,
    AZ_BIDS_MONITOR: process.env.CRONJOB_TIME_AZ_BIDS_MONITOR ?? EACH_3_SECONDS,
    AZ_BIDS_MONITOR_CHECK_QUEUE: process.env.CRONJOB_TIME_AZ_BIDS_MONITOR_CHECK_QUEUE ?? EACH_MINUTE,
    AZ_CACHE_IMAGE: process.env.CRONJOB_TIME_AZ_CACHE_IMAGE ?? EACH_7_SECONDS,
    AZ_CLOUDFLARE_SYNC_MONITOR: process.env.CRONJOB_TIME_AZ_CLOUDFLARE_SYNC_MONITOR ?? EACH_3_SECONDS,
    AZ_EVENTS_COLLECTOR: process.env.CRONJOB_TIME_AZ_EVENTS_COLLECTOR ?? EACH_3_SECONDS,
    AZ_PROJECT_MONITOR: process.env.CRONJOB_TIME_AZ_PROJECT_MONITOR ?? EACH_7_SECONDS,
    AZ_PROJECT_WHITELIST: process.env.CRONJOB_TIME_AZ_PROJECT_WHITELIST ?? EACH_15_SECONDS,
    AZ_TELEGRAM_BOT: process.env.CRONJOB_TIME_AZ_TELEGRAM_BOT ?? EACH_5_MINUTES,
    SET_STAKER_CLAIMBE: EACH_3_HOUR,
    THREADS: EACH_3_HOUR,
    AZ_AZERO_DOMAINS_COLLECTOR: process.env.CRONJOB_TIME_AZ_AZERO_DOMAINS_COLLECTOR ?? EACH_3_HOUR,
};
export const IS_ENABLE_DOCS = (process.env.IS_ENABLE_DOCS == "true"); // set FALSE for disabling api explorer
export const GET_CONFIG_FORM_DB = (process.env.GET_CONFIG_FORM_DB == "true"); // set TRUE for get config jobs from db

// export const CRONJOB_ENABLE = {
//     AZ_NFT_MONITOR: !IS_DEBUG,
//     AZ_NFT_MONITOR_SCAN_ALL: !IS_DEBUG,
//     AZ_PROCESSING_ALL_QUEUE_NFT: !IS_DEBUG,
//     AZ_COLLECTION_MONITOR: !IS_DEBUG,
//     AZ_BIDS_MONITOR: !IS_DEBUG,
//     AZ_BIDS_MONITOR_CHECK_QUEUE: !IS_DEBUG,
//     AZ_CACHE_IMAGE: !IS_DEBUG,
//     AZ_CLOUDFLARE_SYNC_MONITOR: !IS_DEBUG,
//     AZ_EVENTS_COLLECTOR: !IS_DEBUG,
//     AZ_PROJECT_MONITOR: !IS_DEBUG,
//     AZ_PROJECT_WHITELIST: !IS_DEBUG,
//     AZ_TELEGRAM_BOT: !IS_DEBUG,
//     SET_STAKER_CLAIMBE: false,
//     THREADS: false
// };
export const CRONJOB_ENABLE = {
    AZ_NFT_MONITOR: (process.env.IS_ENABLE_JOB_AZ_NFT_MONITOR == "true"),
    AZ_NFT_MONITOR_SCAN_ALL: (process.env.IS_ENABLE_JOB_AZ_NFT_MONITOR_SCAN_ALL == "true"),
    AZ_PROCESSING_ALL_QUEUE_NFT: (process.env.IS_ENABLE_JOB_AZ_PROCESSING_ALL_QUEUE_NFT == "true"),
    AZ_COLLECTION_MONITOR: (process.env.IS_ENABLE_JOB_AZ_COLLECTION_MONITOR == "true"),
    AZ_BIDS_MONITOR: (process.env.IS_ENABLE_JOB_AZ_BIDS_MONITOR == "true"),
    AZ_BIDS_MONITOR_CHECK_QUEUE: (process.env.IS_ENABLE_JOB_AZ_BIDS_MONITOR_CHECK_QUEUE == "true"),
    AZ_CACHE_IMAGE: (process.env.IS_ENABLE_JOB_AZ_CACHE_IMAGE == "true"),
    AZ_CHECKING_IMAGES_AND_JSON: (process.env.IS_ENABLE_JOB_AZ_CHECKING_IMAGES_AND_JSON == "true"),
    AZ_CLOUDFLARE_SYNC_MONITOR: (process.env.IS_ENABLE_JOB_AZ_CLOUDFLARE_SYNC_MONITOR == "true"),
    AZ_EVENTS_COLLECTOR: (process.env.IS_ENABLE_JOB_AZ_EVENTS_COLLECTOR == "true"),
    AZ_PROJECT_MONITOR: (process.env.IS_ENABLE_JOB_AZ_PROJECT_MONITOR == "true"),
    AZ_PROJECT_WHITELIST: (process.env.IS_ENABLE_JOB_AZ_PROJECT_WHITELIST == "true"),
    AZ_TELEGRAM_BOT: (process.env.IS_ENABLE_JOB_AZ_TELEGRAM_BOT == "true"),
    SET_STAKER_CLAIMBE: false,
    THREADS: false,
    AZ_AZERO_DOMAINS_COLLECTOR: (process.env.IS_ENABLE_AZ_AZERO_DOMAINS_COLLECTOR == "true"),
};

export const STATUS = {
    FAILED: 'FAILED',
    OK: 'OK'
}
export const MESSAGE = {
    SUCCESS: "SUCCESS",
    NO_INPUT: "No Input",
    NO_ADDRESS: "No address",
    NO_TOKEN_ID: "No Token ID",
    NO_DOMAIN_NAME: "No Domain name",
    NO_IMAGES: "No Images",
    NO_IMAGE_TYPE: "No Image Type",
    NO_METADATA: "No Metadata",
    INVALID_EMAIL_FORMAT: "Invalid email format!",
    INVALID_ADDRESS: "Invalid Address",
    INVALID_INPUT: "Invalid Input",
    INVALID_AUTHENTICATION: "Invalid Authentication",
    INVALID_COLLECTION_ADDRESS: "Invalid Collection Address",
    INVALID_PROJECT_ADDRESS: "Invalid Project Address",
    INVALID_NFT_ADDRESS: "Invalid NFT contract address",
    INVALID_BLACKLIST_TYPE_NAME: "Invalid type name of blacklist",
    NOT_EXIST_ADDRESS: "Not Exist Address",
    NOT_EXIST_ADDRESS_INACTIVE: "Not Exist Address/Inactive",
    NOT_EXIST_COLLECTION_ADDRESS: "Not Exist Collection Address",
    DUPLICATED_ADDRESS: "Duplicated Address",
    DUPLICATED_RECORD: "Duplicated Record",
    INPUT_ALREADY_EXIST: "Input already exist",
    JSON_NOT_EXIST: "JSON not exist",
    SIGN: "Sign message to report"
}

export const CACHE_IMAGE = {
    IPFS_BASE_URL: process.env.IPFS_BASE_URL,
    INFURA_IPFS_BASE_URL: process.env.INFURA_IPFS_BASE_URL
}

export const BLACK_LIST_TYPE = {
    PROJECT: "Project",
    LAUNCHPAD: "Launchpad",
    COLLECTION: "Collection",
    NFT: "Nft"
}

export const FLAG = {
    INIT: "Init",
    ERROR: "Error",
    BLACKLIST: "Blacklist"
}

export const CONFIG_TYPE_NAME = {
    AZ_BIDS_MONITOR: "CronJobAzBidsMonitor",
    AZ_BIDS_MONITOR_CHECK_QUEUE: "CronJobAzBidsMonitorAutoCheckQueue",
    AZ_CACHE_IMAGE: "CronJobAzCacheImage",
    AZ_CLOUDFLARE_SYNC_MONITOR: "CronJobAzCloudflareSyncMonitor",
    AZ_COLLECTION_MONITOR: "CronJobAzCollectionMonitor",
    AZ_EVENTS_COLLECTOR: "CronJobAzEventsCollector",
    AZ_NFT_MONITOR: "CronJobAzNftMonitor",
    AZ_NFT_MONITOR_SCAN_ALL: "CronJobAzNftMonitorScanAll",
    AZ_PROCESSING_ALL_QUEUE_NFT: "CronJobAzProcessingAllQueueNft",
    AZ_PROJECT_MONITOR: "CronJobAzProjectMonitor",
    AZ_PROJECT_WHITELIST: "CronJobAzProjectWhitelist",
    AZ_TELEGRAM_BOT: "CronJobAzTelegramBot",
    SET_STAKER_CLAIMBE: "CronJobSetStakerClaimbe",
    AZ_AZERO_DOMAINS_COLLECTOR: "CronJobAzeroDomainCollector"
};

export const MAX_NFT_QUEUE_ALL_IN_PROCESSING:number = (process.env.MAX_NFT_QUEUE_ALL_IN_PROCESSING)
    ? parseInt(process.env.MAX_NFT_QUEUE_ALL_IN_PROCESSING)
    : 1000;

export const MAX_NFT_QUEUE_IN_PROCESSING:number = (process.env.MAX_NFT_QUEUE_IN_PROCESSING)
    ? parseInt(process.env.MAX_NFT_QUEUE_IN_PROCESSING)
    : 10;
export const TIME_RESET_NFT_QUEUE_ALL:number = (process.env.TIME_RESET_NFT_QUEUE_ALL)
    ? parseInt(process.env.TIME_RESET_NFT_QUEUE_ALL)
    : 0;