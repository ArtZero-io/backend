# ArtZero backend

## Introduction

This is the Backend code to

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

#### Cronjob services

```
CALLER= <any address>
PHRASE=
WSSPROVIDER=wss://ws.test.azero.dev
REACT_APP_API_BASE_URL=https://api.artzero.io
TELEGRAM_URL=https://api.telegram.org/<bot_id_key>
TELEGRAM_ID_CHAT=<chat_key>
MONGODB_URL=mongodb://db.artzero.io:27017/artzero
```

#### API services

```
PORT=3410
DB_NAME=ArtZeroDB
DB_CONNECTOR=mongodb
DB_URL=
DB_HOST=db.art-zero.testnet
DB_PORT=27071
DB_USER=ArtZeroAccTest
DB_PASSWORD=
DB_DATABASE=
DB_USE_NEW_URL_PARSER=true
SSL_KEY=
SSL_PEM=
CALLER= <any address>
PHRASE=
WSSPROVIDER=wss://ws.test.azero.dev
REACT_APP_API_BASE_URL=https://api.artzero.io
TELEGRAM_URL=https://api.telegram.org/<bot_id_key>
TELEGRAM_ID_CHAT=<chat_key>
MONGODB_URL=mongodb://db.artzero.io:27017/artzero
```

### MongoDB

MongoDB needs to be setup on the server or local machine to be able to run the services.

### Run Backend Job

You can use pm2 to trigger following services:
```
node az_bids_monitor
node az_cache_image
node az_cloudflare_sync_monitor
node az_collection_monitor
node az_events_collector
node az_nft_monitor
node az_project_monitor
node az_telegram_bot
```

## Run API service

Check ![API doc](Api/README.md) for instructions
