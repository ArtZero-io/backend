import {SchemaObject} from "@loopback/rest";

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
    token_id: number,
};
const ReqGetNFTByIDSchema: SchemaObject = {
    type: 'object',
    required: ['token_id'],
    properties: {
        collection_address: {
            type: 'string',
        },
        token_id: {
            type: 'number',
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
    token_id: number,
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
export type TraitFilters = {
    is_for_sale?: boolean
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