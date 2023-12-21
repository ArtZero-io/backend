import {ApplicationConfig, ApiApplication} from './application';
import dotenv from "dotenv";
import {CronJobAzCollectionMonitor} from "./cronjobs/azCollectionMonitor";
import {createBindingFromClass} from "@loopback/core";
import {CronJobAzBidsMonitor} from "./cronjobs/azBidsMonitor";
import {CronJobAzCacheImage} from "./cronjobs/azCacheImage";
import {CronJobAzCloudflareSyncMonitor} from "./cronjobs/azCloudflareSyncMonitor";
import {CronJobAzEventsCollector} from "./cronjobs/azEventsCollector";
import {CronJobAzNftMonitor} from "./cronjobs/azNftMonitor";
import {CronJobAzProjectMonitor} from "./cronjobs/azProjectMonitor";
import {CronJobAzTelegramBot} from "./cronjobs/azTelegramBot";
import {CronJobSetStakerClaimbe} from "./cronjobs/setStakerClaimble";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {global_vars, SOCKET_STATUS} from "./cronjobs/global";
import {CronJobAzNftMonitorScanAll} from "./cronjobs/azNftMonitorScanAll";
import {CronJobAzProjectWhitelist} from "./cronjobs/azProjectWhitelist";
import {CRONJOB_ENABLE} from "./utils/constant";
import {CronJobAzProcessingAllQueueNft} from "./cronjobs/azProcessingAllQueueNft";
import {CronJobThreads} from "./cronjobs/checkThread";
import {CronJobAzBidsMonitorAutoCheckQueue} from "./cronjobs/azBidsMonitorAutoCheckQueue";
import {CronJobAzeroDomainCollector} from "./cronjobs/azeroDomainCollector";
import {CronJobAzEventsCollectorReScan} from "./cronjobs/azEventsCollectorReScan";
import {CronJobAzNftTransferCollector} from "./cronjobs/azNftTransferCollector";
export * from './application';
import * as mongoDB from "mongodb";
import "./utils/telegram/bot";

dotenv.config();
export let globalApi: ApiPromise;
export let localApi: ApiPromise;

export const collectionsList: {
  collectionSchema?: mongoDB.Collection,
  nftSchema?: mongoDB.Collection,
} = {}
export async function connectToDatabase () {
  dotenv.config();
  const dbUrl:string = process.env.DB_URL ? process.env.DB_URL : `127.0.0.1:27017`;
  const dbCollection:string = `collections`;
  const dbNft:string = `nfts`;
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbUrl);
  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_URL_NAME);
  const collectionSchema: mongoDB.Collection = db.collection(dbCollection);
  const nftSchema: mongoDB.Collection = db.collection(dbNft);
  collectionsList.nftSchema = nftSchema;

  console.log(`Successfully connected to database: ${db.databaseName}`);
  console.log(`Successfully connected to collection: ${collectionSchema.collectionName}`);
  console.log(`Successfully connected to collection: ${nftSchema.collectionName}`);
}

export async function main(options: ApplicationConfig = {}) {
  const app = new ApiApplication(options);

  console.log('main file: CRONJOB_ENABLE.AZ_AZERO_DOMAINS_COLLECTOR', CRONJOB_ENABLE.AZ_AZERO_DOMAINS_COLLECTOR);
  if (CRONJOB_ENABLE.AZ_AZERO_DOMAINS_COLLECTOR) {
    const cronJobAzeroDomainCollector = createBindingFromClass(CronJobAzeroDomainCollector);
    app.add(cronJobAzeroDomainCollector);
    app.configure(cronJobAzeroDomainCollector.key);
  }

  if (CRONJOB_ENABLE.AZ_BIDS_MONITOR) {
    const cronJobAzBidsMonitor = createBindingFromClass(CronJobAzBidsMonitor);
    app.add(cronJobAzBidsMonitor);
    app.configure(cronJobAzBidsMonitor.key);
  }
  if (CRONJOB_ENABLE.AZ_BIDS_MONITOR_CHECK_QUEUE) {
    const cronJobAzBidsMonitorAutoCheckQueue = createBindingFromClass(CronJobAzBidsMonitorAutoCheckQueue);
    app.add(cronJobAzBidsMonitorAutoCheckQueue);
    app.configure(cronJobAzBidsMonitorAutoCheckQueue.key);
  }
  if (CRONJOB_ENABLE.AZ_CACHE_IMAGE) {
    const cronJobAzCacheImage = createBindingFromClass(CronJobAzCacheImage);
    app.add(cronJobAzCacheImage);
    app.configure(cronJobAzCacheImage.key);
  }
  if (CRONJOB_ENABLE.AZ_CLOUDFLARE_SYNC_MONITOR) {
    const cronJobAzCloudflareSyncMonitor = createBindingFromClass(CronJobAzCloudflareSyncMonitor);
    app.add(cronJobAzCloudflareSyncMonitor);
    app.configure(cronJobAzCloudflareSyncMonitor.key);
  }
  if (CRONJOB_ENABLE.AZ_COLLECTION_MONITOR) {
    const cronJobAzCollectionMonitor = createBindingFromClass(CronJobAzCollectionMonitor);
    app.add(cronJobAzCollectionMonitor);
    app.configure(cronJobAzCollectionMonitor.key);
  }
  if (CRONJOB_ENABLE.AZ_EVENTS_COLLECTOR) {
    const cronJobAzEventsCollector = createBindingFromClass(CronJobAzEventsCollector);
    app.add(cronJobAzEventsCollector);
    app.configure(cronJobAzEventsCollector.key);
  }
  if (CRONJOB_ENABLE.AZ_NFT_MONITOR) {
    const cronJobAzNftMonitor = createBindingFromClass(CronJobAzNftMonitor);
    app.add(cronJobAzNftMonitor);
    app.configure(cronJobAzNftMonitor.key);
  }
  if (CRONJOB_ENABLE.AZ_NFT_MONITOR_SCAN_ALL) {
    const cronJobAzNftMonitorScanAll = createBindingFromClass(CronJobAzNftMonitorScanAll);
    app.add(cronJobAzNftMonitorScanAll);
    app.configure(cronJobAzNftMonitorScanAll.key);
  }
  if (CRONJOB_ENABLE.AZ_PROJECT_MONITOR) {
    const cronJobAzProjectMonitor = createBindingFromClass(CronJobAzProjectMonitor);
    app.add(cronJobAzProjectMonitor);
    app.configure(cronJobAzProjectMonitor.key);
  }
  if (CRONJOB_ENABLE.AZ_PROJECT_WHITELIST) {
    const cronJobAzProjectWhitelist = createBindingFromClass(CronJobAzProjectWhitelist);
    app.add(cronJobAzProjectWhitelist);
    app.configure(cronJobAzProjectWhitelist.key);
  }
  if (CRONJOB_ENABLE.AZ_TELEGRAM_BOT) {
    const cronJobAzTelegramBot = createBindingFromClass(CronJobAzTelegramBot);
    app.add(cronJobAzTelegramBot);
    app.configure(cronJobAzTelegramBot.key);
  }
  if (CRONJOB_ENABLE.SET_STAKER_CLAIMBE) {
    const cronJobSetStakerClaimbe = createBindingFromClass(CronJobSetStakerClaimbe);
    app.add(cronJobSetStakerClaimbe);
    app.configure(cronJobSetStakerClaimbe.key);
  }
  if (CRONJOB_ENABLE.AZ_PROCESSING_ALL_QUEUE_NFT) {
    const cronJobAzProcessingAllQueueNft = createBindingFromClass(CronJobAzProcessingAllQueueNft);
    app.add(cronJobAzProcessingAllQueueNft);
    app.configure(cronJobAzProcessingAllQueueNft.key);
  }
  if (CRONJOB_ENABLE.AZ_EVENTS_COLLECTOR_RESCAN) {
    const cronJobAzEventsCollectorReScan = createBindingFromClass(CronJobAzEventsCollectorReScan);
    app.add(cronJobAzEventsCollectorReScan);
    app.configure(cronJobAzEventsCollectorReScan.key);
  }

  if (CRONJOB_ENABLE.AZ_NFT_TRANSFER_COLLECTOR) {
    const cronJobAzNftTransferCollector = createBindingFromClass(CronJobAzNftTransferCollector);
    app.add(cronJobAzNftTransferCollector);
    app.configure(cronJobAzNftTransferCollector.key);
  }

  connectToDatabase().then(() => {
    console.log(`Connected DB`);
  });


  const cronJobThreads = createBindingFromClass(CronJobThreads);
  app.add(cronJobThreads);
  app.configure(cronJobThreads.key);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

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
        console.log(`Global RPC Connected: ${process.env.WSSPROVIDER}`);
        global_vars.socketStatus = SOCKET_STATUS.CONNECTED;
      });
    });
    globalApi.on("ready", async () => {
      console.log("Global RPC Ready");
      global_vars.socketStatus = SOCKET_STATUS.READY;
    });
    globalApi.on("error", (err) => {
      console.log('error', err );
      global_vars.socketStatus = SOCKET_STATUS.ERROR;
    });
  } catch (e) {
    console.log(`API GLOBAL - ERROR: ${e.message}`);
  }

  // LOCAL RPC
  try {
    const provider = new WsProvider(process.env.WSSPROVIDER_LOCAL);
    localApi = new ApiPromise({
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
    localApi.on("connected", () => {
      localApi.isReady.then((api) => {
        console.log(`LOCAL RPC Connected: ${process.env.WSSPROVIDER_LOCAL}`);
        global_vars.socketStatusLocal = SOCKET_STATUS.CONNECTED;
      });
    });
    localApi.on("ready", async () => {
      console.log("LOCAL RPC Ready");
      global_vars.socketStatusLocal = SOCKET_STATUS.READY;
    });
    localApi.on("error", (err) => {
      console.log(`API LOCAL - ERROR: ${err}`);
      global_vars.socketStatusLocal = SOCKET_STATUS.ERROR;
    });
  } catch (e) {
    console.log(`API LOCAL - ERROR: ${e.message}`);
  }

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 4001),
      host: process.env.HOST,
      protocol: 'http',
      // key: fs.readFileSync(`${process.env.SSL_KEY}`),
      // cert: fs.readFileSync(`${process.env.SSL_PEM}`),
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      requestBodyParser: {json: {limit: '1MB'}},
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
        disabled: true
      },
      apiExplorer: {
        disabled: true,
      },
      cors: {
        origin: (process.env.CORS_ORIGIN) ? process.env.CORS_ORIGIN : '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
