import {
    repository
} from '@loopback/repository';
import {
    post,
    get,
    RestBindings,
    Request,
    Response,
    oas, requestBody, param,
} from '@loopback/rest';

import {
    AddRewardEventSchemaRepository,
    BidQueueSchemaRepository,
    BidsSchemaRepository,
    BidWinEventSchemaRepository,
    ClaimRewardEventSchemaRepository,
    CollectionEventSchemaRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository,
    ImageQueueSchemaRepository,
    ImageRemoveQueueSchemaRepository,
    ImagesSchemaRepository,
    JsonQueueSchemaRepository,
    JsonSchemaRepository,
    MintingEventSchemaRepository,
    NewListEventSchemaRepository,
    NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    NftsSchemaRepository, ProjectQueueSchemaRepository,
    ProjectsSchemaRepository,
    PurchaseEventSchemaRepository,
    RewardQueueSchemaRepository,
    ScannedBlocksSchemaRepository, StakingEventSchemaRepository, UnListEventSchemaRepository
} from "../repositories";
import {
    ResponseBody,
    ReqCacheImages,
    ReqUpdateCollectionType,
    RequestUpdateCollectionBody,
    RequestUpdateProjectBody,
    ReqUpdateProjectType,
    ReqNewMintingEventType,
    RequestNewMintingEventBody,
    ReqUpdateNftType,
    RequestUpdateNftBody,
    ReqUpdateBidsType,
    RequestUpdateBidsBody,
    ReqGetBidsByBidderAddressType,
    RequestGetBidsByBidderAddressBody,
    ReqCacheImageType,
    RequestCacheImageBody,
    ReqCacheImagesType,
    RequestCacheImagesBody,
    ReqCacheJSONType,
    RequestCacheJSONBody,
    ReqGetJSONType,
    RequestGetJSONBody,
    RequestGetCollectionContractBody,
    ReqGetCollectionContractType,
    RequestGetCollectionsBody,
    ReqGetCollectionsType,
    ReqGetProjectsType,
    RequestGetProjectsBody,
    ReqGetCollectionsByVolumeType,
    RequestGetCollectionsByVolumeBody,
    ReqGetCollectionByIDType,
    RequestGetCollectionByIDBody,
    ReqGetCollectionsByOwnerType,
    RequestGetCollectionsByOwnerBody,
    ReqCountCollectionsByOwnerType,
    RequestCountCollectionsByOwnerBody,
    ReqGetCollectionByAddressType,
    RequestGetCollectionByAddressBody,
    ReqGetFloorPriceType,
    RequestGetFloorPriceBody,
    ReqGetNFTsType,
    RequestGetNFTsBody,
    ReqGetListedNFTsType,
    RequestGetListedNFTsBody,
    ReqGetUnlistedNFTsType,
    RequestGetUnlistedNFTsBody,
    ReqGetNFTByIDType,
    RequestGetNFTByIDBody,
    ReqGetNFTsByOwnerType,
    RequestGetNFTsByOwnerBody,
    ReqGetNFTsByOwnerAndCollectionType,
    RequestGetNFTsByOwnerAndCollectionBody,
    ReqGetNFTsByCollectionAddressType,
    RequestGetNFTsByCollectionAddressBody,
    ReqGetNewListEventsType,
    RequestGetNewListEventsBody,
    ReqGetUnlistEventsType,
    RequestGetUnlistEventsBody,
    ReqGetPurchaseEventsType,
    RequestGetPurchaseEventsBody,
    ReqGetBidWinEventsType,
    RequestGetBidWinEventsBody,
    ReqSearchCollectionsType,
    RequestSearchCollectionsBody,
    ReqGetOwnershipHistoryType,
    RequestGetOwnershipHistoryBody,
    ReqSearchNFTOfCollectionByTraitsType,
    RequestSearchNFTOfCollectionByTraitsBody,
    ReqGetAddRewardHistoryType,
    RequestGetAddRewardHistoryBody,
    ReqGetClaimRewardHistoryType,
    RequestGetClaimRewardHistoryBody,
} from "../utils/Message";
import {MESSAGE, STATUS} from "../utils/constant";
import {isValidAddressPolkadotAddress, send_telegram_message} from "../utils/utils";
import * as nft721_psp34_standard_calls from "../contracts/nft721_psp34_standard_calls";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import {collection_manager} from "../contracts/collection_manager";
import * as profile_calls from "../contracts/profile_calls";
import {ContractPromise} from "@polkadot/api-contract";
import {nft721_psp34_standard} from "../contracts/nft721_psp34_standard";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {inject} from "@loopback/core";
import {artzero_nft} from "../contracts/artzero_nft";
import {profile} from "../contracts/profile";
import {
    bidwinevents,
    claimrewardevents,
    collections, newlistevents, projects,
    purchaseevents,
    unlistevents
} from "../models";

let global_vars = {
    caller: process.env.CALLER
};
const provider = new WsProvider(process.env.WSSPROVIDER);
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
    const collection_contract = new ContractPromise(
        api,
        collection_manager.CONTRACT_ABI,
        collection_manager.CONTRACT_ADDRESS
    );
    console.log('Collection Contract is ready');
    collection_manager_calls.setContract(collection_contract);

    const profile_contract = new ContractPromise(
        api,
        profile.CONTRACT_ABI,
        profile.CONTRACT_ADDRESS
    );
    console.log('Profile Contract is ready');
    profile_calls.setContract(profile_contract);
});

api.on("error", (err) => {
    console.log('error', err);
});

export class ApiController {
    constructor(
        @inject(RestBindings.Http.REQUEST) private request: Request,
        @inject(RestBindings.Http.RESPONSE) private response: Response,
        @repository(AddRewardEventSchemaRepository)
        public addRewardEventSchemaRepository: AddRewardEventSchemaRepository,
        @repository(BidQueueSchemaRepository)
        public bidQueueSchemaRepository: BidQueueSchemaRepository,
        @repository(BidWinEventSchemaRepository)
        public bidWinEventSchemaRepository: BidWinEventSchemaRepository,
        @repository(BidsSchemaRepository)
        public bidsSchemaRepository: BidsSchemaRepository,
        @repository(ClaimRewardEventSchemaRepository)
        public claimRewardEventSchemaRepository: ClaimRewardEventSchemaRepository,
        @repository(CollectionEventSchemaRepository)
        public collectionEventSchemaRepository: CollectionEventSchemaRepository,
        @repository(CollectionQueueSchemaRepository)
        public collectionQueueSchemaRepository: CollectionQueueSchemaRepository,
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
        @repository(ImageQueueSchemaRepository)
        public imageQueueSchemaRepository: ImageQueueSchemaRepository,
        @repository(ImageRemoveQueueSchemaRepository)
        public imageRemoveQueueSchemaRepository: ImageRemoveQueueSchemaRepository,
        @repository(ImagesSchemaRepository)
        public imagesSchemaRepository: ImagesSchemaRepository,
        @repository(JsonSchemaRepository)
        public jsonSchemaRepository: JsonSchemaRepository,
        @repository(JsonQueueSchemaRepository)
        public jsonQueueSchemaRepository: JsonQueueSchemaRepository,
        @repository(MintingEventSchemaRepository)
        public mintingEventSchemaRepository: MintingEventSchemaRepository,
        @repository(NewListEventSchemaRepository)
        public newListEventSchemaRepository: NewListEventSchemaRepository,
        @repository(NftsSchemaRepository)
        public nfTsSchemaRepository: NftsSchemaRepository,
        @repository(NftQueueSchemaRepository)
        public nftQueueSchemaRepository: NftQueueSchemaRepository,
        @repository(NftQueueScanAllSchemaRepository)
        public nftQueueScanAllSchemaRepository: NftQueueScanAllSchemaRepository,
        @repository(ProjectsSchemaRepository)
        public projectsSchemaRepository: ProjectsSchemaRepository,
        @repository(ProjectQueueSchemaRepository)
        public projectQueueSchemaRepository: ProjectQueueSchemaRepository,
        @repository(PurchaseEventSchemaRepository)
        public purchaseEventSchemaRepository: PurchaseEventSchemaRepository,
        @repository(RewardQueueSchemaRepository)
        public rewardQueueSchemaRepository: RewardQueueSchemaRepository,
        @repository(ScannedBlocksSchemaRepository)
        public scannedBlocksSchemaRepository: ScannedBlocksSchemaRepository,
        @repository(StakingEventSchemaRepository)
        public stakingEventSchemaRepository: StakingEventSchemaRepository,
        @repository(UnListEventSchemaRepository)
        public unListEventSchemaRepository: UnListEventSchemaRepository,
    ) {
    }

    // Ask Backend to Update Collection Data
    @post('/updateCollection')
    async updateCollection(
        @requestBody(RequestUpdateCollectionBody) req:ReqUpdateCollectionType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.NO_INPUT
        });
        let collection_address = req?.collection_address;
        if (!collection_address) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NO_ADDRESS
            });
        }
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.INVALID_ADDRESS
            });
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address
            }
        });
        if (!collection_data) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NOT_EXIST_ADDRESS
            });
        }
        let queue_data = await this.collectionQueueSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address
            }
        });
        if (!queue_data) {
            await this.collectionQueueSchemaRepository.create({
                type: "update",
                nftContractAddress: collection_address,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } else {
            return this.response.send({
                status: STATUS.FAILED,
                ret: "",
                message: "Duplicated Address",
                data: []
            });
        }
    }

    // Ask Backend to Update Project Data
    @post('/updateProject')
    async updateProject(
        @requestBody(RequestUpdateProjectBody) req:ReqUpdateProjectType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.NO_INPUT
        });
        let project_address = req?.project_address;
        if (!project_address) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NO_ADDRESS
            });
        }
        if (!isValidAddressPolkadotAddress(project_address)) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.INVALID_ADDRESS
            });
        }
        let project_data = await this.projectsSchemaRepository.findOne({
                where: {
                    nftContractAddress: project_address
                }
            }
        );
        if (!project_data) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NOT_EXIST_ADDRESS
            });
        }
        let queue_data = await this.projectQueueSchemaRepository.findOne({
            where: {
                nftContractAddress: project_address
            }
        });
        if (!queue_data) {
            await this.projectQueueSchemaRepository.create(
                {
                    type: "update",
                    nftContractAddress: project_address,
                    createdTime: new Date(),
                    updatedTime: new Date()
                }
            );
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } else {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.DUPLICATED_ADDRESS,
            });
        }
    }

    // Add new minting event
    @post('/newMintingEvent')
    async newMintingEvent(
        @requestBody(RequestNewMintingEventBody) req:ReqNewMintingEventType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let nftContractAddress = req?.project;
        let minter = req?.minter;
        let phaseId = req?.phase_id;
        let mintAmount = req?.mint_amount;
        let price = req?.price;
        let projectMintFee = req?.project_mint_fee;
        if (!nftContractAddress || !minter) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
        }
        if (
            !isValidAddressPolkadotAddress(nftContractAddress) ||
            !isValidAddressPolkadotAddress(minter)
        ) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        await this.mintingEventSchemaRepository.create({
            nftContractAddress: nftContractAddress,
            minterAddress: minter,
            phaseId: phaseId,
            mintAmount: mintAmount,
            price: price,
            projectMintFee: projectMintFee,
            createdTime: new Date(),
            updatedTime: new Date()
        });
        return this.response.send({
            status: STATUS.OK,
            message: MESSAGE.SUCCESS
        });
    }

    // Get total volume
    @get('/getTotalVolume')
    async getTotalVolume(): Promise<ResponseBody | Response> {
        const listData = await this.mintingEventSchemaRepository.find({
            where: {
                projectMintFee: {
                    gte: 0
                }
            },
            fields: {
                projectMintFee: true
            }
        });
        let total = 0;
        listData.map((item: any) => {
            total += item?.projectMintFee
        });
        return this.response.send({
            status: STATUS.OK,
            ret: total,
            message: MESSAGE.SUCCESS,
            data: []
        });
    }

    // Ask Backend to Update NFT Data
    @post('/updateNFT')
    async updateNFT(
        @requestBody(RequestUpdateNftBody) req:ReqUpdateNftType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let tokenID = req?.token_id;
        if (!collection_address) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
        }
        if (!tokenID) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_TOKEN_ID});
        }
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address
            }
        });
        if (!collection_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
        }
        let queue_data = await this.nftQueueSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID
            }
        });
        if (!queue_data) {
            await this.nftQueueSchemaRepository.create({
                type: "update",
                nftContractAddress: collection_address,
                tokenID: tokenID,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
        }
        return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.DUPLICATED_RECORD,
        });
    }

    // Ask Backend to Update Bids Data
    @post('/updateBids')
    async updateBids(
        @requestBody(RequestUpdateBidsBody) req:ReqUpdateBidsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let seller = req?.seller;
        let tokenID = req?.token_id;
        if (!collection_address || !seller) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
        }
        if (!tokenID) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_TOKEN_ID});
        }
        if (
            !isValidAddressPolkadotAddress(collection_address) ||
            !isValidAddressPolkadotAddress(seller)
        ) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
            }
        });
        if (!collection_data) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
            });
        }
        let queue_data = await this.bidQueueSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID,
                seller: seller,
            }
        });
        if (!queue_data) {
            await this.bidQueueSchemaRepository.create({
                nftContractAddress: collection_address,
                tokenID: tokenID,
                seller: seller,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
        }
        return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.DUPLICATED_RECORD,
        });
    }

    // Get Bids from DB by Bidder Address
    @post('/getBidsByBidderAddress')
    async getBidsByBidderAddress(
        @requestBody(RequestGetBidsByBidderAddressBody) req:ReqGetBidsByBidderAddressType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let bidder = req?.bidder;
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        const order = req?.sort ? "bid_date DESC" : "bid_date ASC";
        if (!bidder) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
        }
        if (!isValidAddressPolkadotAddress(bidder)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let data = await this.bidsSchemaRepository.find({
            where: {
                bidder: bidder
            },
            limit: limit,
            skip: offset,
            order: [order]
        });
        return this.response.send({
            status: STATUS.OK,
            message: MESSAGE.SUCCESS,
            ret: data
        });
    }

    // Ask Backend to cache an Image
    @post('/cacheImage')
    async cacheImage(
        @requestBody(RequestCacheImageBody) req:ReqCacheImageType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let input = req?.input;
        let is1024 = req?.is1024;
        let is1440 = req?.is1440;
        let is1920 = req?.is1920;
        let metadata = req?.metadata;
        let imageType = req?.imageType;
        if (!is1024) is1024 = false;
        if (!is1440) is1440 = false;
        if (!is1920) is1920 = false;
        let is500 = true;
        let is100 = true;
        if (!input) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        }
        if (!imageType) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_IMAGE_TYPE});
        }
        if (!metadata) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_METADATA});
        }
        input = input.replace("ipfs://", "/ipfs/");
        let input_data = await this.imagesSchemaRepository.findOne({
            where: {
                input: input
            }
        });
        if (input_data) {
            if (is1024 && input_data.location1024 != "")
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
            if (is1440 && input_data.location1440 != "")
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
            if (is1920 && input_data.location1920 != "")
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
            if ((is1024 || is1440 || is1920) && input_data.location100 != "") {
                is500 = false;
                is100 = false;
            }
        }
        let queue_data = await this.imageQueueSchemaRepository.findOne({
            where: {
                input: input
            }
        });
        if (!queue_data) {
            await this.imageQueueSchemaRepository.create({
                input: input,
                is1024: is1024,
                is1920: is1920,
                is1440: is1440,
                is500: is500,
                is100: is100,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
        }
        return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.DUPLICATED_RECORD
        });
    }

    // Ask Backend to cache an Image
    @post('/cacheImages')
    async cacheImages(
        @requestBody(RequestCacheImagesBody) req:ReqCacheImagesType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let images = JSON.parse(req?.images);
        console.log('Images Request: ', req?.images);
        console.log('Images Request after parse: ', images);
        if (images.length) {
            console.log('Images length:', images.length);
            for (let i = 0; i < images.length; i++) {
                console.log('Image item:', images[i]);
                let image: ReqCacheImages = images[i];
                let input = image.input;
                let is1024 = image.is1024;
                let is1440 = image.is1440;
                let is1920 = image.is1920;
                let metadata = image.metadata;
                let imageType = image.imageType;
                if (!is1024) is1024 = false;
                if (!is1440) is1440 = false;
                if (!is1920) is1920 = false;
                let is500 = true;
                let is100 = true;
                if (!input || !imageType || !metadata) {
                    continue;
                }
                input = input.replace("ipfs://", "/ipfs/");
                let input_data = await this.imagesSchemaRepository.findOne({
                    where: {
                        input: input
                    }
                });
                if (input_data) {
                    if (is1024 && input_data.location1024 != "")
                        continue;
                    if (is1440 && input_data.location1440 != "")
                        continue;
                    if (is1920 && input_data.location1920 != "")
                        continue;
                    if ((is1024 || is1440 || is1920) && input_data.location100 != "") {
                        is500 = false;
                        is100 = false;
                    }
                }
                let queue_data = await this.imageQueueSchemaRepository.findOne({
                    where: {
                        input: input
                    }
                });
                if (!queue_data) {
                    // Validate transaction
                    if (imageType == 'collection' || imageType == 'launchpad') {
                        if (metadata?.collectionAddress && global_vars.caller) {
                            let collection = await collection_manager_calls.getCollectionByAddress(global_vars.caller, metadata.collectionAddress);
                            if (collection) {
                                let attributes = await collection_manager_calls.getAttributes(global_vars.caller, metadata.collectionAddress,
                                    [metadata.type]
                                );
                                if (attributes[0]) {
                                    if (attributes[0] == input) {
                                        await this.imageQueueSchemaRepository.create({
                                            input: input,
                                            is1024: is1024,
                                            is1920: is1920,
                                            is1440: is1440,
                                            is500: is500,
                                            is100: is100,
                                            createdTime: new Date(),
                                            updatedTime: new Date()
                                        });
                                        console.log('Cache Images: added ' + input);
                                    } else {
                                        console.log('Cache Images: attribute ' + metadata.type + ' is ' + attributes[0])
                                    }
                                } else {
                                    console.log('Collection missing ' + metadata.type + ' type');
                                }
                            } else {
                                console.log('Collection not exist');
                            }
                        } else {
                            console.log('Metadata missing collection address');
                        }
                    } else if (imageType == 'profile') {
                        if (metadata.walletAddress && global_vars.caller) {
                            let attributes = await profile_calls.getAttributes(global_vars.caller, metadata.walletAddress,
                                [metadata.type]
                            );
                            if (attributes[0]) {
                                if (attributes[0] == input) {
                                    await this.imageQueueSchemaRepository.create({
                                        input: input,
                                        is1024: is1024,
                                        is1920: is1920,
                                        is1440: is1440,
                                        is500: is500,
                                        is100: is100,
                                        createdTime: new Date(),
                                        updatedTime: new Date()
                                    });
                                    console.log('Cache Images: added ' + input);
                                } else {
                                    console.log('Cache Images: attribute ' + metadata.type + ' is ' + attributes[0])
                                }
                            } else {
                                console.log('Profile missing ' + metadata.type + ' type');
                            }
                        } else {
                            console.log('Metadata missing wallet address');
                        }
                    } else {
                        if (imageType == 'nft') {
                            if (metadata.collectionAddress && metadata.tokenId && global_vars.caller) {
                                const nft_contract = new ContractPromise(
                                    api,
                                    nft721_psp34_standard.CONTRACT_ABI,
                                    metadata.collectionAddress
                                );
                                let attributes = await nft721_psp34_standard_calls.getAttributes(
                                    nft_contract,
                                    global_vars.caller,
                                    {u64: metadata.tokenId},
                                    [metadata.type]
                                );
                                if (attributes[0]) {
                                    if (attributes[0] == input) {
                                        await this.imageQueueSchemaRepository.create({
                                            input: input,
                                            is1024: is1024,
                                            is1920: is1920,
                                            is1440: is1440,
                                            is500: is500,
                                            is100: is100,
                                            createdTime: new Date(),
                                            updatedTime: new Date()
                                        });
                                        console.log('Cache Images: added ' + input);
                                    } else {
                                        console.log('Cache Images: attribute ' + metadata.type + ' is ' + attributes[0])
                                    }
                                } else {
                                    console.log('NFT missing ' + metadata.type + ' type');
                                }
                            } else {
                                console.log('Metadata missing collection or nft data');
                            }
                        }
                    }
                    //End vlidate transaction
                }
            }
        } else {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_IMAGES});
        }
        return this.response.send({
            status: STATUS.OK,
            message: MESSAGE.SUCCESS
        });
    }

    // Ask Backend to cache an JSON
    @post('/cacheJSON')
    async cacheJSON(
        @requestBody(RequestCacheJSONBody) req:ReqCacheJSONType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let input = req?.input;
        if (!input) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        }
        input = input.replace("ipfs://", "/ipfs/");
        let input_data = await this.jsonSchemaRepository.findOne({
            where: {
                input: input
            }
        });
        if (input_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
        }
        let queue_data = await this.jsonQueueSchemaRepository.findOne({
            where: {
                input: input
            }
        });
        if (!queue_data) {
            await this.jsonQueueSchemaRepository.create({
                input: input,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
        }
        return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.DUPLICATED_RECORD,
        });
    }

    // Get JSON Cache
    @get('/getJSON')
    @oas.response.file()
    async getJSON(
        @requestBody(RequestGetJSONBody) req:ReqGetJSONType
    ): Promise<Response | ResponseBody | void> {
        let input = this.request.query.input;
        if (!input || typeof input != 'string') return this.response.send({
            status: STATUS.FAILED,
            message: MESSAGE.INVALID_INPUT
        });
        input = input.replace("ipfs://", "/ipfs/");
        let input_data = await this.jsonSchemaRepository.findOne({
            where: {
                input: input
            }
        });
        if (!input_data || !input_data?.location) {
            return {status: STATUS.FAILED, message: MESSAGE.JSON_NOT_EXIST};
        } else {
            return this.response.sendFile(input_data.location);
        }
    }

    // Get Image Cache
    @get('/getImage')
    async getImage(
        @param.query.string('input') input?: string,
        @param.query.string('url') url?: string,
        @param.query.number('size') size?: number,
        // @requestBody(RequestGetImageBody) req:ReqGetImageType
    ): Promise<Response | ResponseBody | void> {
        // let inputTmp = input;
        // let urlTmp = url;
        // let sizeTmp = size;
        // if (typeof inputTmp != 'string') return {status: STATUS.FAILED, message: MESSAGE.INVALID_INPUT};
        // if (typeof urlTmp != 'string') return {status: STATUS.FAILED, message: MESSAGE.INVALID_INPUT};
        // if (typeof sizeTmp != 'number') return {status: STATUS.FAILED, message: MESSAGE.INVALID_INPUT};
        // sizeTmp = parseInt(sizeTmp);
        console.log({input: input});
        console.log({url: url});
        console.log({size: size});
        if (!url) url = "";
        if (!input) return this.response.send(url);
        if (
            size != 100 &&
            size != 500 &&
            size != 1024 &&
            size != 1440 &&
            size != 1920
        ) {
            size = 100;
        }
        input = input.replace("ipfs://", "/ipfs/");
        let input_data = await this.imagesSchemaRepository.findOne({
            where: {
                input: input
            }
        });
        if (!input_data) {
            let queue_data = await this.imageQueueSchemaRepository.findOne({
                where: {
                    input: input
                }
            });
            if (!queue_data) {
                await this.imageQueueSchemaRepository.create({
                    input: input,
                    is500: true,
                    is100: true,
                    createdTime: new Date(),
                    updatedTime: new Date()
                });
            }
            return this.response.send(url);
        }
        if (size == 100) {
            try {
                if (input_data.isCloudFlare) {
                    return this.response.send(input_data.location100);
                } else {
                    if (input_data.location100) {
                        return this.response.sendFile(input_data.location100);
                    }
                }
            } catch (e) {
                send_telegram_message("getImage 100 - " + e.message);
                await this.imagesSchemaRepository.deleteAll({
                    input: input
                });
                await this.imageQueueSchemaRepository.create({
                    input: input,
                    is500: true,
                    is100: true,
                    createdTime: new Date(),
                    updatedTime: new Date()
                });
            }
        } else if (size == 500) {
            try {
                if (input_data.isCloudFlare) {
                    return this.response.send(input_data.location500);
                } else {
                    if (input_data.location500) {
                        return this.response.sendFile(input_data.location500);
                    }
                }
            } catch (e) {
                send_telegram_message("getImage 500 - " + e.message);
                await this.imagesSchemaRepository.deleteAll({
                    input: input
                });
                await this.imageQueueSchemaRepository.create({
                    input: input,
                    is500: true,
                    is100: true,
                    createdTime: new Date(),
                    updatedTime: new Date()
                });
            }
        } else if (size == 1024) {
            if (input_data.location1024 != "") {
                try {
                    if (input_data.isCloudFlare) {
                        return this.response.send(input_data.location1024);
                    } else {
                        if (input_data.location1024) {
                            return this.response.sendFile(input_data.location1024);
                        }
                    }
                } catch (e) {
                    send_telegram_message("getImage 1024 - " + e.message);
                    await this.imagesSchemaRepository.deleteAll({
                        input: input
                    });
                    await this.imageQueueSchemaRepository.create({
                        input: input,
                        is1024: true,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                }
            } else return this.response.send(url);
        } else if (size == 1440) {
            if (input_data.location1440 != "") {
                try {
                    if (input_data.isCloudFlare) {
                        return this.response.send(input_data.location1440);
                    } else {
                        if (input_data.location1440) {
                            return this.response.sendFile(input_data.location1440);
                        }
                    }

                } catch (e) {
                    send_telegram_message("getImage 1440 - " + e.message);
                    await this.imagesSchemaRepository.deleteAll({
                        input: input
                    });
                    await this.imageQueueSchemaRepository.create({
                        input: input,
                        is1440: true,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                }
            } else return this.response.send(url);
        } else if (size == 1920) {
            if (input_data.location1920 != "") {
                try {
                    if (input_data.isCloudFlare) {
                        return this.response.send(input_data.location1920);
                    } else {
                        if (input_data.location1920) {
                            return this.response.sendFile(input_data.location1920);
                        }
                    }
                } catch (e) {
                    send_telegram_message("getImage 1920 - " + e.message);
                    await this.imagesSchemaRepository.deleteAll({
                        input: input
                    });
                    await this.imageQueueSchemaRepository.create({
                        input: input,
                        is1920: true,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                }
            } else return this.response.send(url);
        }
    }

    // Get Collection Contract Address
    @get('/getCollectionContract')
    async getCollectionContract(
        @requestBody(RequestGetCollectionContractBody) req:ReqGetCollectionContractType
    ): Promise<ResponseBody | Response> {
        const host = this.request.headers.host;
        const origin = this.request.headers.origin;
        const userIP = this.request.socket.remoteAddress;
        console.log(this.request.headers);
        console.log(`userIP: ${userIP}`);
        console.log(`host: ${host}`);
        console.log(`origin: ${origin}`);
        return this.response.send({
            status: STATUS.OK,
            ret: collection_manager.CONTRACT_ADDRESS
        });
    }

    // Get total Collections in Database
    @get('/getCollectionCount')
    async getCollectionCount(): Promise<ResponseBody | Response> {
        const collection_count_db = await this.collectionsSchemaRepository.count({
            isActive: true,
            nft_count: {gt: 0},
        });
        return this.response.send({status: "OK", ret: collection_count_db});
    }

    // Get featured Collections
    @get('/getFeaturedCollections')
    async getFeaturedCollections(): Promise<ResponseBody | Response> {
        return this.response.send({
            status: "OK",
            ret: [`${artzero_nft.CONTRACT_ADDRESS}`],
        });
    }

    // Get Collections using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getCollections')
    async getCollections(
        @requestBody(RequestGetCollectionsBody) req:ReqGetCollectionsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let isActive = req?.isActive;
        let ignoreNoNFT = req?.ignoreNoNFT;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (isActive == null) isActive = true;
        let data: collections[];
        const order = req?.sort ? "index DESC" : "index ASC";
        if (!ignoreNoNFT)
            data = await this.collectionsSchemaRepository.find({
                where: {
                    isActive: isActive,
                    nft_count: {gt: 0},
                },
                skip: offset,
                limit: limit,
                order: [order]
            });
        else
            data = await this.collectionsSchemaRepository.find({
                where: {
                    isActive: isActive
                },
                skip: offset,
                limit: limit,
                order: [order]
            });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get Collections using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getProjects')
    async getProjects(
        @requestBody(RequestGetProjectsBody) req:ReqGetProjectsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let isActive = req?.isActive;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (isActive == null) isActive = true;
        let data: projects[];
        const order = req?.sort ? "index DESC" : "index ASC";
        data = await this.projectsSchemaRepository.find({
            where: {
                isActive: isActive
            },
            skip: offset,
            limit: limit,
            order: [order]
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get Collections By Volume using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getCollectionsByVolume')
    async getCollectionsByVolume(
        @requestBody(RequestGetCollectionsByVolumeBody) req:ReqGetCollectionsByVolumeType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let isActive = req?.isActive;
        let ignoreNoNFT = req?.ignoreNoNFT;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (isActive == null) isActive = true;
        let option = {
            isActive: isActive,
            nft_count: {}
        };
        if (!ignoreNoNFT) {
            option.nft_count = {gt: 0};
        }
        const order = req?.sort ? "volume DESC" : "volume ASC";
        let data = await this.collectionsSchemaRepository.find({
            where: option,
            skip: offset,
            limit: limit,
            order: [order]
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get Collection Information by ID
    @post('/getCollectionByID')
    async getCollectionByID(
        @requestBody(RequestGetCollectionByIDBody) req:ReqGetCollectionByIDType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let id = req?.id;
        if (!id) id = 1;
        let data = await this.collectionsSchemaRepository.find({
            where: {
                index: id
            }
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get Collections by Collection Owner
    @post('/getCollectionsByOwner')
    async getCollectionsByOwner(
        @requestBody(RequestGetCollectionsByOwnerBody) req:ReqGetCollectionsByOwnerType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let owner = req?.owner;
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!owner) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        const order = req?.sort ? "index DESC" : "index ASC";
        let data = await this.collectionsSchemaRepository.find({
            where: {
                collectionOwner: owner
            },
            skip: offset,
            limit: limit,
            order: [order]
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Count Number of Collections by Collection Owner
    @post('/countCollectionsByOwner')
    async countCollectionsByOwner(
        @requestBody(RequestCountCollectionsByOwnerBody) req:ReqCountCollectionsByOwnerType
    ): Promise<ResponseBody | Response> {
        console.log({requestBody: req});
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let owner = req?.owner;
        let includeNoneNFT = req?.noNFT;
        if (!includeNoneNFT) includeNoneNFT = false;
        if (!owner) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        if (includeNoneNFT) {
            let data = await this.collectionsSchemaRepository.count({
                collectionOwner: owner
            });

            let data1 = await this.collectionsSchemaRepository.find({
                where: {
                    collectionOwner: owner
                }
            });

            let data2 = await this.collectionsSchemaRepository.find();
            console.log({owner: owner});
            console.log({data1: data1});
            console.log({data2: data2});

            return this.response.send({status: STATUS.OK, ret: data.count});
        } else {
            let data = await this.collectionsSchemaRepository.count({
                collectionOwner: owner,
                nft_count: {gt: 0},
            });
            return this.response.send({status: STATUS.OK, ret: data.count});
        }
    }

    // Get Collection Information by NFT Contract address
    @post('/getCollectionByAddress')
    async getCollectionByAddress(
        @requestBody(RequestGetCollectionByAddressBody) req:ReqGetCollectionByAddressType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
            }
        });
        if (!collection_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
        }
        let data = await this.collectionsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
            }
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get Floor Price of a Collection
    @post('/getFloorPrice')
    async getFloorPrice(
        @requestBody(RequestGetFloorPriceBody) req:ReqGetFloorPriceType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
                isActive: true,
            }
        });
        if (!collection_data) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NOT_EXIST_ADDRESS_INACTIVE,
            });
        }
        let data = await this.nfTsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                is_for_sale: true,
            },
            order: ["price DESC"],  // price ASC
            limit: 1
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get NFT List
    @post('/getNFTs')
    async getNFTs(
        @requestBody(RequestGetNFTsBody) req:ReqGetNFTsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
            }
        });
        if (!collection_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
        }
        const order = req?.sort ? "tokenID DESC" : "tokenID ASC";
        let data = await this.nfTsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
            },
            order: [order],
            skip: offset,
            limit: limit
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    @post('/getListedNFTs')
    async getListedNFTs(
        @requestBody(RequestGetListedNFTsBody) req:ReqGetListedNFTsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
            }
        });
        if (!collection_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
        }
        const order = req?.sort ? "tokenID DESC" : "tokenID ASC";
        let data = await this.nfTsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                is_for_sale: true,
            },
            order: [order],
            skip: offset,
            limit: limit
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    @post('/getUnlistedNFTs')
    async getUnlistedNFTs(
        @requestBody(RequestGetUnlistedNFTsBody) req:ReqGetUnlistedNFTsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
            }
        });
        if (!collection_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
        }
        const order = req?.sort ? "tokenID DESC" : "tokenID ASC";
        let data = await this.nfTsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                is_for_sale: false,
            },
            order: [order],
            skip: offset,
            limit: limit
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get NFT Information by ID
    @post('/getNFTByID')
    async getNFTByID(
        @requestBody(RequestGetNFTByIDBody) req:ReqGetNFTByIDType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let tokenID = req?.token_id;
        let collection_address = req?.collection_address;
        if (!tokenID) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_TOKEN_ID});
        }
        if (!isValidAddressPolkadotAddress(collection_address)) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        let collection_data = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collection_address,
            }
        });
        if (!collection_data) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
        }
        let data = await this.nfTsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID,
            }
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get NFTs by  Owner
    @post('/getNFTsByOwner')
    async getNFTsByOwner(
        @requestBody(RequestGetNFTsByOwnerBody) req:ReqGetNFTsByOwnerType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let owner = req?.owner;
        let limit = req?.limit;
        let offset = req?.offset;
        let sort = req?.sort;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!sort) sort = -1;
        if (!owner) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        const order = req?.sort ? "tokenID DESC" : "tokenID ASC";
        let data = await this.nfTsSchemaRepository.find({
            where: {
                is_for_sale: false,
                owner: owner
            },
            order: [order],
            skip: offset,
            limit: limit
        });
        let data1 = await this.nfTsSchemaRepository.find({
            where: {
                is_for_sale: true,
                nft_owner: owner
            },
            order: [order],
            skip: offset,
            limit: limit
        });
        let result = data.concat(data1);
        if (sort) {
            result = result
                .sort(function (a: any, b: any) {
                    return parseInt(b.index) - parseInt(a.index);
                })
                .slice(0, limit);
        } else {
            result = result
                .sort(function (a: any, b: any) {
                    return parseInt(a.index) - parseInt(b.index);
                })
                .slice(0, limit);
        }
        return this.response.send({status: STATUS.OK, ret: result});
    }

    // Get NFTs by  Owner and Collection
    @post('/getNFTsByOwnerAndCollection')
    async getNFTsByOwnerAndCollection(
        @requestBody(RequestGetNFTsByOwnerAndCollectionBody) req:ReqGetNFTsByOwnerAndCollectionType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let owner = req?.owner;
        let collection_address = req?.collection_address;
        let limit = req?.limit;
        let offset = req?.offset;
        let sort = req?.sort;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!sort) sort = -1;
        if (!owner || !collection_address) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        const order = req?.sort ? "tokenID DESC" : "tokenID ASC";
        let data = await this.nfTsSchemaRepository.find({
            where: {
                is_for_sale: false,
                owner: owner,
                nftContractAddress: collection_address,
            },
            order: [order],
            skip: offset,
            limit: limit
        })
        let data1 = await this.nfTsSchemaRepository.find({
            where: {
                is_for_sale: true,
                nft_owner: owner,
                nftContractAddress: collection_address,
            },
            order: [order],
            skip: offset,
            limit: limit
        })
        let result = data.concat(data1);
        if (sort) {
            result = result
                .sort(function (a: any, b: any) {
                    return parseInt(b.index) - parseInt(a.index);
                })
                .slice(0, limit);
        } else {
            result = result
                .sort(function (a: any, b: any) {
                    return parseInt(a.index) - parseInt(b.index);
                })
                .slice(0, limit);
        }
        return this.response.send({status: STATUS.OK, ret: result});
    }

    // Get NFTs by Collection Address
    @post('/getNFTsByCollectionAddress')
    async getNFTsByCollectionAddress(
        @requestBody(RequestGetNFTsByCollectionAddressBody) req:ReqGetNFTsByCollectionAddressType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        if (!collection_address) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
        }
        const order = req?.sort ? "tokenID DESC" : "tokenID ASC";
        let data = await this.nfTsSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
            },
            order: [order],
            skip: offset,
            limit: limit
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get recently listed NFTs Event
    @post('/getNewListEvents')
    async getNewListEvents(
        @requestBody(RequestGetNewListEventsBody) req:ReqGetNewListEventsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let collection_address = req?.collection_address;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        let data: newlistevents[];
        const order = req?.sort ? "blockNumber DESC" : "blockNumber ASC";
        if (collection_address) {
            data = await this.newListEventSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
        } else {
            data = await this.newListEventSchemaRepository.find({
                where: {},
                order: [order],
                skip: offset,
                limit: limit
            });
        }
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get recently unlisted NFTs Event
    @post('/getUnlistEvents')
    async getUnlistEvents(
        @requestBody(RequestGetUnlistEventsBody) req:ReqGetUnlistEventsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let collection_address = req?.collection_address;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        let data: unlistevents[];
        const order = req?.sort ? "blockNumber DESC" : "blockNumber ASC";
        if (collection_address) {
            data = await this.unListEventSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
        } else {
            data = await this.unListEventSchemaRepository.find({
                where: {},
                order: [order],
                skip: offset,
                limit: limit
            });
        }
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get recently trade Event
    @post('/getPurchaseEvents')
    async getPurchaseEvents(
        @requestBody(RequestGetPurchaseEventsBody) req:ReqGetPurchaseEventsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let collection_address = req?.collection_address;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        let data: purchaseevents[];
        const order = req?.sort ? "blockNumber DESC" : "blockNumber ASC";
        if (collection_address) {
            data = await this.purchaseEventSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
        } else {
            data = await this.purchaseEventSchemaRepository.find({
                where: {},
                order: [order],
                skip: offset,
                limit: limit
            });
        }
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get recently accepted bids Event
    @post('/getBidWinEvents')
    async getBidWinEvents(
        @requestBody(RequestGetBidWinEventsBody) req:ReqGetBidWinEventsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let collection_address = req?.collection_address;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        let data: bidwinevents[];
        const order = req?.sort ? "blockNumber DESC" : "blockNumber ASC";
        if (collection_address) {
            data = await this.bidWinEventSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
        } else {
            data = await this.bidWinEventSchemaRepository.find({
                where: {},
                order: [order],
                skip: offset,
                limit: limit
            });
        }
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Search Collection
    @post('/searchCollections')
    async searchCollections(
        @requestBody(RequestSearchCollectionsBody) req:ReqSearchCollectionsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let keywords = req?.keywords;
        let limit = req?.limit;
        let isActive = req?.isActive;
        let ignoreNoNFT = req?.ignoreNoNFT;
        if (!limit) limit = 15;
        if (isActive == null) isActive = true;
        let data: collections[];
        const pattern = new RegExp('^' + keywords + '.*', "i");
        if (!ignoreNoNFT) {
            data = await this.collectionsSchemaRepository.find({
                where: {
                    isActive: isActive,
                    nft_count: {gt: 0},
                    name: {regexp: pattern},
                },
                limit: limit
            });
        } else {
            data = await this.collectionsSchemaRepository.find({
                where: {
                    isActive: isActive,
                    name: {regexp: pattern},
                },
                limit: limit
            });
        }
        return this.response.send({status: STATUS.OK, ret: data});
    }

    @post('/getOwnershipHistory')
    async getOwnershipHistory(
        @requestBody(RequestGetOwnershipHistoryBody) req:ReqGetOwnershipHistoryType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let collection_address = req?.collection_address;
        let tokenID = req?.token_id;
        let owner = req?.owner;
        if (!collection_address || !tokenID || !owner) {
            return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_INPUT});
        }
        let bid_win = await this.bidWinEventSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID,
            }
        });
        let purchase = await this.purchaseEventSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID,
            }
        });
        let list = await this.newListEventSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID,
            }
        });
        let unList = await this.unListEventSchemaRepository.find({
            where: {
                nftContractAddress: collection_address,
                tokenID: tokenID,
            }
        });
        let result = bid_win.concat(purchase).concat(list).concat(unList);
        result = result.sort(function (a: any, b: any) {
            return parseInt(b.blockNumber) - parseInt(a.blockNumber);
        });
        return this.response.send({status: STATUS.OK, ret: result});
    }

    // Search NFT of Collection by traits
    @post('/searchNFTOfCollectionByTraits')
    async searchNFTOfCollectionByTraits(
        @requestBody(RequestSearchNFTOfCollectionByTraitsBody) req:ReqSearchNFTOfCollectionByTraitsType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let params = JSON.parse(req?.traitFilters);
        let limit = req?.limit || 24;
        let offset = req?.offset || 0;
        let sort = req?.sort || -1;
        let collectionAddress = req?.collectionAddress;
        if (!isValidAddressPolkadotAddress(collectionAddress)) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.INVALID_COLLECTION_ADDRESS,
            });
        }
        let ret = {result: {}};
        let collectionInfo = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: collectionAddress,
            }
        });
        if (!collectionInfo) {
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
            });
        }
        ret = {...ret, ...collectionInfo?.toJSON()};
        const sortQuery =
            params.is_for_sale === true
                ? {price: sort}
                : {tokenID: sort};
        const nftsCollection = (this.nfTsSchemaRepository.dataSource.connector as any).collection("Nfts");
        const [result] = await nftsCollection.aggregate([
            {
                $match: {
                    nftContractAddress: collectionAddress,
                    ...params,
                },
            },
            {$sort: sortQuery},
            {
                $facet: {
                    metadata: [{$count: "totalResults"}],
                    data: [{$skip: offset}, {$limit: limit}],
                },
            },
        ]);
        ret.result = {
            NFTList: result.data,
            totalResults: result.metadata[0]?.totalResults || 0,
        };
        return this.response.send({status: STATUS.OK, ret});
    }

    // Get Add Reward History
    @post('/getAddRewardHistory')
    async getAddRewardHistory(
        @requestBody(RequestGetAddRewardHistoryBody) req:ReqGetAddRewardHistoryType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        const order = req?.sort ? "blockNumber DESC" : "blockNumber ASC";
        let data = await this.addRewardEventSchemaRepository.find({
            where: {},
            order: [order],
            skip: offset,
            limit: limit
        });
        return this.response.send({status: STATUS.OK, ret: data});
    }

    // Get Reward Claim History by Account, if stake's_address not provided, show all
    @post('/getClaimRewardHistory')
    async getClaimRewardHistory(
        @requestBody(RequestGetClaimRewardHistoryBody) req:ReqGetClaimRewardHistoryType
    ): Promise<ResponseBody | Response> {
        if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
        let limit = req?.limit;
        let offset = req?.offset;
        let staker_address = req?.staker_address;
        if (!limit) limit = 15;
        if (!offset) offset = 0;
        let data: claimrewardevents[];
        const order = req?.sort ? "blockNumber DESC" : "blockNumber ASC";
        if (staker_address) {
            data = await this.claimRewardEventSchemaRepository.find({
                where: {
                    staker: staker_address
                },
                order: [order],
                skip: offset,
                limit: limit
            });
        } else {
            data = await this.claimRewardEventSchemaRepository.find({
                where: {},
                order: [order],
                skip: offset,
                limit: limit
            });
        }
        return this.response.send({status: STATUS.OK, ret: data});
    }
}
