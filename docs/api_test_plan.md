# Test Plan for ArtZero API

- Table of Contents
  - [Introduction](#introduction)
  - [Test cases](#test-cases)
    - [updateCollection](#updateCollection)
    - [updateProject](#updateProject)
    - [newMintingEvent](#newMintingEvent)
    - [getTotalVolume](#getTotalVolume)
    - [updateNFT](#updateNFT)
    - [updateBids](#updateBids)
    - [getBidsByBidderAddress](#getBidsByBidderAddress)
    - [getJSON](#getJSON)
    - [getImage](#getImage)
    - [getCollectionContract](#getCollectionContract)
    - [getCollectionCount](#getCollectionCount)
    - [getFeaturedCollections](#getFeaturedCollections)
    - [getCollections](#getCollections)
    - [getProjects](#getProjects)
    - [getCollectionsByVolume](#getCollectionsByVolume)
    - [getCollectionByID](#getCollectionByID)
    - [getCollectionsByOwner](#getCollectionsByOwner)
    - [countCollectionsByOwner](#countCollectionsByOwner) 
    - [getCollectionByAddress](#getCollectionByAddress)
    - [getFloorPrice](#getFloorPrice)
    - [getNFTs](#getNFTs)
    - [getListedNFTs](#getListedNFTs)
    - [getUnlistedNFTs](#getUnlistedNFTs)
    - [getNFTByID](#getNFTByID)
    - [getNFTsByOwner](#getNFTsByOwner)
    - [getNFTsByOwnerAndCollection](#getNFTsByOwnerAndCollection)
    - [getNFTsByCollectionAddress](#getNFTsByCollectionAddress)
    - [getNewListEvents](#getNewListEvents)
    - [getUnlistEvents](#getUnlistEvents)
    - [getPurchaseEvents](#getPurchaseEvents)
    - [getBidWinEvents](#getBidWinEvents)
    - [searchCollections](#searchCollections)
    - [getOwnershipHistory](#getOwnershipHistory)
    - [searchNFTOfCollectionByTraits](#searchNFTOfCollectionByTraits)
    - [getAddRewardHistory](#getAddRewardHistory)
    - [getClaimRewardHistory](#getClaimRewardHistory)
      
## Introduction
The purpose of this test plan is to ensure the correct functionality and reliability of the NFT marketplace API. The NFT marketplace API provides a set of endpoints that allow users to buy, sell, mint and trade NFTs. This test plan will cover the testing of all API endpoints, HTTP methods, parameters, and payloads.

The scope of testing will include the following:
> - Testing of all the endpoints, HTTP methods, parameters and payloads that are part of the NFT marketplace API.
> - Verification of the data that is sent and received through the API.
> - Testing of the input validation and error handling of the API.
> - Testing of the API's security features, including authentication and authorization.

By testing the API, we aim to ensure that the functionality of the NFT marketplace is correctly implemented and meets the requirements of the users. This testing plan will provide an accurate measure of the system's performance, as well as identify any issues, defects, and vulnerabilities in the system.

---
## Test cases

General Pre-requisites: 
- API availability 
- Software: Postman
- Content type: x-www-form-urlencoded
- Data: According to each test case below 

Ex: 
![image](https://user-images.githubusercontent.com/102939807/221842186-583d40f9-61c2-4b4a-b9a4-4ad47577b431.png)

### updateCollection

+ Test case ID: updateCollection_001 
+ Test case Name:  Update Collection 
+ Test case Description: Test the Update Collection to modify an existing NFT collection
+ Pre-requisites: The database should have an existing NFT collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`. If result isn't found, pls create new NFT collection from FE
  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateCollection` with data :
      ```json
          {
            "collection_address":"<nftContractAddress>"
          }
      ```
        
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and data is updated in the database.
---

### updateProject

+ Test case ID: API_Test_001
+ Test case Name:  Update Project
+ Test case Description: Test the Update Project to modify an existing Project
+ Pre-requisites: The database should have an existing Project. Use command in mongo get project in DB `db.projects.find({},{"nftContractAddress":1, _id:0})`. If result isn't found, pls create new Project from FE
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateProject` with data :
      ```json
          {
            "project_address":"<nftContractAddress>"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and data is updated in the database.
---
### newMintingEvent

+ Test case ID: API_Test_002
+ Test case Name:  New Minting Event 
+ Test case Description: Test the New Minting Event to add new minting event 
+ Pre-requisites: The database should have an existing Project. Use command in mongo get project in DB `db.projects.find({},{"nftContractAddress":1, _id:0})`. If result isn't found, pls create new Project from FE
+ Test Steps:  
  1. Send a POST request to the API endpoint `/newMintingEvent` with data :
      ```json
          {
            "project": "<nftContractAddress>",
            "minter": "<azero_any_address>",
            "phase_id": "1",
            "mint_amount": "1",
            "price": "1.5",
            "project_mint_fee": "0.5"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and data is updated in the database.
---
### updateNFT

+ Test case ID: API_Test_003
+ Test case Name:  Update NFT 
+ Test case Description: Test the Update NFT to modify an existing NFT
+ Pre-requisites: The database should have an existing NFT. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`. If result isn't found, pls create new NFT from FE
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateNFT` with data :
      ```json
          {
            "collection_address":"<nftContractAddress>",
            "token_id":"1"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and data is updated in the database.
---
### updateBids

+ Test case ID: API_Test_004
+ Test case Name:  Update Bids 
+ Test case Description: Test the Update Bids to update the highest bid and bidder information.
+ Pre-requisites: The database should have an existing NFT collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`. If result isn't found, pls create new NFT collection from FE
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateBids` with data :
      ```json
          {
            "collection_address":"<nftContractAddress>",
            "seller":"<azero_any_address>",
            "token_id":"65"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK". 
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and data  should be updated in the database.
---
### getTotalVolume

+ Test case ID: API_Test_005
+ Test case Name:  Get Total Volume
+ Test case Description: Test the getTotalVolume API to retrieve the total volume of project mint fees for all NFTs.
+ Pre-requisites: The database should have database with transaction history of NFTs.
+ Test Steps:
  1. Send a GET request to the API endpoint `/getTotalVolume`
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected total volume of project mint fees.
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the details of the Total Volume

---


### getBidsByBidderAddress

+ Test case ID: API_Test_006  
+ Test case Name:  Get Bids By Bidder Address  
+ Test case Description: Test the getBidsByBidderAddress API to retrieve the Bids of Bidder Address  
+ Pre-requisites: The database should have transaction history of Bidder Address.  Use command in mongo get Bid address in DB `db.bids.find({},{"bidder":1, _id:0})`. If result isn't found, pls create new Bid from FE
+ Test Steps:  
  1. Send a POST request to the API endpoint `/getBidsByBidderAddress` with data :
      ```json
          {
            "bidder": "<address_bidder>",
            "limit": "10000",
            "offset": "0",
            "sort": "-1"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the "ret" field in the response body contains the expected Bids By Bidder Address
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the details of the Bids By Bidder Address

---
### getJSON

+ Test case ID: API_Test_007
+ Test case Name:  Get JSON
+ Test case Description: Test the get JSON API to retrieve json file
+ Pre-requisites: The database should have json address.  Use command in mongo get Bid address in DB `db.jsons.find({},{"input":1, _id:0})`. If result isn't found, Please Cache data for PMP NFT [Here](https://github.com/ArtZero-io/Contracts/blob/feature/ink-4-version/contract_deployment_and_update_addresses_abis.md#cache-data-for-pmp-nft)
 
+ Test Steps:
  1. Send a GET request to the API endpoint `/getJSON?input=<json_address>`
  2. Verify the HTTP status code is 200 and the response body contains a json file
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a json file

---
### getImage

+ Test case ID: API_Test_008
+ Test case Name:  Get Image
+ Test case Description: Test the get image API to retrieve the image's url
+ Pre-requisites: The database should have image hash.  Use command in mongo get Bid address in DB `db.images.find({},{"input":1, _id:0})`. If result isn't found, pls create new NFT from FE
+ Test Steps:
  1. Send a GET request to the API endpoint `/getImage?input=<image_address>`
  2. Verify the HTTP status code is 200 and the response body contains a image's url
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a  image's url

---
### getCollectionContract

+ Test case ID: API_Test_009
+ Test case Name:  Get Collection Contract
+ Test case Description: Test the get Collection Contract to retrieve contract address
+ Pre-requisites: 
+ Test Steps:
  1. Send a GET request to the API endpoint `/getCollectionContract`
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected contract address
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the details of the contract address

---
### getCollectionCount

+ Test case ID: API_Test_010
+ Test case Name:  Get Collection Count
+ Test case Description: Test the get Collection Count to retrieve collection count
+ Pre-requisites: 
+ Test Steps:
  1. Send a GET request to the API endpoint `/getCollectionCount"`
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected collection count
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the details of the Collection Count
---
### getFeaturedCollections

+ Test case ID: API_Test_011
+ Test case Name:  Get Featured Collection 
+ Test case Description: Test the get Featured Collections  to retrieve list Featured Collection
+ Pre-requisites: 
+ Test Steps:
  1. Send a GET request to the API endpoint `/getFeaturedCollections`
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the list Featured Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list Featured Collection
---
### getCollections

+ Test case ID: API_Test_012
+ Test case Name:  GetCollection 
+ Test case Description: Test the get Collections  to retrieve list Collections
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollections` 
      ```json
        {
          "limit" : "10"
        }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list Collections
  4. Verify the response time is within acceptable limits.  
+ Expectations: The API should return a JSON object with status "OK" and list list Collections
---
### getProjects

+ Test case ID: API_Test_013
+ Test case Name:  Get Projects
+ Test case Description: Test the get Projects to retrieve list Projects
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getProjects`
      ```json
        {
          "limit" : "10"
        }
      ```  
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list Projects
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list Projects

---
### getCollectionsByVolume
+ Test case ID: API_Test_013
+ Test case Name:  Get Collections By Volume
+ Test case Description: Test the get Collections to retrieve list Collections
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollectionsByVolume`
      ```json
        {
          "limit" : "10"
        }
      ```  
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list Projects
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list Projects
---
### getCollectionByID
+ Test case ID: API_Test_014
+ Test case Name:  Get Collection By ID
+ Test case Description: Test the get Collection to retrieve the Collection
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollectionByID`
      ```json
        {
          "id" : "2"
        }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Collection
---
### getCollectionsByOwner
+ Test case ID: API_Test_015
+ Test case Name:  Get Collection By Owner
+ Test case Description: Test the get Collection to retrieve list Collection
+ Pre-requisites: The database should have collections. Use command in mongo get owner address in DB `db.collections.find({},{"collectionOwner":1, _id:0})`. If result isn't found, pls create new collection
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollectionsByOwner`
      ```json
        {
          "owner" : "<collectionOwner>",
          "limit" : "6",
          "sort" : "-1"
        }
      ```  
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list Collections
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list Collections
---
### countCollectionsByOwner
+ Test case ID: API_Test_016
+ Test case Name:  Count Collection By Owner
+ Test case Description: Test the Count Collection By Owner to retrieve number of Collection
+ Pre-requisites: The database should have collections. Use command in mongo get owner address in DB `db.collections.find({},{"collectionOwner":1, _id:0})`. If result isn't found, pls create new collection
+ Test Steps:
  1. Send a POST request to the API endpoint `/countCollectionsByOwner`
      ```json
        {
          "owner" : "<collectionOwner>",
          "noNFT" : "true"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected get the number of Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and number of Collection
---
### getCollectionByAddress
+ Test case ID:  API_Test_017
+ Test case Name:  Get Collection By Address
+ Test case Description: Test the Get Collection By Address to retrieve a collection by address:
+ Pre-requisites: The database should have an existing collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`. If a result is not found, please create new collection from FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollectionByAddress`
      ```json
        {
          "collection_address" : "<nftContractAddress>"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and collection

---
### getFloorPrice

+ Test case ID:  API_Test_018
+ Test case Name:  Get Floor Price
+ Test case Description: Test the Get Floor Price to retrieve the minimum sale price of a specific NFT collection: 
+ Pre-requisites: The database should have an existing collection. Use the command in Mongo to get the NFT collection in the database: `db.collections.find({},{"nftContractAddress":1, _id:0})`.  If a result is not found, please create a new collection from the FE and then activate it in `<homepage>/#/admin`. Next, navigate to `<homepage>/#/account/nfts` sell an NFT in this collection.
+ Test Steps:
  1. Send a POST request to the API endpoint `/getFloorPrice`
      ```json
        {
          "collection_address" : "<nftContractAddress>"
        }
      ```   
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected minimum sale price of a specific NFT collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the minimum sale price of a specific NFT collection
---
### getNFTs

+ Test case ID: API_Test_019
+ Test case Name:  Get NFTs
+ Test case Description: Test the get NFTs to retrieve by NFTs Collection Address  
+ Pre-requisites: The database should have an existing collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`. If a result isn't found, please create new Collection from FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTs`
      ```json
        {
          "collection_address" : "<nftContractAddress>"
        }
      ```   
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT by Collection Address
---
### getListedNFTs

+ Test case ID: API_Test_020
+ Test case Name:  Get Listed NFTs
+ Test case Description: Test the Get Listed NFTs to retrieve Listed NFT
+ Pre-requisites: The database should have an existing listed NFTs. Use the command in Mongo to get the NFT collection in the database: `db.nfts.find({is_for_sale: true}, {nftContractAddress: 1})`.  If a result is not found, please create a new collection from the FE and then activate it in `<homepage>/#/admin`. Next, navigate to `<homepage>/#/account/nfts` sell an NFT in this collection.
+ Test Steps:
  1. Send a POST request to the API endpoint `/getListedNFTs`
      ```json
        {
          "collection_address" : "<nftContractAddress>"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Listed NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Listed NFT
---
### getUnlistedNFTs

+ Test case ID: API_Test_021
+ Test case Name:  Get Unlisted NFTs
+ Test case Description: Test the Get Unlisted NFTs to retrieve unlisted NFT
+ Pre-requisites: The database should have an existing unlisted NFTs. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`.If a result is not found, please create a new NFT from the FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getUnlistedNFTs`
      ```json
        {
          "collection_address" : "<nftContractAddress>"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected unlisted NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and unlisted NFT
---
### getNFTByID
+ Test case ID: API_Test_022
+ Test case Name:  Get NFT By ID
+ Test case Description: Test the Get NFT By ID to retrieve an NFT
+ Pre-requisites: The database should have an existing collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"nftContractAddress":1, _id:0})`.If a result is not found, please create a new NFT from the FE
+ Test Steps:
   1. Send a POST request to the API endpoint `/getNFTByID`
      ```json
        {
          "collection_address" : "<nftContractAddress>",
          "token_id":"1"
        }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" an NFT
---
### getNFTsByOwner

+ Test case ID: API_Test_023
+ Test case Name:  Get NFTs By Owner
+ Test case Description: Test the Get NFTs By Owner to retrieve list NFT
+ Pre-requisites: The database should have an existing collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"collectionOwner":1, _id:0})`.If a result is not found, please create a new NFT from the FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTsByOwner`
      ```json
          {
            "owner": "<collectionOwner>"
          }
      ```  
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT

---
### getNFTsByOwnerAndCollection

+ Test case ID: API_Test_024
+ Test case Name:  Get NFTs By Owner And Collection
+ Test case Description: Test the Get NFTs By Owner And Collection to retrieve list NFT
+ Pre-requisites: The database should have an existing NFT. Use command in mongo get NFTs in DB `db.nfts.find({},{"nftContractAddress":1, "owner":1})`. If result isn't found, pls create new NFTs from FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTsByOwnerAndCollection`
      ```json
          {
            "collection_address":"<nftContractAddress>",
            "owner": "<owner>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT

---
### getNFTsByCollectionAddress

+ Test case ID: API_Test_025
+ Test case Name:  Get NFTs By Collection
+ Test case Description: Test the Get NFTs By Collection to retrieve list NFT of Collection
+ Pre-requisites: The database should have an existing NFT. Use command in mongo get NFTs in DB `db.nfts.find({},{"nftContractAddress":1, _id:0})`. If result isn't found, pls create new NFTs from FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTsByCollectionAddress`
        ```json
          {
            "collection_address":"<nftContractAddress>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT of Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT of Collection
---
### getNewListEvents
+ Test case ID: API_Test_026
+ Test case Name:  Get New List Events
+ Test case Description: Test the Get New List Events to retrieve new listed 
+ Pre-requisites: The database should have an existing new list event. Use the command in Mongo to get the NFT collection in the database: `db.newlistevents.find({},{"nftContractAddress":1, _id:0})`.  If a result is not found, please create a new collection from the FE and then activate it in `<homepage>/#/admin`. Next, navigate to `<homepage>/#/account/nfts` sell an NFT in this collection.
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNewListEvents`
      ```json
          {
            "collection_address":"<nftContractAddress>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected new listed 
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and new listed 
---
### getUnlistEvents
+ Test case ID: API_Test_027
+ Test case Name:  Get Unlist Events
+ Test case Description: Test the Get Unlist Events to retrieve unlisted NFT
+ Pre-requisites: The database should have an existing listed NFTs. Use the command in Mongo to get the NFT collection in the database: `db.nfts.find({is_for_sale: true}, {nftContractAddress: 1})`.  If a result is not found, please create a new collection from the FE and then activate it in `<homepage>/#/admin`. Next, navigate to `<homepage>/#/account/nfts` sell an NFT in this collection. Finally, cancel the sale of this NFT.
+ Test Steps:
  1. Send a POST request to the API endpoint `/getUnlistEvents`
      ```json
          {
            "collection_address":"<nftContractAddress>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected unlisted NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and unlisted NFT
---
### getPurchaseEvents
+ Test case ID: API_Test_028
+ Test case Name:  Get Purchase Events
+ Test case Description: Test the Get Purchase Events to retrieve Purchase Events
+ Pre-requisites: The database should have an purchase Events. Use the command in Mongo to get the NFT collection in the database: `db.purchaseevents.find({},{"nftContractAddress":1, _id:0})`.  If a result is not found, please buy a NFT on marketplace
+ Test Steps:
  1. Send a POST request to the API endpoint `/getPurchaseEvents`
      ```json
          {
            "collection_address":"<nftContractAddress>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Purchase Events
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Purchase Events
---
### getBidWinEvents

+ Test case ID: API_Test_029
+ Test case Name:  Get Bid Win Events
+ Test case Description: Test the Get Bid Win Events to retrieve Bid Win Events
+ Pre-requisites: The database should have an Bid Win Events. Use the command in Mongo to get the Bid Win Events in the database: `db.bidwinevents.find({},{"nftContractAddress":1, _id:0})`. If a result is not found, please  Accept an offer of an NFT with 1 or more bid(s), [follow here](https://github.com/ArtZero-io/frontend-react/blob/ink4-upgrade/docs/frontend_test_plan.md#Accept-an-offer)

+ Test Steps:
  1. Send a POST request to the API endpoint `/getBidWinEvents`
      ```json
          {
            "collection_address":"<nftContractAddress>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Bid Win Events
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Bid Win Events
---
### searchCollections
+ Test case ID: API_Test_030
+ Test case Name:  Search Collections
+ Test case Description: Test the Search Collections to retrieve list Collection
+ Pre-requisites: The database should have an existing NFT collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"name":1, _id:0})`. If result isn't found, pls create new NFT collection from FE
+ Test Steps:
  1. Send a POT request to the API endpoint `/searchCollections`
      ```json
          {
            "keywords":"<name>"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list Collection
---
### getOwnershipHistory
+ Test case ID: API_Test_031
+ Test case Name:  Get Owner ship History
+ Test case Description: Test the Get Owner History of NFT ??
+ Pre-requisites: The database should have an existing NFT. Use command in mongo get NFTs in DB `db.nfts.find({},{"nftContractAddress":1, "owner":1})`. If result isn't found, pls create new NFTs from FE
+ Test Steps:
  1. Send a POST request to the API endpoint `/getOwnershipHistory`
  ```json
      {
        "owner": "<owner>",
        "collection_address":"<nftContractAddress>",
        "token_id":"1"
      }
  ```
  1. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  2. Verify the "ret" field in the response body contains the expected ?
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ?
---
### searchNFTOfCollectionByTraits
+ Test case ID: API_Test_032
+ Test case Name: Search NFT Of Collection By Traits
+ Test case Description: Test the Search NFT Of Collection By Traits retrieve list NFT
+ Pre-requisites: The database should have an existing NFT collection. Use command in mongo get NFT collection in DB `db.collections.find({},{"name":1, _id:0})`. If result isn't found, pls create new NFT collection from FE
+ Test Steps:
  1. Send a POT request to the API endpoint `/searchNFTOfCollectionByTraits`
  ```json
      {
        "traitFilters": "{}",
        "collectionAddress":"<nftContractAddress>",
        "limit":"12",
        "offset":"0",
        "sort":"-1"
      }
  ```
  1. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  2. Verify the "ret" field in the response body contains the expected list NFT
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT

---
### getAddRewardHistory
+ Test case ID: API_Test_033
+ Test case Name: Search Get Add Reward History
+ Test case Description: Test Search Get Add Reward History retrieve ??
+ Pre-requisites: 
+ Test Steps:
  1. Send a POT request to the API endpoint `/getAddRewardHistory`
  ```json
      {
        "limit":"1000",
        "offset":"0",
        "sort":"-1"
      }
  ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
### getClaimRewardHistory
+ Test case ID: API_Test_034
+ Test case Name: Get Claim Reward History
+ Test case Description: Test the Get Claim Reward History retrieve ??
+ Pre-requisites: The database should have a staked NFT. Use command in mongo get staked NFT in DB `db.claimrewardevents.find({},{"name":1, _id:0})`. If result isn't found, pls stake NFT 
+ Test Steps:
  1. Send a POT request to the API endpoint `/getClaimRewardHistory`
  ```json
      {
        "limit":"1000",
        "offset":"0",
        "sort":"-1",
        "staker_address":"<owner>"
      }
  ```
  1. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  2. Verify the "ret" field in the response body contains the expected ??
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
