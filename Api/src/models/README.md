# Models

This directory contains code for models provided by this app.

# Index
## newListEventRepo
### Model: 
- newlistevents
### Command line: 
- db.newlistevents.createIndex( { "blockNumber": 1, "trader": 1, "nftContractAddress": 1, "tokenID": 1, "price": 1 }, { unique: true } )
### Keys:
- blockNumber
- trader
- nftContractAddress
- tokenID
- price

## unListEventRepo
### Model:
- unlistevents
### Command line:
- db.unlistevents.createIndex( { "blockNumber": 1, "trader": 1, "nftContractAddress": 1, "tokenID": 1 }, { unique: true } )
### Keys:
- blockNumber
- trader
- nftContractAddress
- tokenID


## purchaseEventRepo
### Model:
- purchaseevents
### Command line:
- db.purchaseevents.createIndex( { "blockNumber": 1, "buyer": 1, "seller": 1, "nftContractAddress": 1, "tokenID": 1, "price": 1, "platformFee": 1, "royaltyFee": 1 }, { unique: true } )
### Keys:
- blockNumber
- buyer
- seller
- nftContractAddress
- tokenID
- price
- platformFee
- royaltyFee

## bidWinEventRepo
### Model:
- bidwinevents
### Command line:
- db.bidwinevents.createIndex( { "blockNumber": 1, "buyer": 1, "seller": 1, "nftContractAddress": 1, "tokenID": 1, "price": 1, "platformFee": 1, "royaltyFee": 1 }, { unique: true } )
### Keys:
- blockNumber
- buyer
- seller
- nftContractAddress
- tokenID
- price
- platformFee
- royaltyFee

## stakingEventRepo
### Model:
- stakingevents
### Command line:
- db.stakingevents.createIndex( { "blockNumber": 1, "staker": 1, "eventName": 1, "tokenID": 1 }, { unique: true } )
### Keys:
- blockNumber
- staker
- eventName
- tokenID

## claimRewardEventRepo
### Model:
- claimrewardevents
### Command line:
- db.claimrewardevents.createIndex( { "blockNumber": 1, "staker": 1, "rewardAmount": 1, "stakedAmount": 1 }, { unique: true } )
### Keys:
- blockNumber
- staker
- rewardAmount
- stakedAmount

## withdrawEventRepo
### Model:
- withdrawevents
### Command line:
- db.withdrawevents.createIndex( { "blockNumber": 1, "receiver": 1, "withdrawAmount": 1 }, { unique: true } )
### Keys:
- blockNumber
- receiver
- withdrawAmount

## launchpadMintingEventRepo
### Model:
- launchpadmintingevents
### Command line:
- db.launchpadmintingevents.createIndex( { "blockNumber": 1, "mode": 1, "minter": 1, "phaseId": 1, "mintAmount": 1, "mintingFee": 1, "projectMintFee": 1 }, { unique: true } )
### Keys:
- blockNumber
- mode
- minter
- phaseId
- mintAmount
- mintingFee
- projectMintFee

## addRewardEventRepo
### Model:
- addrewardevents
### Command line:
- db.addrewardevents.createIndex( { "blockNumber": 1, "rewardAmount": 1, "totalStakedAmount": 1 }, { unique: true } )
### Keys:
- blockNumber
- rewardAmount
- totalStakedAmount

## collectionEventRepo
### Model:
- collectionevents
### Command line:
- db.collectionevents.createIndex( { "blockNumber": 1, "collectionOwner": 1, "nftContractAddress": 1, "contractType": 1, "isActive": 1 }, { unique: true } )
### Keys:
- blockNumber
- collectionOwner
- nftContractAddress
- contractType
- isActive

## bidQueueRepo
### Model:
- bidqueues
### Command line:
- db.bidqueues.createIndex( { "nftContractAddress": 1, "tokenID": 1, "seller": 1 }, { unique: true } )
### Keys:
- nftContractAddress
- tokenID
- seller

## nfTsRepo
### Model:
- nfts
### Command line:
- db.nfts.createIndex( { "nftContractAddress": 1, "tokenID": 1 }, { unique: true } )
### Keys:
- nftContractAddress
- tokenID

## collectionsRepo
### Model:
- collections
### Command line:
- db.collections.createIndex( { "nftContractAddress": 1 }, { unique: true } )
### Keys:
- nftContractAddress

## nftQueueScanAllRepo
### Model:
- nftqueuealls
### Command line:
- db.nftqueuealls.createIndex( { "nftContractAddress": 1, "tokenID": 1 }, { unique: true } )
### Keys:
- nftContractAddress
- tokenID

## nftQueueRepo
### Model:
- nftqueues
### Command line:
- db.nftqueues.createIndex( { "nftContractAddress": 1, "tokenID": 1 }, { unique: true } )
### Keys:
- nftContractAddress
- tokenID

## projectsRepo
### Model:
- projects
### Command line:
- db.projects.createIndex( { "nftContractAddress": 1 }, { unique: true } )
### Keys:
- nftContractAddress

## imageRepo
### Model:
- images
### Command line:
- db.images.createIndex( { "input": 1 }, { unique: true } )
### Keys:
- input

## scannedBlocksRepo
### Model:
- scannedblocks
### Command line:
- db.scannedblocks.createIndex( { "lastScanned": 1 }, { unique: true } )
### Keys:
- lastScanned

## blackListRepo
### Model:
- BlackList
### Command line:
- db.BlackList.createIndex( { "nftContractAddress": 1, "typeName": 1 }, { unique: true } )
### Keys:
- nftContractAddress
- typeName

## configRepo
### Model:
- Config
### Command line:
- db.Config.createIndex( { "typeConfig": 1, "nodeIp": 1, "nodeCluster": 1 }, { unique: true } )
### Keys:
- typeConfig
- nodeIp
- nodeCluster

## projectWhitelistQueueRepo
### Model:
- ProjectWhitelistQueues
### Command line:
- db.ProjectWhitelistQueues.createIndex( { "nftContractAddress": 1 }, { unique: true } )
### Keys:
- nftContractAddress

## withdrawEventRepo
### Model:
- withdrawevents
### Command line:
- db.withdrawevents.createIndex( { "blockNumber": 1, "receiver": 1, "withdrawAmount": 1 , "nftContractAddress": 1 }, { unique: true } )
### Keys:
- blockNumber
- receiver
- withdrawAmount
- nftContractAddress

## launchpadMintingEventRepo
### Model:
- launchpadmintingevents
### Command line:
- db.launchpadmintingevents.createIndex( { "blockNumber": 1, "mode": 1, "minter": 1, "phaseId": 1, "mintAmount": 1, "mintingFee": 1, "projectMintFee": 1, "nftContractAddress": 1 }, { unique: true } )
### Keys:
- blockNumber
- mode
- minter
- phaseId
- mintAmount
- mintingFee
- projectMintFee
- nftContractAddress