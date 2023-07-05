import {SchemaObject} from "@loopback/rest";
import {Filter} from "@loopback/repository";
import {launchpadmintingevents} from "../models";

export type ResponseBody = {
    status: string,
    message: string,
    errorCode?: string,
    ret?: any,
    data?: object,
}


// UPDATE COLLECTION
export type ReqUpdateCollectionType = {
    collection_address: string
};
const ReqUpdateCollectionSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
    },
};
export const RequestUpdateCollectionBody = {
    description: 'The input of updateCollection function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqUpdateCollectionSchema},
    },
};


// UPDATE PROJECT
export type ReqUpdateProjectType = {
    project_address: string
};
const ReqUpdateProjectSchema: SchemaObject = {
    type: 'object',
    required: ['project_address'],
    properties: {
        project_address: {
            type: 'string',
        },
    },
};
export const RequestUpdateProjectBody = {
    description: 'The input of updateProject function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqUpdateProjectSchema},
    },
};

// MINTING EVENT
export type ReqNewMintingEventType = {
    project?: string,
    minter?: string,
    phase_id?: number,
    mint_amount?: number,
    price?: number,
    project_mint_fee?: number,
};
const ReqNewMintingEventSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        project: {
            type: 'string',
        },
        minter: {
            type: 'string',
        },
        phase_id: {
            type: 'number',
        },
        mint_amount: {
            type: 'number',
        },
        price: {
            type: 'number',
        },
        project_mint_fee: {
            type: 'number',
        },
    },
};
export const RequestNewMintingEventBody = {
    description: 'The input of newMintingEvent function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqNewMintingEventSchema},
    },
};

// GET TOTAL VOLUME
// getTotalVolume

// UPDATE NFT
export type ReqUpdateNftType = {
    collection_address?: string,
    token_id?: number,
    azDomainName?: string,
};
const ReqUpdateNftSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        token_id: {
            type: 'number',
        },
    },
};
export const RequestUpdateNftBody = {
    description: 'The input of updateNFT function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqUpdateNftSchema},
    },
};

// UPDATE BIDS
export type ReqUpdateBidsType = {
    collection_address?: string,
    seller?: string,
    token_id?: number,
    azDomainName?: string,
};
const ReqUpdateBidsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        seller: {
            type: 'string',
        },
        token_id: {
            type: 'number',
        },
    },
};
export const RequestUpdateBidsBody = {
    description: 'The input of updateBids function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqUpdateBidsSchema},
    },
};

// GET BIDS BY BIDDER ADDRESS
export type ReqGetBidsByBidderAddressType = {
    bidder?: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetBidsByBidderAddressSchema: SchemaObject = {
    type: 'object',
    required: ['bidder'],
    properties: {
        bidder: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetBidsByBidderAddressBody = {
    description: 'The input of getBidsByBidderAddress function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetBidsByBidderAddressSchema},
    },
};

// CACHE IMAGE
export type ReqCacheImageType = {
    input?: string,
    is1024?: boolean,
    is1440?: boolean,
    is1920?: boolean,
    metadata?: string,
    imageType?: string,
};
const ReqCacheImageSchema: SchemaObject = {
    type: 'object',
    required: ['input'],
    properties: {
        input: {
            type: 'string',
        },
        is1024: {
            type: 'boolean',
        },
        is1440: {
            type: 'boolean',
        },
        is1920: {
            type: 'boolean',
        },
        metadata: {
            type: 'string',
        },
        imageType: {
            type: 'string',
        },
    },
};
export const RequestCacheImageBody = {
    description: 'The input of cacheImage function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqCacheImageSchema},
    },
};

// CACHE IMAGES
export type ReqCacheImagesMetadata = {
    walletAddress?: string,
    collectionAddress?: string,
    tokenId?: number,
    type?: string,
};
export type ReqCacheImages = {
    input?: string,
    is1024?: boolean,
    is1440?: boolean,
    is1920?: boolean,
    metadata?: ReqCacheImagesMetadata,
    imageType?: string,
};
export type ReqCacheImagesType = {
    images: string,
};
const ReqCacheImagesSchema: SchemaObject = {
    type: 'object',
    required: ['images'],
    properties: {
        images: {
            type: 'string',
        }
    },
};
export const RequestCacheImagesBody = {
    description: 'The input of cacheImages function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqCacheImagesSchema},
    },
};

// CACHE JSON
export type ReqCacheJSONType = {
    input: string,
};
const ReqCacheJSONSchema: SchemaObject = {
    type: 'object',
    required: ['input'],
    properties: {
        input: {
            type: 'string',
        }
    },
};
export const RequestCacheJSONBody = {
    description: 'The input of cacheJSON function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqCacheJSONSchema},
    },
};

// GET JSON
export type ReqGetJSONType = {
    input: string,
};
const ReqGetJSONSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        input: {
            type: 'string',
        }
    },
};
export const RequestGetJSONBody = {
    description: 'The input of getJSON function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetJSONSchema},
        'application/json': {schema: ReqGetJSONSchema},
    },
};

// GET IMAGE
export type ReqGetImageType = {
    input: string,
    url: string,
    size: number,
};
// export const SpecReqGetImage = {
//     parameters: [
//         {
//             name: 'input',
//             schema: {
//                 type: 'string'
//             },
//             in: 'query'
//         },
//         {
//             name: 'url',
//             schema: {
//                 type: 'string'
//             },
//             in: 'query'
//         },
//         {
//             name: 'size',
//             schema: {
//                 type: 'number'
//             },
//             in: 'query'
//         },
//     ],
//     responses: {
//         '200': {
//             description: 'The input of getImage function',
//             content: {
//                 'application/json': {
//                     schema: {type: 'string'},
//                 },
//             },
//         },
//     },
// };
const ReqGetImageSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        input: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
        size: {
            type: 'number',
        },
    },
};
export const RequestGetImageBody = {
    description: 'The input of getImage function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetImageSchema},
    },
};

// GET COLLECTION CONTRACT
export type ReqGetCollectionContractType = {
    input: string,
};
const ReqGetCollectionContractSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        input: {
            type: 'string',
        },
    },
};
export const RequestGetCollectionContractBody = {
    description: 'The input of getCollectionContract function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetCollectionContractSchema},
    },
};

// getCollectionCount

// GET COLLECTIONS
export type ReqGetCollectionsType = {
    limit?: number,
    offset?: number,
    sort?: number,
    isActive?: boolean,
    ignoreNoNFT?: boolean,
};
const ReqGetCollectionsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        isActive: {
            type: 'boolean',
        },
        ignoreNoNFT: {
            type: 'boolean',
        },
    },
};
export const RequestGetCollectionsBody = {
    description: 'The input of getCollections function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetCollectionsSchema},
    },
};

// GET ALL COLLECTIONS
export type ReqGetAllCollectionsType = {
    limit?: number,
    offset?: number,
    sort?: number,
    isActive?: boolean,
    ignoreNoNFT?: boolean,
};
const ReqGetAllCollectionsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        isActive: {
            type: 'boolean',
        },
        ignoreNoNFT: {
            type: 'boolean',
        },
    },
};
export const RequestGetAllCollectionsBody = {
    description: 'The input of getAllCollections function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetAllCollectionsSchema},
    },
};

// UPDATE COLLECTION'S EMAIL
export type ReqUpdateCollectionEmailType = {
    collection_address?: string,
    email?: string,
};
const ReqUpdateCollectionEmailSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address', 'email'],
    properties: {
        collection_address: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
    },
};
export const RequestUpdateCollectionEmailBody = {
    description: 'The input of updateCollectionEmail function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqUpdateCollectionEmailSchema},
    },
};

// GET PROJECTS
export type ReqGetProjectsType = {
    limit?: number,
    offset?: number,
    sort?: number,
    isActive?: boolean
};
const ReqGetProjectsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        isActive: {
            type: 'boolean',
        },
    },
};
export const RequestGetProjectsBody = {
    description: 'The input of getProjects function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetProjectsSchema},
    },
};

// GET COLLECTIONS BY VOLUME
export type ReqGetCollectionsByVolumeType = {
    limit?: number,
    offset?: number,
    sort?: number,
    isActive?: boolean,
    ignoreNoNFT?: boolean,
};
const ReqGetCollectionsByVolumeSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        isActive: {
            type: 'boolean',
        },
        ignoreNoNFT: {
            type: 'boolean',
        },
    },
};
export const RequestGetCollectionsByVolumeBody = {
    description: 'The input of getCollectionsByVolume function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetCollectionsByVolumeSchema},
    },
};

// GET COLLECTIONS BY ID
export type ReqGetCollectionByIDType = {
    id: number,
};
const ReqGetCollectionByIDSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        id: {
            type: 'number',
        },
    },
};
export const RequestGetCollectionByIDBody = {
    description: 'The input of getCollectionByID function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetCollectionByIDSchema},
    },
};


// GET COLLECTIONS BY OWNER
export type ReqGetCollectionsByOwnerType = {
    owner: string,
    limit?: number,
    sort?: number,
    offset?: number,
};
const ReqGetCollectionsByOwnerSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        owner: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
    },
};
export const RequestGetCollectionsByOwnerBody = {
    description: 'The input of getCollectionsByOwner function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetCollectionsByOwnerSchema},
    },
};

// COUNT COLLECTIONS BY OWNER
export type ReqCountCollectionsByOwnerType = {
    owner: string,
    noNFT?: boolean,
};
const ReqCountCollectionsByOwnerSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        owner: {
            type: 'string',
        },
        noNFT: {
            type: 'boolean',
        },
    },
};
export const RequestCountCollectionsByOwnerBody = {
    description: 'The input of countCollectionsByOwner function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqCountCollectionsByOwnerSchema},
    },
};

// GET COLLECTIONS BY ADDRESS
export type ReqGetCollectionByAddressType = {
    collection_address: string,
};
const ReqGetCollectionByAddressSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
    },
};
export const RequestGetCollectionByAddressBody = {
    description: 'The input of getCollectionByAddress function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetCollectionByAddressSchema},
    },
};

// GET FLOOR PRICE
export type ReqGetFloorPriceType = {
    collection_address: string,
};
const ReqGetFloorPriceSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
    },
};
export const RequestGetFloorPriceBody = {
    description: 'The input of getFloorPrice function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetFloorPriceSchema},
    },
};

// GET NFTs
export type ReqGetNFTsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetNFTsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetNFTsBody = {
    description: 'The input of getNFTs function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNFTsSchema},
    },
};

// GET LIST NFTs
export type ReqGetListedNFTsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetListedNFTsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetListedNFTsBody = {
    description: 'The input of getListedNFTs function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetListedNFTsSchema},
    },
};

// GET UNLISTED NFTs
export type ReqGetUnlistedNFTsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetUnlistedNFTsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetUnlistedNFTsBody = {
    description: 'The input of getUnlistedNFTs function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetUnlistedNFTsSchema},
    },
};

// GET NFTs BY ID
export type ReqGetNFTByIDType = {
    collection_address: string,
    token_id?: number,
    azDomainName?: string,
};
const ReqGetNFTByIDSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        token_id: {
            type: 'number',
        },
        azDomainName: {
            type: 'string',
        },
    },
};
export const RequestGetNFTByIDBody = {
    description: 'The input of getNFTByID function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNFTByIDSchema},
    },
};

// GET NFTs BY OWNER
export type ReqGetNFTsByOwnerType = {
    owner: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetNFTsByOwnerSchema: SchemaObject = {
    type: 'object',
    required: ['owner'],
    properties: {
        owner: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetNFTsByOwnerBody = {
    description: 'The input of getNFTsByOwner function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNFTsByOwnerSchema},
    },
};

// GET NFTs BY OWNER AND COLLECTION
export type ReqGetNFTsByOwnerAndCollectionType = {
    owner: string,
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetNFTsByOwnerAndCollectionSchema: SchemaObject = {
    type: 'object',
    required: ['owner', 'collection_address'],
    properties: {
        owner: {
            type: 'string',
        },
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetNFTsByOwnerAndCollectionBody = {
    description: 'The input of getNFTsByOwnerAndCollection function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNFTsByOwnerAndCollectionSchema},
    },
};

// GET NFTs BY ATTRIBUTE VALUE
export type ReqGetNFTsByAttributeValueType = {
    collection_address: string,
    expiration_timestamp: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetNFTsByAttributeValueSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address', 'expiration_timestamp'],
    properties: {
        collection_address: {
            type: 'string',
        },
        expiration_timestamp: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetNFTsByAttributeValueBody = {
    description: 'The input of getNFTsByAttributeValue function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNFTsByAttributeValueSchema},
    },
};

// GET NFTs BY COLLECTION ADDRESS
export type ReqGetNFTsByCollectionAddressType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetNFTsByCollectionAddressSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetNFTsByCollectionAddressBody = {
    description: 'The input of getNFTsByCollectionAddress function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNFTsByCollectionAddressSchema},
    },
};

// GET NEW LIST EVENTS
export type ReqGetNewListEventsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetNewListEventsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetNewListEventsBody = {
    description: 'The input of getNewListEvents function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetNewListEventsSchema},
    },
};

// GET UNLISTED EVENTS
export type ReqGetUnlistEventsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetUnlistEventsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetUnlistEventsBody = {
    description: 'The input of getUnlistEvents function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetUnlistEventsSchema},
    },
};

// GET PURCHASE EVENTS
export type ReqGetPurchaseEventsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetPurchaseEventsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetPurchaseEventsBody = {
    description: 'The input of getPurchaseEvents function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetPurchaseEventsSchema},
    },
};

// GET BID WIN EVENTS
export type ReqGetBidWinEventsType = {
    collection_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetBidWinEventsSchema: SchemaObject = {
    type: 'object',
    required: ['collection_address'],
    properties: {
        collection_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetBidWinEventsBody = {
    description: 'The input of getBidWinEvents function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetBidWinEventsSchema},
    },
};

// SEARCH COLLECTIONS
export type ReqSearchCollectionsType = {
    keywords: string,
    isActive: boolean,
    ignoreNoNFT: boolean,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqSearchCollectionsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        keywords: {
            type: 'string',
        },
        isActive: {
            type: 'boolean',
        },
        ignoreNoNFT: {
            type: 'boolean',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestSearchCollectionsBody = {
    description: 'The input of searchCollections function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqSearchCollectionsSchema},
    },
};

// GET OWNERSHIP HISTORY
export type ReqGetOwnershipHistoryType = {
    collection_address: string,
    token_id?: number,
    azDomainName?: string,
    owner: string,
};
const ReqGetOwnershipHistorySchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        collection_address: {
            type: 'string',
        },
        token_id: {
            type: 'number',
        },
        owner: {
            type: 'string',
        },
    },
};
export const RequestGetOwnershipHistoryBody = {
    description: 'The input of getOwnershipHistory function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetOwnershipHistorySchema},
    },
};

// SEARCH NFT OF COLLECTION BY TRAITS
/**
 * params = {
 *   $and: [
 *     { $or: [{ "traits.Skin": "Red Dalmatians" }] },
 *     { $or: [{ "traits.Background": "Dark Green" }] },
 *   ],
 *   is_for_sale: true,
 *   price: { lt: 22000000000000, gt: 1000000000000 },
 *   keyword: "25",
 * };
 */
export type TraitFilters = {
    and?: object,
    is_for_sale?: boolean,
    price?: object,
    keyword?: string,
    expirationTimestamp?: string,
};
export type ReqSearchNFTOfCollectionByTraitsType = {
    collectionAddress: string,
    traitFilters?: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqSearchNFTOfCollectionByTraitsSchema: SchemaObject = {
    type: 'object',
    required: ['collectionAddress'],
    properties: {
        collectionAddress: {
            type: 'string',
        },
        traitFilters: {
            type: 'string'
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestSearchNFTOfCollectionByTraitsBody = {
    description: 'The input of searchNFTOfCollectionByTraits function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqSearchNFTOfCollectionByTraitsSchema},
    },
};

// GET LAUNCHPAD MINTING EVENT
export type ReqGetLaunchpadMintingEventType = {
    nftContractAddress: string,
    keyword?: string,
    limit?: number,
    offset?: number,
    sort?: number,
    filter?: Filter<launchpadmintingevents>
};
const ReqGetLaunchpadMintingEventSchema: SchemaObject = {
    type: 'object',
    required: ['nftContractAddress'],
    properties: {
        nftContractAddress: {
            type: 'string',
        },
        traitFilters: {
            type: 'string'
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetLaunchpadMintingEventBody = {
    description: 'The input of getLaunchpadMintingEvent function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetLaunchpadMintingEventSchema},
    },
};

// GET ADD REWARD HISTORY
export type ReqGetAddRewardHistoryType = {
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetAddRewardHistorySchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetAddRewardHistoryBody = {
    description: 'The input of getAddRewardHistory function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetAddRewardHistorySchema},
    },
};

// GET CLAIMED REWARD HISTORY
export type ReqGetClaimRewardHistoryType = {
    staker_address: string,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetClaimRewardHistorySchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        staker_address: {
            type: 'string',
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestGetClaimRewardHistoryBody = {
    description: 'The input of getClaimRewardHistory function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetClaimRewardHistorySchema},
    },
};

// CHECK WHITELIST
export type ReqGetPhaseInfoType = {
    nftContractAddress: string,
    phaseId: number,
};
const ReqGetPhaseInfoSchema: SchemaObject = {
    type: 'object',
    required: ['nftContractAddress','phaseId'],
    properties: {
        projectAddress: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
        phaseId: {
            type: 'number',
        }
    },
};
export const RequestGetPhaseInfoBody = {
    description: 'The input of checkWhiteList function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetPhaseInfoSchema},
    },
};

// REPORT NFT request
export type ReqReportNFTType = {
    collection_name: string,
    nft_name: string,
    message: string,
    address: string,
    signature: string,
    nft_link: string
};
const ReqReportNFTSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        collection_name: {
            type: 'string',
        },
        nft_name: {
            type: 'string',
        },
        nft_link: {
            type: 'string',
        },
        message: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
        signature: {
            type: 'string',
        },
    },
};
export const RequestReportNFTBody = {
    description: 'The input of ReportNFT function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqReportNFTSchema},
    },
};

// CREATE BLACKLIST
export type ReqCreateBlackListType = {
    nftContractAddress: string,
    typeName: string,
    isActive: boolean,
    userName: string,
    password: string
};
const ReqCreateBlackListSchema: SchemaObject = {
    type: 'object',
    required: ['nftContractAddress','typeName','userName','password'],
    properties: {
        nftContractAddress: {
            type: 'string',
        },
        typeName: {
            type: 'string',
        },
        isActive: {
            type: 'boolean',
        },
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        }
    },
};
export const RequestCreateBlackListBody = {
    description: 'The input of createBlackList function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqCreateBlackListSchema},
    },
};

// GET PROJECT BY ADDRESS
export type ReqGetProjectByAdressType = {
    nftContractAddress: string,
};
const ReqGetProjectByAdressSchema: SchemaObject = {
    type: 'object',
    required: ['nftContractAddress'],
    properties: {
        nftContractAddress: {
            type: 'string',
        },
    },
};
export const RequestGetProjectByAdressBody = {
    description: 'The input of getProjectByAdress function',
    required: true,
    content: {
        'application/x-www-form-urlencoded': {schema: ReqGetProjectByAdressSchema},
    },
};

// UPDATE API AND JOBS CONFIG
export type MainConfig = {
    configJobs: ConfigJobs,
    configRest?: ConfigRest,
};
export type ConfigRest = {
    // TODO: Update for rest api
};
export type ConfigJobs = {
    // TODO: Update for jobs
    isEnable: boolean,
    rpc: string
};
export type ReqUpdateConfigType = {
    typeConfig: Array<string>,
    mainConfig: MainConfig,
    nodeIp: string,
    nodeCluster: string,
    userName: string,
    password: string
};
const ReqUpdateConfigSchema: SchemaObject = {
    type: 'object',
    required: ['typeConfig', 'mainConfig', 'userName', 'password','nodeIp','nodeCluster'],
    properties: {
        typeConfig: {
            type: 'array',
        },
        nodeIp: {
            type: 'string',
        },
        nodeCluster: {
            type: 'string',
        },
        mainConfig: {
            type: 'object',
        },
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
export const RequestUpdateConfigBody = {
    description: 'The input of updateConfig function',
    required: true,
    content: {
        'application/json': {schema: ReqUpdateConfigSchema},
    },
};

// TRIGGER REWARDS
export type ReqTriggerRewardsType = {
    userName: string,
    password: string
};
const ReqTriggerRewardsSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
export const RequestTriggerRewardsBody = {
    description: 'The input of triggerRewards function',
    required: true,
    content: {
        'application/json': {schema: ReqTriggerRewardsSchema},
    },
};

// RESET ALL QUEUE
export type ReqResetAllQueueType = {
    userName: string,
    password: string
};
const ReqResetAllQueueSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
export const RequestResetAllQueueBody = {
    description: 'The input of ResetAllQueue function',
    required: true,
    content: {
        'application/json': {schema: ReqResetAllQueueSchema},
    },
};

// CHECKING JSON AND IMAGES
export type ReqCheckingImagesAndJsonType = {
    userName: string,
    password: string,
    nftContractAddress: string
};
const ReqCheckingImagesAndJsonSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password', 'nftContractAddress'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
    },
};
export const RequestCheckingImagesAndJsonBody = {
    description: 'The input of checkingImagesAndJson function',
    required: true,
    content: {
        'application/json': {schema: ReqCheckingImagesAndJsonSchema},
    },
};

// GET ALL BIDS QUEUE
export type ReqGetAllBidsQueueType = {
    userName: string,
    password: string,
    nftContractAddress: string
};
const ReqGetAllBidsQueueSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password', 'nftContractAddress'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
    },
};
export const RequestGetAllBidsQueueBody = {
    description: 'The input of getAllBidsQueue function',
    required: true,
    content: {
        'application/json': {schema: ReqGetAllBidsQueueSchema},
    },
};

// AD UPDATE COLLECTION
export type ReqAdUpdateCollectionType = {
    userName: string,
    password: string,
    nftContractAddress: string,
    maxTotalSupply: number,
};
const ReqAdUpdateCollectionSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password', 'nftContractAddress', 'maxTotalSupply'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
        maxTotalSupply: {
            type: 'number',
        },
    },
};
export const RequestAdUpdateCollectionBody = {
    description: 'The input of adUpdateCollection function',
    required: true,
    content: {
        'application/json': {schema: ReqAdUpdateCollectionSchema},
    },
};


// AD GET LIST MINTER
export type ReqAdGetListMinterType = {
    userName: string,
    password: string,
    nftContractAddress: string,
    mode: string,
};
const ReqAdGetListMinterSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password', 'nftContractAddress', 'mode'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
        mode: {
            type: 'string',
        },
    },
};
export const RequestAdGetListMinterBody = {
    description: 'The input of adGetListMinter function',
    required: true,
    content: {
        'application/json': {schema: ReqAdGetListMinterSchema},
    },
};

// GET ALL BID BY COLLECTION
export type ReqGetBidByCollectionType = {
    userName: string,
    password: string,
    nftContractAddress: string
};
const ReqGetBidByCollectionSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password', 'nftContractAddress'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
    },
};
export const RequestGetBidByCollectionBody = {
    description: 'The input of GetBidByCollection function',
    required: true,
    content: {
        'application/json': {schema: ReqGetBidByCollectionSchema},
    },
};

// AD GET OWNER NFT
export type ReqGetListOwnerNftType = {
    userName: string,
    password: string,
    nftContractAddress: string
};
const ReqGetListOwnerNftSchema: SchemaObject = {
    type: 'object',
    required: ['userName', 'password', 'nftContractAddress'],
    properties: {
        userName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        nftContractAddress: {
            type: 'string',
        },
    },
};
export const RequestGetListOwnerNftBody = {
    description: 'The input of getListOwnerNft function',
    required: true,
    content: {
        'application/json': {schema: ReqGetListOwnerNftSchema},
    },
};