import {autoClaimReward} from "../cronjobs/actions";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {logger} from "../utils/Tools";
import {SOCKET_STATUS} from "../cronjobs/global";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { delay } from "../utils/utils";
export let globalApi: ApiPromise;
export let global_vars = {
    socketStatus: SOCKET_STATUS.ERROR,
}

async function autoClaimReward() {
 try {
     connect();

     let count = 0;
     while ((global_vars.socketStatus == SOCKET_STATUS.ERROR) && (count < 10)) {
         count++;
         await delay(1700);
         logger.info(count);
     }

     if ((global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) {
         await autoClaimReward(globalApi);
     }
 } catch (e) {
     logger.error(`doSetClaimed - ERROR: ${e.message}`);
 }
}
function connect() {
    try {
        const provider = new WsProvider(process.env.WSSPROVIDER);
        globalApi = new ApiPromise({
            provider,
            rpc: jsonrpc,
            types: {
                ContractsPsp34Id: {
                    _enum: {
                        U8: "u8",
                        U16: "u16",
                        U32: "u32",
                        U64: "u64",
                        U128: "u128",
                        Bytes: "Vec<u8>",
                    },
                },
            },
        });
        globalApi.on("connected", () => {
            globalApi.isReady.then((api) => {
                logger.info(`Global RPC Connected: ${process.env.WSSPROVIDER}`);
                global_vars.socketStatus = SOCKET_STATUS.CONNECTED;
            });
        });
        globalApi.on("ready", async () => {
            logger.info("Global RPC Ready");
            global_vars.socketStatus = SOCKET_STATUS.READY;
        });
        globalApi.on("error", (err) => {
            logger.error('error', err);
            global_vars.socketStatus = SOCKET_STATUS.ERROR;
        });
    } catch (e: any) {
        logger.error(`connect - ERROR: ${e.message}`);
    }
}

autoClaimReward().then();