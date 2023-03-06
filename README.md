# ArtZero backend

## Introduction

This is the Backend code to serve ArtZero NFT Marketplace

## Code

### database.js
The backend uses MongoDB to keep all records mainly for front-end uses. All table structures can be found in this file.

### Api

API code locates at /Api and provide endpoint service to ArtZero frontend, InkWhale Frontend, SubWallet and any other services that use ArtZero Platform

### az_bids_monitor.js
When there are any bid activities in the frontend, a bid request is sent to the server and kept in BidQueue, the script checks  the queue and updates the Bid Table with latest changes from the Contract.

The script also queries all rows in Bid table to double check and update the Bid Table with latest changes from the Contract.

### az_cache_image.js

All images in the frontend are saved as a cached version in the Backend. There are 5 different cached version
Width of 100 px
Width of 500 px
Width of 1024 px
Width of 1440 px
Width of 1920 px

Depending on the usage purpose, the frontend will send a cache request to the server and the server will cache the image as requested. By default, 100px and 500px versions are cached and other versions are optional. Image is obtained via getImage API.

### az_cloudflare_sync_monitor.js

The script scan the local images from database and cache a version on Cloudflare Image then remove the local version.

### az_collection_monitor.js
The script checks all new collections from the collection contract and adds to the database. It also checks the collection queue to update the collection information when being requested by the front-end.

### az_nft_monitor.js
The script checks the nft queue to update the nft information when being requested by the front-end. It scans all NFTs in the database to update NFT information
It also checks the Praying Mantis Predator NFT collection for newly created NFTs. This should be disabled after 10K NFTs are minted.

### az_events_collector.js

This script scans each block in blockchain to retrieve all Events emitted from ArtZero's contracts and update the database for API uses.

### az_project_monitor.js

This script scan the queue and blockchain for any changes of launchpad projects on ArtZero and update the database all launchpad projects' information.

### az_telegram_bot.js
The script monitors the queues in the database and sends a message to a Telegram group so the team knows what is happening in the backend.
This script will be upgraded for more advanced tasks like monitor hacking attempts, server loads … etc (Work in progress)


## How to deploy Backend

### .env file

**.env** files. One for Api service and one for all az_ cronjob services are needed to run the services.
After cloning the backend repository, please run the command below to set up the automation .env file
```sh
cd backend
chmod +x setup_env_be.sh.x
./setup_env_be.sh.x
```
Contact Brian to get the **password**

#### Cronjob services

Skip if already running script ./setup_env_be.sh.x
Or using  .env template file

```
CALLER= <any address>
PHRASE=
WSSPROVIDER=wss://ws.test.azero.dev
REACT_APP_API_BASE_URL=http://127.0.0.1:3410
TELEGRAM_URL=https://api.telegram.org/bot<bot_id_key>
TELEGRAM_ID_CHAT=<chat_key>
MONGODB_URL=mongodb://<Acc>:<Password>@<host_db>:<port_db>/<database_name>
CLOUDFLARE_ACCOUNT_ID=<get infomation on Cloudflare>
CLOUDFLARE_ACCOUNT_HASH=<get infomation on Cloudflare>
CLOUDFLARE_API_KEY=<Create API key in Profile Setup>
TELEGRAM_REPORT_URL=https://api.telegram.org/bot<bot_id_key>
TELEGRAM_REPORT_ID_CHAT=<chat_key>
IPFS_BASE_URL=https://artzeronft.infura-ipfs.io/ipfs
# Example
# MONGODB_URL=mongodb://AccTest:AccPass@localhost:27017/DbTest
...
```

#### API services

Skip if already running script ./setup_env_be.sh.x

Go to the Api folder and create new .env file with this config:
```
PORT=3410
DB_NAME=ArtZeroDB
DB_CONNECTOR=mongodb
DB_URL=
DB_HOST=<host_db>
DB_PORT=<port_db>
DB_USER=<Acc>
DB_PASSWORD=<Password>
DB_DATABASE=<database_name>
DB_USE_NEW_URL_PARSER=true
CALLER= <any address>
PHRASE=
WSSPROVIDER=wss://ws.test.azero.dev
REACT_APP_API_BASE_URL=https://api.artzero.io
TELEGRAM_URL=https://api.telegram.org/<bot_id_key>
TELEGRAM_ID_CHAT=<chat_key>
CLOUDFLARE_ACCOUNT_ID=<get infomation on Cloudflare>
CLOUDFLARE_ACCOUNT_HASH=<get infomation on Cloudflare>
CLOUDFLARE_API_KEY=<Create API key in Profile Setup>
TELEGRAM_REPORT_URL=https://api.telegram.org/bot<bot_id_key>
TELEGRAM_REPORT_ID_CHAT=<chat_key>
IPFS_BASE_URL=https://artzeronft.infura-ipfs.io/ipfs


# Example
# DB_NAME=ArtZeroDB # Get from art-zero-db.datasource.ts
# DB_HOST=localhost
# DB_PORT=27017
# DB_USER=AccTest
# DB_PASSWORD=AccPass
# DB_DATABASE=DbTest
# DB_USE_NEW_URL_PARSER=true
# WSSPROVIDER=wss://ws.test.azero.dev
# REACT_APP_API_BASE_URL=http://127.0.0.1:3410
# IPFS_BASE_URL=https://artzeronft.infura-ipfs.io/ipfs
...
```

### MongoDB

MongoDB needs to be setup on the server or local machine to be able to run the services. You should create new user from terminal:
```
use DbTest;
db.dropUser("AccTest")
db.runCommand({
		"createUser" : "AccTest",
		"pwd" : "AccPass",
		"customData" : {
		},
		"roles" : [
			{
				"role" : "dbOwner",
				"db" : "DbTest"
			}
		]
	});
```

### Run Backend Job

You can use pm2 to trigger following services:
```
node az_bids_monitors
node az_cache_image
node az_cloudflare_sync_monitor
node az_collection_monitor
node az_events_collector
node az_nft_monitor
node az_project_monitor
node az_telegram_bot
```

## Run API service

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

Go to the Api folder

```sh
cd Api
yarn install
```

## Run the application

```sh
yarn start
```
or use pm2 
```sh
pm2 start npm --name=az_api -- run start
```


You can also run `node .` to skip the build step.

Open http://127.0.0.1:3410/getCollectionCount in your browser to test.

## Rebuild the project

To incrementally build the project:

```sh
yarn run build
```

To force a full build by cleaning up cached artifacts:

```sh
yarn run rebuild
```

## Fix code style and formatting issues

```sh
yarn run lint
```

To automatically fix such issues:

```sh
yarn run lint:fix
```

## Other useful commands

- `yarn run migrate`: Migrate database schemas for models
- `yarn run openapi-spec`: Generate OpenAPI spec into a file
- `yarn run docker:build`: Build a Docker image for this application
- `yarn run docker:run`: Run this application inside a Docker container

## Tests

```sh
yarn test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
