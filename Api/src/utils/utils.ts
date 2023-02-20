import {BN, BN_ONE, hexToU8a, isHex} from "@polkadot/util";
import {decodeAddress, encodeAddress} from "@polkadot/keyring";
import {ApiPromise} from "@polkadot/api";
import {WeightV2} from "@polkadot/types/interfaces";
import axios from "axios";
import {STATUS} from "./constant";
import {BindingKey} from "@loopback/core";
import {RequestHandler} from "express-serve-static-core";

export type FileUploadHandler = RequestHandler;


const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

export function send_telegram_message(message: string) {
    axios({
        baseURL: process.env.TELEGRAM_URL,
        url: "/sendMessage",
        method: "post",
        data: {
            "chat_id": process.env.TELEGRAM_ID_CHAT,
            "text": `Internal: ${message}`
        },
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export function convertNumberWithoutCommas(input: string):string {
    return input.replace(/,/g, "");
}

export function splitFileName(path: string):string {
    let str = path.split('\\').pop();
    if (str) {
        str = str.split('/').pop();
    }
    return str ? str : "";
}

export function randomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getFileTypeFromCID() {}

export function isValidAddressPolkadotAddress(address: string): boolean {
    try {
        encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
        return true;
    } catch (error) {
        return false;
    }
}

export async function delay(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function todayFolder():string {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months = require(1-12)
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const hour = dateObj.getHours();
    return year + "/" + month + "/" + day + "/" + hour;
}

export async function client(
    method: string,
    url: string,
    options = {},
    baseURL = process.env.REACT_APP_API_BASE_URL
) {
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
    };
    const urlencodedOptions = new URLSearchParams(
        Object.entries(options)
    ).toString();
    const { data } = await axios({
        baseURL,
        url,
        method,
        headers,
        data: urlencodedOptions,
    });
    const { status, ret, message } = data;
    if (status === STATUS.OK) {
        return ret;
    }
    if (status === STATUS.FAILED) {
        return message;
    }
    return data;
}

export const APICall = {
    getMetadataOffChain: async (param: { tokenUri:string, tokenID: string }) => {
        const ret = await client(
            "GET",
            `/getJSON?input=${param.tokenUri}${param.tokenID}.json`,
            {}
        );
        console.log("getMetadataOffChain ret", ret);
        return ret;
    },
}

export function readOnlyGasLimit(api: ApiPromise):WeightV2 {
    return api.registry.createType('WeightV2', {
        refTime: new BN(1_000_000_000_000),
        proofSize: MAX_CALL_WEIGHT,
    });
}