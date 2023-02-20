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

### updateCollection

+ Test case ID: updateCollection_001   ??
+ Test case Name:  Update Collection 
+ Test case Description: Test the Update Collection to ??
+ Pre-requisites: The database should have minting events and project mint fees.  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateCollection` with data :
      ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the "ret" field in the response body contains the expected  ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---

### updateProject

+ Test case ID: updateProject_001   ??
+ Test case Name:  Update Project
+ Test case Description: Test the Update Project 
+ Pre-requisites: The database should have minting events and project mint fees.  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateProject` with data :
      ```json
          {
            "project_address":"5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the "ret" field in the response body contains the expected  ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
### newMintingEvent

+ Test case ID: newMintingEvent_001 ??
+ Test case Name:  New Minting Event 
+ Test case Description: Test the New Minting Event  API to retrieve ??
+ Pre-requisites: The database should have minting events and project mint fees.  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/newMintingEvent` with data :
      ```json
          {
            "project": "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC",
            "minter": "5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9",
            "phase_id": "1",
            "mint_amount": "1",
            "price": "1.5",
            "project_mint_fee": "0.5"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the "ret" field in the response body contains the expected  ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
### updateNFT

+ Test case ID: updateNFT_001   ??
+ Test case Name:  Update NFT 
+ Test case Description: Test the Update NFT to ??
+ Pre-requisites: The database should have minting events and project mint fees.  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateBids` with data :
      ```json
          {
            "collection_address":"5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC",
            "token_id":"65"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the "ret" field in the response body contains the expected  ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
### updateBids

+ Test case ID: updateBids_001   ??
+ Test case Name:  Update Bids 
+ Test case Description: Test the Update Bids to ??
+ Pre-requisites: The database should have minting events and project mint fees.  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/updateBids` with data :
      ```json
          {
            "collection_address":"5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC",
            "seller":"5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
            "token_id":"65"
          }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".        
  3. Verify the "ret" field in the response body contains the expected  ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
### getTotalVolume

+ Test case ID: getTotalVolume_001
+ Test case Name:  Get Total Volume
+ Test case Description: Test the getTotalVolume API to retrieve the total volume of project mint fees for all NFTs.
+ Pre-requisites: The database should have minting events and project mint fees.
+ Test Steps:
  1. Send a GET request to the API endpoint `/getTotalVolume`
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected total volume of project mint fees.
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the details of the Total Volume

---


### getBidsByBidderAddress

+ Test case ID: getBidsByBidderAddress_001  
+ Test case Name:  Get Bids By Bidder Address  
+ Test case Description: Test the getBidsByBidderAddress API to retrieve the Bids By Bidder Address  
+ Pre-requisites: The database should have minting events and project mint fees.  
+ Test Steps:  
  1. Send a POST request to the API endpoint `/getBidsByBidderAddress` with data :
      ```json
          {
            "bidder": "5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9",
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

+ Test case ID: getJSON_001
+ Test case Name:  Get JSON
+ Test case Description: Test the get JSON API to retrieve json file
+ Pre-requisites: 
+ Test Steps:
  1. Send a GET request to the API endpoint `/getJSON?input=/ipfs/QmSdgNQ2zvJvaw8kP8oCJnmuFQUxVDBYrThYvV1C8k5bXU/131.json`
  2. Verify the HTTP status code is 200 and the response body contains a json file
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a json file

---
### getImage

+ Test case ID: getImage_001
+ Test case Name:  Get Image
+ Test case Description: Test the get image API to retrieve the image's url
+ Pre-requisites: 
+ Test Steps:
  1. Send a GET request to the API endpoint `/getImage?input=QmYYEki2zTx4fc5BWW6eVcf8VurZAc9kAebkbhysbvbN2w`
  2. Verify the HTTP status code is 200 and the response body contains a image's url
  3. Verify the response time is within acceptable limits.
+ Expectations: The API should return a  image's url

---
### getCollectionContract

+ Test case ID: getCollectionContract_001
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

+ Test case ID: getCollectionCount_001
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

+ Test case ID: getFeaturedCollections_001
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

+ Test case ID: getCollections_001
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

+ Test case ID: getProjects_001
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
+ Test case ID: getCollectionsByVolume_001
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
+ Test case ID: getCollectionByID_001
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
+ Test case ID: getCollectionByOwner_001
+ Test case Name:  Get Collection By Owner
+ Test case Description: Test the get Collection to retrieve list Collection
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollectionsByOwner`
      ```json
        {
          "owner" : "5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9",
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
+ Test case ID: countCollectionByOwner_001
+ Test case Name:  Count Collection By Owner
+ Test case Description: Test the Count Collection By Owner to retrieve number of Collection
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/countCollectionsByOwner`
      ```json
        {
          "owner" : "5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9",
          "noNFT" : "true"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected get the number of Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and number of Collection
---
### getCollectionByAddress
+ Test case ID:  getCollectionByAddress_001
+ Test case Name:  Get Collection By Address
+ Test case Description: Test the Get Collection By Address to retrieve a collection by address:
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getCollectionByAddress`
      ```json
        {
          "collection_address" : "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and collection

---
### getFloorPrice

+ Test case ID:  getFloorPrice_001
+ Test case Name:  Get Floor Price
+ Test case Description: Test the Get Floor Price to retrieve the minimum sale price of a specific NFT collection: 
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getFloorPrice`
      ```json
        {
          "collection_address" : "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC"
        }
      ```   
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected minimum sale price of a specific NFT collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and the minimum sale price of a specific NFT collection
---
### getNFTs

+ Test case ID: getNFTs_001
+ Test case Name:  Get NFTs
+ Test case Description: Test the get NFTs to retrieve by NFTs Collection Address  
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTs`
      ```json
        {
          "collection_address" : "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC"
        }
      ```   
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT by Collection Address
---
### getListedNFTs

+ Test case ID: getListedNFTs_001
+ Test case Name:  Get Listed NFTs
+ Test case Description: Test the Get Listed NFTs to retrieve Listed NFT
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getListedNFTs`
      ```json
        {
          "collection_address" : "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Listed NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Listed NFT
---
### getUnlistedNFTs

+ Test case ID: getUnlistedNFTs_001
+ Test case Name:  Get Unlisted NFTs
+ Test case Description: Test the Get Unlisted NFTs to retrieve unlisted NFT
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getUnlistedNFTs`
      ```json
        {
          "collection_address" : "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC"
        }
      ``` 
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected unlisted NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and unlisted NFT
---
### getNFTByID
+ Test case ID: getNFTByID_001 => Fail
+ Test case Name:  Get NFT By ID
+ Test case Description: Test the Get NFT By ID to retrieve an NFT
+ Pre-requisites: 
+ Test Steps:
   1. Send a POST request to the API endpoint `/getNFTByID`
      ```json
        {
          "collection_address" : "5FkVyhF4KVMwgVTbRwvDgnJ7oe8tfZ9A7v2sEiqQPccHkUNC",
          "tokenID":"937"
        }
      ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" an NFT
---
### getNFTsByOwner

+ Test case ID: getNFTsByOwner_001
+ Test case Name:  Get NFTs By Owner
+ Test case Description: Test the Get NFTs By Owner to retrieve list NFT
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTsByOwner`
      ```json
          {
            "owner": "5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9"
          }
      ```  
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT

---
### getNFTsByOwnerAndCollection

+ Test case ID: getNFTsByOwnerAndCollection_001
+ Test case Name:  Get NFTs By Owner And Collection
+ Test case Description: Test the Get NFTs By Owner And Collection to retrieve list NFT
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTsByOwnerAndCollection`
      ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8",
            "owner": "5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT

---
### getNFTsByCollectionAddress

+ Test case ID: getNFTsByCollectionAddress_001
+ Test case Name:  Get NFTs By Collection
+ Test case Description: Test the Get NFTs By Collection to retrieve list NFT of Collection
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNFTsByCollectionAddress`
        ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT of Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT of Collection
---
### getNewListEvents
+ Test case ID: getNewListEvents_001
+ Test case Name:  Get New List Events
+ Test case Description: Test the Get New List Events to retrieve new listed 
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getNewListEvents`
      ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected new listed 
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and new listed 
---
### getUnlistEvents
+ Test case ID: getUnlistEvents_001
+ Test case Name:  Get Unlist Events
+ Test case Description: Test the Get Unlist Events to retrieve unlisted NFT
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getUnlistEvents`
      ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected unlisted NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and unlisted NFT
---
### getPurchaseEvents
+ Test case ID: getPurchaseEvents_001
+ Test case Name:  Get Purchase Events
+ Test case Description: Test the Get Purchase Events to retrieve Purchase Events
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getPurchaseEvents`
      ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Purchase Events
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Purchase Events
---
### getBidWinEvents

+ Test case ID: getBidWinEvents_001 => Fail?
+ Test case Name:  Get Bid Win Events
+ Test case Description: Test the Get Bid Win Events to retrieve Bid Win Events
+ Pre-requisites: 
+ Test Steps:
  1. Send a POST request to the API endpoint `/getBidWinEvents`
      ```json
          {
            "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected Bid Win Events
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and Bid Win Events
---
### searchCollections
+ Test case ID: searchCollections_001
+ Test case Name:  Search Collections
+ Test case Description: Test the Search Collections to retrieve list Collection
+ Pre-requisites: 
+ Test Steps:
  1. Send a POT request to the API endpoint `/searchCollections`
      ```json
          {
            "keywords":"punk"
          }
      ```    
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list Collection
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list Collection
---
### getOwnershipHistory
+ Test case ID: getOwnershipHistory_001
+ Test case Name:  Get Owner ship History
+ Test case Description: Test the Get Owner ship History to retrieve ??
+ Pre-requisites: 
+ Test Steps:
  1. Send a POT request to the API endpoint `/getOwnershipHistory`
  ```json
      {
        "owner": "undefined",
        "collection_address":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8",
        "token_id":"11"
      }
  ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected ?
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ?
---
### searchNFTOfCollectionByTraits
+ Test case ID: searchNFTOfCollectionByTraits_001
+ Test case Name: Search NFT Of Collection By Traits
+ Test case Description: Test the Search NFT Of Collection By Traits retrieve list NFT
+ Pre-requisites: 
+ Test Steps:
  1. Send a POT request to the API endpoint `/searchNFTOfCollectionByTraits`
  ```json
      {
        "traitFilters": "{}",
        "collectionAddress":"5DKUvAvm7QA36WLj7BD5bua92jN1XoyBrK2Prjbc6gFt2tW8",
        "limit":"12",
        "offset":"0",
        "sort":"-1"
      }
  ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected list NFT
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and list NFT

---
### getAddRewardHistory
+ Test case ID: getAddRewardHistory_001
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
+ Test case ID: getClaimRewardHistory_001
+ Test case Name: Get Claim Reward History
+ Test case Description: Test the Get Claim Reward History retrieve ??
+ Pre-requisites: 
+ Test Steps:
  1. Send a POT request to the API endpoint `/getClaimRewardHistory`
  ```json
      {
        "limit":"1000",
        "offset":"0",
        "sort":"-1",
        "staker_address":"5EWTsPpsQ35DnyovNSrgvsAEkSeVMyakg4cL27nw6Jikvjd9"
      }
  ```
  2. Verify the HTTP status code is 200 and the response body contains a "status" field with value "OK".
  3. Verify the "ret" field in the response body contains the expected ??
  4. Verify the response time is within acceptable limits.
+ Expectations: The API should return a JSON object with status "OK" and ??
---
> Add more Categories and + Test cases here
