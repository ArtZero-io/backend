export const EACH_HOUR = '0 * * * *';                           // Every 1 hour
export const EACH_3_HOUR = '0 */3 * * *';                       // Every 3 hours
export const EACH_MINUTE = '* * * * *';                         // Every 1 minute
export const EACH_3_MINUTES = '* * * * *';                      // Every 3 minute
export const EACH_30_MINUTES = '*/30 * * * *';                  // Every 30 minutes
export const EACH_5_MINUTES = '*/5 * * * *';                    // Every 5 minutes
export const EACH_SECOND = '*/1 * * * * *';                     // Every 1 second
export const EACH_3_SECONDS = '*/3 * * * * *';                  // Every 3 seconds
export const EACH_5_SECONDS = '*/5 * * * * *';                  // Every 5 seconds
export const EACH_7_SECONDS = '*/7 * * * * *';                  // Every 7 seconds
export const EACH_15_SECONDS = '*/15 * * * * *';                // Every 15 seconds
export const EACH_30_SECONDS = '*/30 * * * * *';                // Every 30 seconds

export const CRONJOB_TIME = {
    AZ_NFT_MONITOR: EACH_7_SECONDS,
    AZ_NFT_MONITOR_SCAN_ALL: EACH_3_HOUR,
    AZ_COLLECTION_MONITOR: EACH_3_SECONDS,
    AZ_BIDS_MONITOR: EACH_3_SECONDS,
    AZ_CACHE_IMAGE: EACH_3_SECONDS,
    AZ_CLOUDFLARE_SYNC_MONITOR: EACH_3_SECONDS,
    AZ_EVENTS_COLLECTOR: EACH_3_SECONDS,
    AZ_PROJECT_MONITOR: EACH_3_SECONDS,
    AZ_TELEGRAM_BOT: EACH_3_SECONDS,
    SET_STAKER_CLAIMBE: EACH_3_SECONDS,
};

export const IS_DEBUG = true; // set TRUE for debugging at the localhost by REST api, FALSE for run on the server
export const CRONJOB_ENABLE = {
    AZ_NFT_MONITOR: !IS_DEBUG,
    AZ_NFT_MONITOR_SCAN_ALL: !IS_DEBUG,
    AZ_COLLECTION_MONITOR: !IS_DEBUG,
    AZ_BIDS_MONITOR: !IS_DEBUG,
    AZ_CACHE_IMAGE: !IS_DEBUG,
    AZ_CLOUDFLARE_SYNC_MONITOR: !IS_DEBUG,
    AZ_EVENTS_COLLECTOR: !IS_DEBUG,
    AZ_PROJECT_MONITOR: !IS_DEBUG,
    AZ_TELEGRAM_BOT: !IS_DEBUG,
    SET_STAKER_CLAIMBE: !IS_DEBUG,
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
    NO_IMAGES: "No Images",
    NO_IMAGE_TYPE: "No Image Type",
    NO_METADATA: "No Metadata",
    INVALID_EMAIL_FORMAT: "Invalid email format!",
    INVALID_ADDRESS: "Invalid Address",
    INVALID_INPUT: "Invalid Input",
    INVALID_COLLECTION_ADDRESS: "Invalid Collection Address",
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
    IPFS_BASE_URL: "https://artzero.infura-ipfs.io/ipfs/",
    // IPFS_BASE_URL: "https://ipfs.io/ipfs/",
    // IPFS_BASE_URL: "https://ipfs.infura.io/ipfs/",
    INFURA_IPFS_BASE_URL: "https://artzeronft.infura-ipfs.io/ipfs/",
    PUBLIC_PINATA_IPFS_BASE_URL: "https://gateway.pinata.cloud/ipfs/",
    AZ_PINATA_IPFS_BASE_URL: "https://artzero.mypinata.cloud/ipfs/",
    IPFS_CLIENT_URL: "https://ipfs.infura.io:5001/api/v0"
}
