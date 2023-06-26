import {createClient, RedisClientType} from "redis";
import dotenv from "dotenv";
import * as mongoDB from "mongodb";
import {EventTransfer} from "../models";
import {randomAsNumber} from "@polkadot/util-crypto";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {ContractPromise} from "@polkadot/api-contract";
import {collection_manager} from "../contracts/collection_manager";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import {profile} from "../contracts/profile";
import * as profile_calls from "../contracts/profile_calls";
dotenv.config();

export const collections: { eventTransfer?: mongoDB.Collection } = {}
export async function connectToDatabase () {
    dotenv.config();
    const dbUrl:string = process.env.DB_URL ? process.env.DB_URL : `127.0.0.1:27017`;
    const dbEventTransferCollection:string = `EventTransfer`;
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbUrl);
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_URL_NAME);
    const eventTransferCollection: mongoDB.Collection = db.collection(dbEventTransferCollection);
    collections.eventTransfer = eventTransferCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${eventTransferCollection.collectionName}`);
}

export class RedisCache {
    private readonly cache: RedisClientType;
    private ttl: number; // Time to Live

    constructor(ttl: number) {
        this.ttl = ttl;
        this.cache = createClient({
            url: process.env.REDIS_URL
        });
        this.cache.on("error", (error: any) => {
            console.error(`Redis Client Error: ${error}`);
        });
        this.cache.on("connect", () => {
            console.log(`Redis connection established`);
        });
    }

    async test() {
        await this.cache.connect();

        // TODO: Add events Data into cache
        for(let blockNumber = 1; blockNumber < 100; blockNumber++) {
            await this.cache.set(`blockNumber_${blockNumber}`, `blockNumberData_${blockNumber}`);
        }

        let value = await this.cache.get(`charlesKey_${12}`);
        console.log({value: value});

        if (collections?.eventTransfer) {
            // const eventDataObject = await collections.eventTransfer.findOne({
            //     blockNumber: 1
            // });
            const eventDataObject = await collections.eventTransfer.find({
                blockNumber: 1
            });
            if (eventDataObject) {
                const eventData: EventTransfer[] = (await eventDataObject.toArray()) as unknown as EventTransfer[];
                console.log({eventData: eventData});
            } else {
                await collections.eventTransfer.insertOne({
                    blockNumber: randomAsNumber(),
                    data: {
                        name: `test`,
                        value: `test_${new Date().getTime()}`
                    },
                    createdTime: new Date(),
                    updatedTime: new Date(),
                });
            }
        }

        await this.cache.flushDb();

        value = await this.cache.get(`charlesKey_${17}`);
        console.log({value: value});

        await this.cache.disconnect();
    }

    // [2] generic function, takes `fetcher` argument which is meant to refresh the cache
    // async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    //     // [3] if we're not connected to redis, bypass cache
    //     if (!this.cache.connected) {
    //         return await fetcher();
    //     }
    //
    //     return new Promise((resolve, reject) => {
    //         this.cache.get(key, async (err, value) => {
    //             if (err) return reject(err);
    //             if (value) {
    //                 // [4] if value is found in cache, return it
    //                 return resolve(JSON.parse(value));
    //             }
    //
    //             // [5] if value is not in cache, fetch it and return it
    //             const result = await fetcher();
    //             this.cache.set(
    //                 key,
    //                 JSON.stringify(result),
    //                 "EX",
    //                 this.ttl,
    //                 (err, reply) => {
    //                     if (err) return reject(err);
    //                 }
    //             );
    //             return resolve(result);
    //         });
    //     });
    // }
    //
    // // [6]
    // del(key: string) {
    //     this.cache.del(key);
    // }
    //
    // flush() {
    //     this.cache.flushall();
    // }
}

const provider = new WsProvider(process.env.WSSPROVIDER_API);
let api = new ApiPromise({
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
api.on("connected", () => {
    api.isReady.then(() => {
        console.log("Smartnet AZERO Connected");
    });
});

api.on("ready", () => {
    console.log("Smartnet AZERO Ready");
    connectToDatabase().then(() => {
        const newCache = new RedisCache(5000);
        newCache.test().then();
    });
});

api.on("error", (err) => {
    console.log('error', err);
});
