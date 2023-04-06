import {BlackListRepository} from "../repositories";
import {BLACK_LIST_TYPE} from "./constant";

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