import {BlackListRepository} from "../repositories";
import {BLACK_LIST_TYPE} from "./constant";
import dotenv from "dotenv";
import winston from "winston";
dotenv.config();
export const logger = winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp(), // adds a timestamp property
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logs/setClaimedStatus_error.log", level: "error"}),
        new winston.transports.File({filename: "logs/setClaimedStatus_info.log", level: "info"}),
        new winston.transports.File({filename: "logs/setClaimedStatus_warn.log", level: "warn"}),
        new winston.transports.File({filename: "logs/setClaimedStatus.log"}),
    ],
});
export const sleep = (waitTimeInMs: number) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
export function convertToUTCTime(date: Date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
export function delay(timeout:number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export function groupArrayOfObjects(list:any[], key:string) {
    return list.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

export function checkIPClientPrivate(ipClient: string) {
    let ret = false;
    const privateServer = process.env.PRIVATE_SERVER;
    if (privateServer) {
        const autoFarmKey = privateServer.split(',');
        autoFarmKey.map(item => {
            if (item === ipClient) {
                ret = true;
            }
        });
    }
    return ret;
}

export async function isBlackListCollection(
    blackListRepo: BlackListRepository,
    nftContractAddress: string
):Promise<boolean> {
    const data = await blackListRepo.findOne({
        where: {
            nftContractAddress: nftContractAddress,
            typeName: BLACK_LIST_TYPE.COLLECTION,
            isActive: true
        }
    });
    return !!data;
}