export const EACH_HOUR = '0 * * * *';                          // Every 1 hour
export const EACH_MINUTE = '* * * * *';                        // Every 1 minute
export const EACH_3_MINUTES = '* * * * *';                     // Every 3 minute
export const EACH_30_MINUTES = '*/30 * * * *';                 // Every 30 minutes
export const EACH_5_MINUTES = '*/5 * * * *';                   // Every 5 minutes
export const EACH_SECOND = '*/1 * * * * *';                    // Every 1 second
export const EACH_15_SECONDS = '*/15 * * * * *';               // Every 15 seconds
export const EACH_30_SECONDS = '*/30 * * * * *';               // Every 30 seconds

export const CRONJOB_TIME = {
    NFT_MONITOR: EACH_30_MINUTES
};

export const IS_DEBUG = false; // set TRUE for debugging at the localhost by REST api, FALSE for run on the server
export const CRONJOB_ENABLE = {
    NFT_MONITOR: !IS_DEBUG
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
}
