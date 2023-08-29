import {
    Count,
    CountSchema,
    Filter, FilterExcludingWhere, PredicateComparison,
    repository, Where
} from '@loopback/repository';
import {
    post,
    get,
    RestBindings,
    Request,
    Response,
    oas, requestBody, param, response, getModelSchemaRef,
} from '@loopback/rest';

import {
    AddRewardEventSchemaRepository, AzeroDomainEventRepository,
    BidQueueSchemaRepository,
    BidsSchemaRepository,
    BidWinEventSchemaRepository,
    BlackListRepository,
    ClaimRewardEventSchemaRepository,
    CollectionEventSchemaRepository,
    CollectionQueueSchemaRepository,
    CollectionsSchemaRepository,
    ConfigRepository,
    ImageQueueSchemaRepository,
    ImageRemoveQueueSchemaRepository,
    ImagesSchemaRepository,
    JsonQueueSchemaRepository,
    JsonSchemaRepository, LaunchpadMintingEventSchemaRepository,
    MintingEventSchemaRepository,
    NewListEventSchemaRepository,
    NftQueueScanAllSchemaRepository,
    NftQueueSchemaRepository,
    NftsSchemaRepository,
    ProjectQueueSchemaRepository,
    ProjectsSchemaRepository,
    ProjectWhitelistQueuesRepository,
    PurchaseEventSchemaRepository,
    RewardQueueSchemaRepository,
    ScannedBlocksSchemaRepository,
    StakingEventSchemaRepository, TmpDataRepository,
    UnListEventSchemaRepository,
    WithdrawEventSchemaRepository
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
    RequestGetAllCollectionsBody,
    ReqGetAllCollectionsType,
    RequestUpdateCollectionEmailBody,
    ReqUpdateCollectionEmailType,
    TraitFilters,
    ReqReportNFTType,
    RequestReportNFTBody,
    RequestGetPhaseInfoBody,
    ReqGetPhaseInfoType,
    ReqCreateBlackListType,
    RequestCreateBlackListBody,
    ReqGetProjectByAdressType,
    RequestGetProjectByAdressBody,
    RequestUpdateConfigBody,
    ReqUpdateConfigType,
    RequestTriggerRewardsBody,
    ReqTriggerRewardsType,
    RequestResetAllQueueBody,
    ReqResetAllQueueType,
    RequestCheckingImagesAndJsonBody,
    ReqCheckingImagesAndJsonType,
    ReqGetAllBidsQueueType,
    RequestGetAllBidsQueueBody,
    ReqAdUpdateCollectionType,
    RequestAdUpdateCollectionBody,
    ReqAdGetListMinterType,
    RequestAdGetListMinterBody,
    ReqGetBidByCollectionType,
    RequestGetBidByCollectionBody,
    ReqGetLaunchpadMintingEventType,
    RequestGetLaunchpadMintingEventBody,
    ReqGetListOwnerNftType,
    RequestGetListOwnerNftBody,
    ReqGetNFTsByAttributeValueType,
    RequestGetNFTsByAttributeValueBody,
    ReqGetCollectionGroupByAddressType, RequestGetCollectionGroupByAddressBody,
} from "../utils/Message";
import { MESSAGE, STATUS} from "../utils/constant";
import {
    getFile, isAzEnabled,
    isValidAddressPolkadotAddress,
    isValidSignature,
    isValidTypeName, readOnlyGasLimit,
    send_report_telegram_message,
    send_telegram_message
} from "../utils/utils";
import * as nft721_psp34_standard_calls from "../contracts/nft721_psp34_standard_calls";
import * as collection_manager_calls from "../contracts/collection_manager_calls";
import {collection_manager} from "../contracts/collection_manager";
import * as profile_calls from "../contracts/profile_calls";
import {ContractPromise} from "@polkadot/api-contract";
import {nft721_psp34_standard} from "../contracts/nft721_psp34_standard";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {inject} from "@loopback/core";
import {profile} from "../contracts/profile";
import {
    bidwinevents,
    BlackList,
    claimrewardevents,
    collections,
    launchpadmintingevents,
    newlistevents,
    projects,
    ProjectWhitelistData,
    purchaseevents,
    unlistevents,
    withdrawevents,
    nfts,
    nftqueues,
    WhiteListPhaseData,
    WhiteListUserData, bids
} from "../models";
import {global_vars, SOCKET_STATUS} from "../cronjobs/global";
import {collectionsList, globalApi} from "../index";
import {
    check_collection_queue,
    check_new_AZ_NFTs,
    check_new_collections,
    check_NFT_queue, checkAllWhiteListQueue, scanAllNFTs, setClaimedStatus
} from "../cronjobs/actions";
import dotenv from "dotenv";
import {convertToUTCTime} from "../utils/Tools";
import {marketplace} from "../contracts/marketplace";
import * as marketplace_calls from "../contracts/marketplace_calls";
import {artzero_nft} from "../contracts/artzero_nft";
import {azero_domains_nft} from "../contracts/azero_domains_nft";
import * as artzero_nft_calls from "../contracts/artzero_nft_calls";
import {launchpad_psp34_nft_standard} from "../contracts/launchpad_psp34_nft_standard";
import * as launchpad_psp34_nft_standard_calls from "../contracts/launchpad_psp34_nft_standard_calls";
import Excel from 'exceljs';
import fs from "fs";
import path from "path";
import BN from "bn.js";
dotenv.config();

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
        @repository(ProjectWhitelistQueuesRepository)
        public projectWhitelistQueuesRepository: ProjectWhitelistQueuesRepository,
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
        @repository(BlackListRepository)
        public blackListRepository: BlackListRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
        @repository(WithdrawEventSchemaRepository)
        public withdrawEventSchemaRepository: WithdrawEventSchemaRepository,
        @repository(LaunchpadMintingEventSchemaRepository)
        public launchpadMintingEventSchemaRepository: LaunchpadMintingEventSchemaRepository,
        @repository(AzeroDomainEventRepository)
        public azeroDomainEventRepository: AzeroDomainEventRepository,
        @repository(TmpDataRepository)
        public tmpDataRepository: TmpDataRepository,
    ) {
    }

    // Ask Backend to Update Collection Data
    @post('/updateCollection')
    async updateCollection(
        @requestBody(RequestUpdateCollectionBody) req:ReqUpdateCollectionType
    ): Promise<ResponseBody | Response> {
        try {
            // @ts-ignore
            if (!req) return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NO_INPUT
            });
            let collection_address = req?.collection_address;
            if (!collection_address) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.NO_ADDRESS
                });
            }
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
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
                // @ts-ignore
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
                try {
                    await this.collectionQueueSchemaRepository.create({
                        type: "update",
                        nftContractAddress: collection_address,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                // TODO: Trigger to jobs
                if ((global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) {
                    global_vars.is_check_new_collections = false;
                    global_vars.is_check_collection_queue = false;
                    try {
                        await check_new_collections(
                            this.collectionsSchemaRepository,
                            this.nfTsSchemaRepository
                        );
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                    try {
                        await check_collection_queue(
                            this.collectionsSchemaRepository,
                            this.collectionQueueSchemaRepository,
                            this.nfTsSchemaRepository,
                            this.imageRemoveQueueSchemaRepository
                        );
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                }
                // @ts-ignore
                return this.response.send({
                    status: STATUS.OK,
                    message: MESSAGE.SUCCESS
                });
            } else {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    ret: "",
                    message: "Duplicated Address",
                    data: []
                });
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Ask Backend to Update Project Data
    @post('/updateProject')
    async updateProject(
        @requestBody(RequestUpdateProjectBody) req:ReqUpdateProjectType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.NO_INPUT
                });
            }
            let project_address = req?.project_address;
            if (!project_address) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.NO_ADDRESS
                });
            }
            if (!isValidAddressPolkadotAddress(project_address)) {
                // @ts-ignore
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
                // @ts-ignore
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
                try {
                    await this.projectQueueSchemaRepository.create(
                        {
                            type: "update",
                            nftContractAddress: project_address,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        }
                    );
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                try {
                    await this.projectWhitelistQueuesRepository.create(
                        {
                            type: "update",
                            nftContractAddress: project_address,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        }
                    );
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                try {
                    if ((global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) {
                        checkAllWhiteListQueue(
                            globalApi,
                            this.projectsSchemaRepository,
                            this.projectWhitelistQueuesRepository,
                            global_vars.caller,
                            project_address
                        );
                    }
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                // @ts-ignore
                return this.response.send({
                    status: STATUS.OK,
                    message: MESSAGE.SUCCESS
                });
            } else {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.DUPLICATED_ADDRESS,
                });
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Add new minting event
    @post('/newMintingEvent')
    async newMintingEvent(
        @requestBody(RequestNewMintingEventBody) req:ReqNewMintingEventType
    ): Promise<ResponseBody | Response> {
        try {
            // @ts-ignore
            if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            let nftContractAddress = req?.project;
            let minter = req?.minter;
            let phaseId = req?.phase_id;
            let mintAmount = req?.mint_amount;
            let price = req?.price;
            let projectMintFee = req?.project_mint_fee;
            if (!nftContractAddress || !minter) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
            }
            if (
                !isValidAddressPolkadotAddress(nftContractAddress) ||
                !isValidAddressPolkadotAddress(minter)
            ) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            try {
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
            } catch (e) {
                console.log(`ERROR: ${e.message}`);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get total volume
    @get('/getTotalVolume')
    async getTotalVolume(): Promise<ResponseBody | Response> {
        try {
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
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                ret: total,
                message: MESSAGE.SUCCESS,
                data: []
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Ask Backend to Update NFT Data
    @post('/updateNFT')
    async updateNFT(
        @requestBody(RequestUpdateNftBody) req:ReqUpdateNftType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req?.collection_address;
            let tokenID = req?.token_id;
            let azDomainName = req?.azDomainName;
            if (!collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
            }
            const azChecking = isAzEnabled(collection_address);
            if (azChecking.isAzDomain) {
                if (!azChecking.isEnabled) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS_INACTIVE});
                }
                if (!azDomainName) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_DOMAIN_NAME});
                }
            } else {
                if (!tokenID || tokenID < 0) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_TOKEN_ID});
                }
            }
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address
                }
            });
            if (!collection_data) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
            }
            let queue_data: any;
             if (azChecking.isAzDomain) {
                 queue_data = await this.nftQueueSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                    azDomainName: azDomainName
                }
                 });
             } else {
                queue_data = await this.nftQueueSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                    tokenID: tokenID
                }
                });
             }
            if (!queue_data) {
                let newNftQueue: nftqueues | undefined = undefined;
                try {
                    const azChecking = isAzEnabled(collection_address);
                    if (azChecking.isAzDomain) {
                        if (azChecking.isEnabled) {
                            newNftQueue = await this.nftQueueSchemaRepository.create({
                                type: "update",
                                nftContractAddress: collection_address,
                                azDomainName: azDomainName,
                                azEventName: "Register",
                                isAzDomain: true,
                                createdTime: new Date(),
                                updatedTime: new Date()
                            });
                        }
                    } else {
                        newNftQueue = await this.nftQueueSchemaRepository.create({
                            type: "update",
                            nftContractAddress: collection_address,
                            tokenID: tokenID,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    }
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                // TODO: Trigger to jobs
                if (newNftQueue) {
                    if ((global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) {
                        global_vars.is_check_NFT_queue = false;
                        global_vars.is_check_new_AZ_NFT = false;
                        try {
                            check_NFT_queue(
                                globalApi,
                                this.nfTsSchemaRepository,
                                this.nftQueueSchemaRepository,
                                this.collectionsSchemaRepository,
                                this.blackListRepository,
                                this.azeroDomainEventRepository,
                                newNftQueue
                            );
                        } catch (e) {
                            console.log(`ERROR: ${e.message}`);
                        }
                        try {
                            check_new_AZ_NFTs(
                                this.nfTsSchemaRepository,
                                this.nftQueueSchemaRepository
                            );
                        } catch (e) {
                            console.log(`ERROR: ${e.message}`);
                        }
                    }
                }
                // @ts-ignore
                return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.DUPLICATED_RECORD,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Ask Backend to Update Bids Data
    @post('/updateBids')
    async updateBids(
        @requestBody(RequestUpdateBidsBody) req:ReqUpdateBidsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req?.collection_address;
            let seller = req?.seller;
            let tokenID = req?.token_id;
            let azDomainName = req?.azDomainName;
            if (!collection_address || !seller) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
            }
            const azChecking = isAzEnabled(collection_address);
            if (azChecking.isAzDomain) {
                if (!azChecking.isEnabled) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS_INACTIVE});
                }
                if (!azDomainName) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_DOMAIN_NAME});
                }
            } else {
                if (!tokenID || tokenID < 0) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_TOKEN_ID});
                }
            }
            if (
                !isValidAddressPolkadotAddress(collection_address) ||
                !isValidAddressPolkadotAddress(seller)
            ) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            if (!collection_data) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
                });
            }
            if (azChecking.isAzDomain) {
                if (!azChecking.isEnabled) {
                    return this.response.send({
                        status: STATUS.FAILED,
                        message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
                    });
                }
                try {
                    const currentData = await this.bidQueueSchemaRepository.findOne({
                        where: {
                            nftContractAddress: collection_address,
                            azDomainName: azDomainName,
                            isAzDomain: true,
                            seller: seller,
                        }
                    });
                    if (!currentData) {
                        await this.bidQueueSchemaRepository.create({
                            nftContractAddress: collection_address,
                            azDomainName: azDomainName,
                            isAzDomain: true,
                            seller: seller,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } else {
                        await this.bidQueueSchemaRepository.updateById(currentData._id, {
                            nftContractAddress: collection_address,
                            azDomainName: azDomainName,
                            isAzDomain: true,
                            seller: seller,
                            updatedTime: new Date()
                        });
                    }
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                // @ts-ignore
                return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
            } else {
                let queue_data = await this.bidQueueSchemaRepository.findOne({
                    where: {
                        nftContractAddress: collection_address,
                        tokenID: tokenID,
                        seller: seller,
                    }
                });
                if (!queue_data) {
                    try {
                        const currentData = await this.bidQueueSchemaRepository.findOne({
                            where: {
                                nftContractAddress: collection_address,
                                tokenID: tokenID,
                                seller: seller,
                            }
                        });
                        if (!currentData) {
                            await this.bidQueueSchemaRepository.create({
                                nftContractAddress: collection_address,
                                tokenID: tokenID,
                                seller: seller,
                                createdTime: new Date(),
                                updatedTime: new Date()
                            });
                        } else {
                            await this.bidQueueSchemaRepository.updateById(currentData._id, {
                                nftContractAddress: collection_address,
                                tokenID: tokenID,
                                seller: seller,
                                updatedTime: new Date()
                            });
                        }
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                    // @ts-ignore
                    return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
                }
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.DUPLICATED_RECORD,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Bids from DB by Bidder Address
    @post('/getBidsByBidderAddress')
    async getBidsByBidderAddress(
        @requestBody(RequestGetBidsByBidderAddressBody) req:ReqGetBidsByBidderAddressType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let bidder = req?.bidder;
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            const order = (req?.sort && req?.sort == 1) ? "bid_date ASC" : "bid_date DESC";
            if (!bidder) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_ADDRESS});
            }
            if (!isValidAddressPolkadotAddress(bidder)) {
                // @ts-ignore
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
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS,
                ret: data
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Ask Backend to cache an Image
    @post('/cacheImage')
    async cacheImage(
        @requestBody(RequestCacheImageBody) req:ReqCacheImageType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
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
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            if (!imageType) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_IMAGE_TYPE});
            }
            if (!metadata) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_METADATA});
            }
            input = input.replace("ipfs://", "/ipfs/");
            let input_data = await this.imagesSchemaRepository.findOne({
                where: {
                    input: input
                }
            });
            if (input_data) {
                if (is1024 && input_data.location1024 != "") {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
                }
                if (is1440 && input_data.location1440 != "") {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
                }
                if (is1920 && input_data.location1920 != "") {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
                }
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
                try {
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
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                // @ts-ignore
                return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.DUPLICATED_RECORD
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Ask Backend to cache an Image
    @post('/cacheImages')
    async cacheImages(
        @requestBody(RequestCacheImagesBody) req:ReqCacheImagesType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.images) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let images = JSON.parse(req.images);
            console.log('Images Request: ', req.images);
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
                                            try {
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
                                            } catch (e) {
                                                console.log(`ERROR: ${e.message}`);
                                            }
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
                                        try {
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
                                        } catch (e) {
                                            console.log(`ERROR: ${e.message}`);
                                        }
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
                                            try {
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
                                            } catch (e) {
                                                console.log(`ERROR: ${e.message}`);
                                            }
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
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_IMAGES});
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Ask Backend to cache an JSON
    @post('/cacheJSON')
    async cacheJSON(
        @requestBody(RequestCacheJSONBody) req:ReqCacheJSONType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let input = req?.input;
            if (!input) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            input = input.replace("ipfs://", "/ipfs/");
            let input_data = await this.jsonSchemaRepository.findOne({
                where: {
                    input: input
                }
            });
            if (input_data) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INPUT_ALREADY_EXIST});
            }
            let queue_data = await this.jsonQueueSchemaRepository.findOne({
                where: {
                    input: input
                }
            });
            if (!queue_data) {
                try {
                    await this.jsonQueueSchemaRepository.create({
                        input: input,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
                // @ts-ignore
                return this.response.send({status: STATUS.OK, message: MESSAGE.SUCCESS});
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.DUPLICATED_RECORD,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get JSON Cache
    @get('/getJSON')
    @oas.response.file?.()
    async getJSON(
        @param.query.string('input') input?: string
    ): Promise<Response | ResponseBody | void> {
        try {
            if (!input) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT
                });
            }
            input = input.replace("ipfs://", "/ipfs/");
            let input_data = await this.jsonSchemaRepository.findOne({
                where: {
                    input: input
                }
            });
            if (!input_data) {
                return {status: STATUS.FAILED, message: MESSAGE.JSON_NOT_EXIST};
            } else if (input_data?.location) {
                return getFile(input_data.location, this.response);
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
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
        try {
            if (!url) url = "";
            if (!input) {
                // @ts-ignore
                return this.response.send(url);
            }
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
                    try {
                        await this.imageQueueSchemaRepository.create({
                            input: input,
                            is500: true,
                            is100: true,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                }
                // @ts-ignore
                return this.response.send(url);
            }
            if (size == 100) {
                try {
                    if (input_data.isCloudFlare) {
                        // @ts-ignore
                        return this.response.send(input_data.location100);
                    } else {
                        if (input_data.location100) {
                            console.log({location100: input_data.location100});
                            return getFile(input_data.location100, this.response);
                        }
                    }
                } catch (e) {
                    send_telegram_message("getImage 100 - " + e.message);
                    await this.imagesSchemaRepository.deleteAll({
                        input: input
                    });
                    try {
                        await this.imageQueueSchemaRepository.create({
                            input: input,
                            is500: true,
                            is100: true,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                }
            } else if (size == 500) {
                try {
                    if (input_data.isCloudFlare) {
                        // @ts-ignore
                        return this.response.send(input_data.location500);
                    } else {
                        if (input_data.location500) {
                            console.log({location500: input_data.location500});
                            return getFile(input_data.location500, this.response);
                        }
                    }
                } catch (e) {
                    send_telegram_message("getImage 500 - " + e.message);
                    await this.imagesSchemaRepository.deleteAll({
                        input: input
                    });
                    try {
                        await this.imageQueueSchemaRepository.create({
                            input: input,
                            is500: true,
                            is100: true,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                }
            } else if (size == 1024) {
                if (input_data.location1024 != "") {
                    try {
                        if (input_data.isCloudFlare) {
                            // @ts-ignore
                            return this.response.send(input_data.location1024);
                        } else {
                            if (input_data.location1024) {
                                console.log({location1024: input_data.location1024});
                                return getFile(input_data.location1024, this.response);
                            }
                        }
                    } catch (e) {
                        send_telegram_message("getImage 1024 - " + e.message);
                        await this.imagesSchemaRepository.deleteAll({
                            input: input
                        });
                        try {
                            await this.imageQueueSchemaRepository.create({
                                input: input,
                                is1024: true,
                                createdTime: new Date(),
                                updatedTime: new Date()
                            });
                        } catch (e) {
                            console.log(`ERROR: ${e.message}`);
                        }
                    }
                } else {
                    // @ts-ignore
                    return this.response.send(url);
                }
            } else if (size == 1440) {
                if (input_data.location1440 != "") {
                    try {
                        if (input_data.isCloudFlare) {
                            // @ts-ignore
                            return this.response.send(input_data.location1440);
                        } else {
                            if (input_data.location1440) {
                                console.log({location1440: input_data.location1440});
                                return getFile(input_data.location1440, this.response);
                            }
                        }

                    } catch (e) {
                        send_telegram_message("getImage 1440 - " + e.message);
                        await this.imagesSchemaRepository.deleteAll({
                            input: input
                        });
                        try {
                            await this.imageQueueSchemaRepository.create({
                                input: input,
                                is1440: true,
                                createdTime: new Date(),
                                updatedTime: new Date()
                            });
                        } catch (e) {
                            console.log(`ERROR: ${e.message}`);
                        }
                    }
                } else {
                    // @ts-ignore
                    return this.response.send(url);
                }
            } else if (size == 1920) {
                if (input_data.location1920 != "") {
                    try {
                        if (input_data.isCloudFlare) {
                            // @ts-ignore
                            return this.response.send(input_data.location1920);
                        } else {
                            if (input_data.location1920) {
                                console.log({location1920: input_data.location1920});
                                return getFile(input_data.location1920, this.response);
                            }
                        }
                    } catch (e) {
                        send_telegram_message("getImage 1920 - " + e.message);
                        await this.imagesSchemaRepository.deleteAll({
                            input: input
                        });
                        try {
                            await this.imageQueueSchemaRepository.create({
                                input: input,
                                is1920: true,
                                createdTime: new Date(),
                                updatedTime: new Date()
                            });
                        } catch (e) {
                            console.log(`ERROR: ${e.message}`);
                        }
                    }
                } else {
                    // @ts-ignore
                    return this.response.send(url);
                }
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collection Contract Address
    @get('/getCollectionContract')
    async getCollectionContract(
        @requestBody(RequestGetCollectionContractBody) req:ReqGetCollectionContractType
    ): Promise<ResponseBody | Response> {
        try {
            // @ts-ignore
            const host = this.request.headers.host;
            // @ts-ignore
            const origin = this.request.headers.origin;
            // @ts-ignore
            const userIP = this.request.socket.remoteAddress;
            // @ts-ignore
            console.log(this.request.headers);
            console.log(`userIP: ${userIP}`);
            console.log(`host: ${host}`);
            console.log(`origin: ${origin}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                ret: collection_manager.CONTRACT_ADDRESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get total Collections in Database
    @get('/getCollectionCount')
    async getCollectionCount(): Promise<ResponseBody | Response> {
        try {
            const collection_count_db = await this.collectionsSchemaRepository.count({
                isActive: true,
                nft_count: {gt: 0},
            });
            // @ts-ignore
            return this.response.send({status: "OK", ret: collection_count_db.count});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get featured Collections
    @get('/getFeaturedCollections')
    async getFeaturedCollections(): Promise<ResponseBody | Response> {
        try {
            let ret: string[] = [];
            if (process.env.LIST_FEATURED_COLLECTIONS) {
                const listFeaturedCollections = process.env.LIST_FEATURED_COLLECTIONS.split(',');
                listFeaturedCollections.map((item) => {
                    ret.push(item);
                });
            }
            // @ts-ignore
            return this.response.send({
                status: "OK",
                ret: ret,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collections using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getCollections')
    async getCollections(
        @requestBody(RequestGetCollectionsBody) req:ReqGetCollectionsType
    ): Promise<ResponseBody | Response> {
        try {
            // @ts-ignore
            if (!req) return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            let limit = req?.limit;
            let offset = req?.offset;
            let isActive = req?.isActive;
            let ignoreNoNFT = req?.ignoreNoNFT;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (isActive == null) isActive = true;
            let data: any[] = [];
            const order = (req?.sort && req?.sort == 1) ? "index ASC" : "index DESC";
            try {
                if (!ignoreNoNFT) {
                    const condition = {
                        isActive: isActive,
                        nft_count: {gt: 0},
                    };
                    data = await this.collectionsSchemaRepository.find({
                        where: condition,
                        skip: offset,
                        order: [order],
                        limit: limit
                    });
                } else {
                    const condition = {
                        isActive: isActive,
                    };
                    data = await this.collectionsSchemaRepository.find({
                        where: condition,
                        skip: offset,
                        limit: limit,
                        order: [order]
                    });
                }
            } catch (e) {
                console.log({error: e});
            }
            console.log({data: data.length});
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get All Collections using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getAllCollections')
    async getAllCollections(
        @requestBody(RequestGetAllCollectionsBody) req:ReqGetAllCollectionsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let isActive:boolean | undefined = req?.isActive;
            let ignoreNoNFT = req?.ignoreNoNFT;
            if (!limit) limit = 10;
            if (!offset) offset = 0;
            let data: collections[] = [];
            let condition = {};
            if (isActive != undefined) {
                condition = {
                    isActive,
                    nft_count: {gt: 0},
                };
            }
            if (!ignoreNoNFT) {
                condition = {
                    ...condition,
                    nft_count: {gt: 0},
                };
            }
            const order = (req?.sort && req?.sort == 1) ? "index ASC" : "index DESC";
            try {
                data = await this.collectionsSchemaRepository.find({
                    where: condition,
                    skip: offset,
                    limit: limit,
                    order: [order]
                });
            } catch (e) {
                console.log({error: e});
            }
            console.log({data: data.length});
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get All Collections using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/updateCollectionEmail')
    async updateCollectionEmail(
        @requestBody(RequestUpdateCollectionEmailBody) req:ReqUpdateCollectionEmailType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            let email = req.email;
            const emailRegexp =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!email || !emailRegexp.test(email)) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_EMAIL_FORMAT,
                });
            }
            if (!collection_address) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_ADDRESS,
                });
            }
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_COLLECTION_ADDRESS,
                });
            }
            let foundDoc = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            if (!foundDoc) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
                });
            }
            try {
                await this.collectionsSchemaRepository.updateById(foundDoc._id, {
                    email: email
                });
            } catch (e) {
                console.log(`ERROR: ${e.message}`);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collections using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getProjects')
    async getProjects(
        @requestBody(RequestGetProjectsBody) req:ReqGetProjectsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let isActive = req?.isActive;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (isActive == null) isActive = true;
            let data: projects[];
            const order = (req?.sort && req?.sort == 1) ? "index ASC" : "index DESC";
            data = await this.projectsSchemaRepository.find({
                where: {
                    isActive: isActive
                },
                skip: offset,
                limit: limit,
                order: [order]
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collections By Volume using offset and limit sort = 1 --> asc sort = -1 -> des
    @post('/getCollectionsByVolume')
    async getCollectionsByVolume(
        @requestBody(RequestGetCollectionsByVolumeBody) req:ReqGetCollectionsByVolumeType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
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
            const order = (req?.sort && req?.sort == 1) ? "volume ASC" : "volume DESC";
            let data = await this.collectionsSchemaRepository.find({
                where: option,
                skip: offset,
                limit: limit,
                order: [order]
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collection Information by ID
    @post('/getCollectionByID')
    async getCollectionByID(
        @requestBody(RequestGetCollectionByIDBody) req:ReqGetCollectionByIDType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let id = req?.id;
            if (!id) id = 1;
            let data = await this.collectionsSchemaRepository.find({
                where: {
                    index: id
                }
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collections by Collection Owner
    @post('/getCollectionsByOwner')
    async getCollectionsByOwner(
        @requestBody(RequestGetCollectionsByOwnerBody) req:ReqGetCollectionsByOwnerType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let owner = req?.owner;
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!owner) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "index ASC" : "index DESC";
            let data = await this.collectionsSchemaRepository.find({
                where: {
                    collectionOwner: owner
                },
                skip: offset,
                limit: limit,
                order: [order]
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Count Number of Collections by Collection Owner
    @post('/countCollectionsByOwner')
    async countCollectionsByOwner(
        @requestBody(RequestCountCollectionsByOwnerBody) req:ReqCountCollectionsByOwnerType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let owner = req?.owner;
            let includeNoneNFT = req?.noNFT;
            if (!includeNoneNFT) includeNoneNFT = false;
            if (!owner) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            if (includeNoneNFT) {
                let data = await this.collectionsSchemaRepository.count({
                    collectionOwner: owner
                });
                console.log({data: data});
                // @ts-ignore
                return this.response.send({status: STATUS.OK, ret: data.count});
            } else {
                let data = await this.collectionsSchemaRepository.count({
                    collectionOwner: owner,
                    nft_count: {gt: 0},
                });
                // @ts-ignore
                return this.response.send({status: STATUS.OK, ret: data.count});
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Collection Information by NFT Contract address
    @post('/getCollectionByAddress')
    async getCollectionByAddress(
        @requestBody(RequestGetCollectionByAddressBody) req:ReqGetCollectionByAddressType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            // console.log({collection_data: collection_data});
            if (!collection_data) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
            }
            let data = await this.collectionsSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Floor Price of a Collection
    @post('/getFloorPrice')
    async getFloorPrice(
        @requestBody(RequestGetFloorPriceBody) req:ReqGetFloorPriceType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                    isActive: true,
                }
            });
            if (!collection_data) {
                // @ts-ignore
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
                order: ["price ASC"],  // price ASC
                limit: 1
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get NFT List
    @post('/getNFTs')
    async getNFTs(
        @requestBody(RequestGetNFTsBody) req:ReqGetNFTsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            if (!collection_data) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/getListedNFTs')
    async getListedNFTs(
        @requestBody(RequestGetListedNFTsBody) req:ReqGetListedNFTsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            if (!collection_data) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                    is_for_sale: true,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/getUnlistedNFTs')
    async getUnlistedNFTs(
        @requestBody(RequestGetUnlistedNFTsBody) req:ReqGetUnlistedNFTsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let collection_data = await this.collectionsSchemaRepository.findOne({
                where: {
                    nftContractAddress: collection_address,
                }
            });
            if (!collection_data) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                    is_for_sale: false,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get NFT Information by ID
    @post('/getNFTByID')
    async getNFTByID(
        @requestBody(RequestGetNFTByIDBody) req:ReqGetNFTByIDType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req.collection_address;
            if (!isValidAddressPolkadotAddress(collection_address)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            const azChecking = isAzEnabled(collection_address);
            if (azChecking.isAzDomain) {
                if (!azChecking.isEnabled) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS_INACTIVE});
                }
                let azDomainName = req?.azDomainName;
                if (!azDomainName) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_DOMAIN_NAME});
                }
                let collection_data = await this.collectionsSchemaRepository.findOne({
                    where: {
                        nftContractAddress: collection_address,
                    }
                });
                if (!collection_data) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
                }
                let data = await this.nfTsSchemaRepository.find({
                    where: {
                        nftContractAddress: collection_address,
                        azDomainName: azDomainName,
                        isAzDomain: true
                    }
                });
                // @ts-ignore
                return this.response.send({status: STATUS.OK, ret: data});
            } else {
                let tokenID = req?.token_id;
                if (!tokenID || tokenID < 0) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_TOKEN_ID});
                }
                let collection_data = await this.collectionsSchemaRepository.findOne({
                    where: {
                        nftContractAddress: collection_address,
                    }
                });
                if (!collection_data) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
                }
                let data = await this.nfTsSchemaRepository.find({
                    where: {
                        nftContractAddress: collection_address,
                        tokenID: tokenID,
                    }
                });
                // @ts-ignore
                return this.response.send({status: STATUS.OK, ret: data});
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get NFTs by  Owner
    @post('/getNFTsByOwner')
    async getNFTsByOwner(
        @requestBody(RequestGetNFTsByOwnerBody) req:ReqGetNFTsByOwnerType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let owner = req?.owner;
            let limit = req?.limit;
            let offset = req?.offset;
            let sort = req?.sort;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!sort) sort = -1;
            if (!owner) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    is_for_sale: false,
                    owner: owner,
                    nftContractAddress: {nin: ['5EKDyn7uy1jVQnAhsCz2ySrR5g89nvTYreoMHCMAKb9C5rQn', '5HfQopC1yQSoG83auWgRLTxhWWFxiVQWT74LLXeXMLJDFBvP']}
                },
                order: [order],
                skip: offset,
                limit: limit
            });
            let data1 = await this.nfTsSchemaRepository.find({
                where: {
                    is_for_sale: true,
                    nft_owner: owner,
                    nftContractAddress: {nin: ['5EKDyn7uy1jVQnAhsCz2ySrR5g89nvTYreoMHCMAKb9C5rQn', '5HfQopC1yQSoG83auWgRLTxhWWFxiVQWT74LLXeXMLJDFBvP']}
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: result});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get NFTs by  Owner and Collection
    @post('/getNFTsByOwnerAndCollection')
    async getNFTsByOwnerAndCollection(
        @requestBody(RequestGetNFTsByOwnerAndCollectionBody) req:ReqGetNFTsByOwnerAndCollectionType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let owner = req?.owner;
            let collection_address = req?.collection_address;
            let limit = req?.limit;
            let offset = req?.offset;
            let sort = req?.sort;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!sort) sort = -1;
            if (!owner || !collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: result});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get NFTs by  Owner and Collection
    @post('/getNFTsByAttributeValue')
    async getNFTsByAttributeValue(
        @requestBody(RequestGetNFTsByAttributeValueBody) req:ReqGetNFTsByAttributeValueType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let expiration_timestamp = req?.expiration_timestamp;
            let collection_address = req?.collection_address;
            let limit = req?.limit;
            let offset = req?.offset;
            let sort = req?.sort;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!sort) sort = -1;
            if (!expiration_timestamp || !collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            // const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
            // let data = await this.nfTsSchemaRepository.find({
            //     where: {
            //         attributesValue: expiration_timestamp as PredicateComparison<string[]>,
            //         nftContractAddress: collection_address,
            //     },
            //     order: [order],
            //     skip: offset,
            //     limit: limit
            // });
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
            });
            const checkTimestamp = parseInt(expiration_timestamp);
            let ret = [];
            for (const item of data) {
                if (
                    checkTimestamp
                    && item.attributesValue
                    && item.attributesValue.length == 2
                ) {
                    const timeEnd = parseInt(item.attributesValue[1]);
                    if (checkTimestamp > timeEnd) {
                        ret.push(item);
                    }
                }
            }
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: ret});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get NFTs by Collection Address
    @post('/getNFTsByCollectionAddress')
    async getNFTsByCollectionAddress(
        @requestBody(RequestGetNFTsByCollectionAddressBody) req:ReqGetNFTsByCollectionAddressType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let collection_address = req?.collection_address;
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            if (!collection_address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            const order = (req?.sort && req?.sort == 1) ? "tokenID ASC" : "tokenID DESC";
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    nftContractAddress: collection_address,
                },
                order: [order],
                skip: offset,
                limit: limit
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get recently listed NFTs Event
    @post('/getNewListEvents')
    async getNewListEvents(
        @requestBody(RequestGetNewListEventsBody) req:ReqGetNewListEventsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let collection_address = req?.collection_address;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            let data: newlistevents[];
            const order = (req?.sort && req?.sort == 1) ? "blockNumber ASC" : "blockNumber DESC";
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get recently unlisted NFTs Event
    @post('/getUnlistEvents')
    async getUnlistEvents(
        @requestBody(RequestGetUnlistEventsBody) req:ReqGetUnlistEventsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let collection_address = req?.collection_address;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            let data: unlistevents[];
            const order = (req?.sort && req?.sort == 1) ? "blockNumber ASC" : "blockNumber DESC";
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get recently trade Event
    @post('/getPurchaseEvents')
    async getPurchaseEvents(
        @requestBody(RequestGetPurchaseEventsBody) req:ReqGetPurchaseEventsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let collection_address = req?.collection_address;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            let data: purchaseevents[];
            const order = (req?.sort && req?.sort == 1) ? "blockNumber ASC" : "blockNumber DESC";
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get recently accepted bids Event
    @post('/getBidWinEvents')
    async getBidWinEvents(
        @requestBody(RequestGetBidWinEventsBody) req:ReqGetBidWinEventsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let collection_address = req?.collection_address;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            let data: bidwinevents[];
            const order = (req?.sort && req?.sort == 1) ? "blockNumber ASC" : "blockNumber DESC";
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Search Collection
    @post('/searchCollections')
    async searchCollections(
        @requestBody(RequestSearchCollectionsBody) req:ReqSearchCollectionsType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let keywords = req?.keywords;
            let limit = req?.limit;
            let isActive = req?.isActive;
            let ignoreNoNFT = req?.ignoreNoNFT;
            if (!limit) limit = 15;
            if (isActive == null) isActive = true;
            let data: collections[];
            // const pattern = new RegExp('^' + keywords + '.*', "i");
            let paramTmp = {};
            if (isActive) {
                paramTmp = {
                    ...paramTmp,
                    isActive: isActive
                };
            }
            if (keywords) {
                paramTmp = {
                    ...paramTmp,
                    name: {like: `${keywords}`, options: "i" }
                };
            }
            if (!ignoreNoNFT) {
                paramTmp = {
                    ...paramTmp,
                    nft_count: {gt: 0}
                };
                data = await this.collectionsSchemaRepository.find({
                    // where: {
                    //     isActive: isActive,
                    //     nft_count: {gt: 0},
                    //     name: {regexp: pattern},
                    // },
                    where: paramTmp,
                    limit: limit
                });
            } else {
                data = await this.collectionsSchemaRepository.find({
                    // where: {
                    //     isActive: isActive,
                    //     name: {regexp: pattern},
                    // },
                    where: paramTmp,
                    limit: limit
                });
            }
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/getOwnershipHistory')
    async getOwnershipHistory(
        @requestBody(RequestGetOwnershipHistoryBody) req:ReqGetOwnershipHistoryType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let owner = req?.owner;
            let collection_address = req?.collection_address;
            const azChecking = isAzEnabled(collection_address);
            if (azChecking.isAzDomain) {
                if (!azChecking.isEnabled) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS_INACTIVE});
                }
                let azDomainName = req?.azDomainName;
                if (!collection_address || !azDomainName || !owner) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_INPUT});
                }
                let bid_win = await this.bidWinEventSchemaRepository.find({
                    where: {
                        nftContractAddress: collection_address,
                        azDomainName: azDomainName,
                        // isAzDomain: true
                    }
                });
                let purchase = await this.purchaseEventSchemaRepository.find({
                    where: {
                        nftContractAddress: collection_address,
                        azDomainName: azDomainName,
                        // isAzDomain: true
                    }
                });
                let list = await this.newListEventSchemaRepository.find({
                    where: {
                        nftContractAddress: collection_address,
                        azDomainName: azDomainName,
                        // isAzDomain: true
                    }
                });
                let unList = await this.unListEventSchemaRepository.find({
                    where: {
                        nftContractAddress: collection_address,
                        azDomainName: azDomainName,
                        // isAzDomain: true
                    }
                });
                let result = bid_win.concat(purchase).concat(list).concat(unList);
                result = result.sort(function (a: any, b: any) {
                    return parseInt(b.blockNumber) - parseInt(a.blockNumber);
                });
                // @ts-ignore
                return this.response.send({status: STATUS.OK, ret: result});
            } else {
                let tokenID = req?.token_id;
                if (!collection_address || !tokenID || tokenID < 0 || !owner) {
                    // @ts-ignore
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
                // @ts-ignore
                return this.response.send({status: STATUS.OK, ret: result});
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Search NFT of Collection by traits
    @post('/searchNFTOfCollectionByTraits')
    async searchNFTOfCollectionByTraits(
        @requestBody(RequestSearchNFTOfCollectionByTraitsBody) req:ReqSearchNFTOfCollectionByTraitsType
    ): Promise<ResponseBody | Response> {
        try {
            // console.log(req);
            if (!req || !req.collectionAddress) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let params:TraitFilters | undefined = (req.traitFilters) ? JSON.parse(req.traitFilters) : undefined;
            let limit = req?.limit || 24;
            let offset = req?.offset || 0;
            let collectionAddress = req.collectionAddress;
            if (!isValidAddressPolkadotAddress(collectionAddress)) {
                // @ts-ignore
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
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
                });
            }
            ret = {...ret, ...collectionInfo?.toJSON()};

            let paramTmp = {};
            if (params?.price) {
                paramTmp = {...paramTmp, price: params.price};
            }
            if (params && params?.is_for_sale != undefined) {
                paramTmp = {...paramTmp, is_for_sale: params.is_for_sale};
            }
            if (params?.and) {
                paramTmp = {...paramTmp, and: params.and};
            }
            if (params?.keyword) {
                paramTmp = {...paramTmp, nftName: {like: `${params.keyword}`, options: "i" }};
            }
            if (collectionAddress == azero_domains_nft.CONTRACT_ADDRESS) {
                paramTmp = {...paramTmp, expiration_timestamp: {gt: Date.now()}};
            }

            const filterData = {
                nftContractAddress: collectionAddress,
                ...paramTmp
            };
            let order:string[] = ["tokenID ASC"];
            if (req?.sort) {
                if (params && params.is_for_sale) {
                    if (req.sort == 1) {
                        order = ["price DESC", "_id DESC"];
                    } else if (req.sort == 2) {
                        order = ["price ASC", "_id DESC"];
                    } else if (req.sort == 3) {
                        order = ["listed_date DESC", "_id DESC"];
                    }
                } else {
                    if ((req.sort == 1)) {
                        order = ["tokenID DESC"];
                    } else if ((req.sort == 2)) {
                        order = ["tokenID ASC"];
                    }
                }
            }
            let filterObject = {
                where: filterData,
                order: order,
                skip: offset,
                limit: limit
            };
            // console.log(filterObject);
            const data = await this.nfTsSchemaRepository.find(filterObject);
            const countNft = await this.nfTsSchemaRepository.count(filterData);
            const precheck = data.map((item) => ({
                nftName: item.nftName,
                price: item.price,
                listed_date: item.listed_date,
                tokenID: item.tokenID
            }));

            ret.result = {
                NFTList: data,
                totalResults: countNft.count,
                precheck: precheck
            };
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Add Reward History
    @post('/getAddRewardHistory')
    async getAddRewardHistory(
        @requestBody(RequestGetAddRewardHistoryBody) req:ReqGetAddRewardHistoryType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            const order = (req?.sort && req?.sort == 1) ? "blockNumber ASC" : "blockNumber DESC";
            let data = await this.addRewardEventSchemaRepository.find({
                where: {},
                order: [order],
                skip: offset,
                limit: limit
            });
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    // Get Reward Claim History by Account, if stake's_address not provided, show all
    @post('/getClaimRewardHistory')
    async getClaimRewardHistory(
        @requestBody(RequestGetClaimRewardHistoryBody) req:ReqGetClaimRewardHistoryType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            let staker_address = req?.staker_address;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            let data: claimrewardevents[];
            const order = (req?.sort && req?.sort == 1) ? "blockNumber ASC" : "blockNumber DESC";
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
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: data});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/reportNFT')
    async reportNFT(
        @requestBody(RequestReportNFTBody) req:ReqReportNFTType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.signature || !req.address) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const isValid = isValidSignature(
                MESSAGE.SIGN,
                req.signature,
                req.address
            );
            if(isValid) {
                send_report_telegram_message(`${req?.address}\nReported NFT : ${req?.nft_name} \n with message: ${req?.message} \n of collection ${req?.collection_name}\nLink: ${req?.nft_link}`);
                // @ts-ignore
                return this.response.send({status: STATUS.OK});
            } else {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED});
            }
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/getPhaseInfo')
    async getPhaseInfo(
        @requestBody(RequestGetPhaseInfoBody) req:ReqGetPhaseInfoType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.phaseId || !req.nftContractAddress) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let nftContractAddress = req.nftContractAddress;
            if (!isValidAddressPolkadotAddress(nftContractAddress)) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_NFT_ADDRESS,
                });
            }
            if (api && global_vars.caller) {
                const data = await this.projectsSchemaRepository.findOne({
                    where: {
                        nftContractAddress: nftContractAddress
                    },
                    fields: {
                        whiteList: true
                    }
                });
                let retData:ProjectWhitelistData = new ProjectWhitelistData();
                if (data && data?.whiteList) {
                    data?.whiteList.map((item:any) => {
                        if (item?.phaseId == req.phaseId) {
                            retData = item
                        }
                    });
                }
                // @ts-ignore
                return this.response.send({
                    status: STATUS.OK,
                    ret: retData,
                    message: MESSAGE.SUCCESS
                });
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.INVALID_INPUT
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @get('/api/nfts-schemas')
    @response(200, {
        description: 'Array of NfTsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(nfts, {includeRelations: true}),
                },
            },
        },
    })
    async findNfts(
        @param.filter(nfts) filter?: Filter<nfts>,
    ): Promise<nfts[]> {
        return this.nfTsSchemaRepository.find(filter);
    }

    @get('/api/collections-schemas')
    @response(200, {
        description: 'Array of CollectionsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(collections, {includeRelations: true}),
                },
            },
        },
    })
    async findCollections(
        @param.filter(collections) filter?: Filter<collections>,
    ): Promise<collections[]> {
        return this.collectionsSchemaRepository.find(filter);
    }

    @get('/api/projects-schemas')
    @response(200, {
        description: 'Array of ProjectsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(projects, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(projects) filter?: Filter<projects>,
    ): Promise<projects[]> {
        return this.projectsSchemaRepository.find(filter);
    }

    @get('/api/projects-schemas/count')
    @response(200, {
        description: 'ProjectsSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(projects) where?: Where<projects>,
    ): Promise<Count | Response> {
        const projectCountDb = await this.collectionsSchemaRepository.count(where);
        // @ts-ignore
        return this.response.send({status: "OK", ret: projectCountDb.count});
    }

    @post('/api/black-lists/createBlackList')
    async createBlackList(
        @requestBody(RequestCreateBlackListBody) req:ReqCreateBlackListType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.typeName || !req.nftContractAddress || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const nftContractAddress = req.nftContractAddress;
            const typeName = req.typeName;
            const isActive:boolean = (req?.isActive !== undefined) ? req.isActive : true;
            const userName = req?.userName;
            const password = req?.password;
            if (userName !== process.env.BLACK_LIST_USER_NAME || password !== process.env.BLACK_LIST_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            if (!isValidAddressPolkadotAddress(nftContractAddress)) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_NFT_ADDRESS,
                });
            }
            if (!isValidTypeName(typeName)) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_BLACKLIST_TYPE_NAME,
                });
            }
            let data = await this.blackListRepository.findOne({
                where: {
                    nftContractAddress: nftContractAddress,
                    typeName: typeName
                }
            });

            if (data) {
                try {
                    data.isActive = req?.isActive;
                    data.typeName = typeName;
                    data.nftContractAddress = nftContractAddress;
                    await this.blackListRepository.updateById(data._id, {
                        ...data,
                        isActive: isActive,
                        updatedTime: new Date()
                    });
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
            } else {
                try {
                    await this.blackListRepository.create({
                        nftContractAddress: nftContractAddress,
                        typeName: typeName,
                        isActive: isActive,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    })
                } catch (e) {
                    console.log(`ERROR: ${e.message}`);
                }
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @get('/api/black-lists/count')
    @response(200, {
        description: 'BlackList model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async countBlackList(
        @param.where(BlackList) where?: Where<BlackList>,
    ): Promise<Count> {
        return this.blackListRepository.count(where);
    }

    @get('/api/black-lists')
    @response(200, {
        description: 'Array of BlackList model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(BlackList, {includeRelations: true}),
                },
            },
        },
    })
    async findBlackList(
        @param.filter(BlackList) filter?: Filter<BlackList>,
    ): Promise<BlackList[]> {
        return this.blackListRepository.find(filter);
    }

    @get('/api/black-lists/{id}')
    @response(200, {
        description: 'BlackList model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(BlackList, {includeRelations: true}),
            },
        },
    })
    async findBlackListById(
        @param.path.string('id') id: string,
        @param.filter(BlackList, {exclude: 'where'}) filter?: FilterExcludingWhere<BlackList>
    ): Promise<BlackList> {
        return this.blackListRepository.findById(id, filter);
    }

    @post('/getProjectByAdress')
    async getProjectByAdress(
        @requestBody(RequestGetProjectByAdressBody) req:ReqGetProjectByAdressType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.nftContractAddress) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let nftContractAddress = req.nftContractAddress;
            console.log({nftContractAddress: nftContractAddress});
            if (!isValidAddressPolkadotAddress(nftContractAddress)) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
            }
            let projectData = await this.projectsSchemaRepository.findOne({
                where: {
                    nftContractAddress: nftContractAddress,
                }
            });
            // console.log({collection_data: projectData});
            if (!projectData) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NOT_EXIST_ADDRESS});
            }
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: projectData});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/api/config/reset-all-queue')
    async resetAllQueue(
        @requestBody(RequestResetAllQueueBody) req:ReqResetAllQueueType
    ): Promise<ResponseBody | Response> {
        const currentTime = convertToUTCTime(new Date());
        console.log("RUN resetAllQueue now: " + currentTime);
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            try {
                await this.nftQueueScanAllSchemaRepository.updateAll({
                    isProcessing: false
                }, {});
            } catch (e) {
                console.log(`ERROR: ${e.message}`);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/api/config/move-queue')
    async moveNftQueue(
        @requestBody(RequestResetAllQueueBody) req:ReqResetAllQueueType
    ): Promise<ResponseBody | Response> {
        const currentTime = convertToUTCTime(new Date());
        console.log("RUN moveNftQueu now: " + currentTime);
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            try {
                const currentNftQueue = await this.nftQueueSchemaRepository.find({});
                if (currentNftQueue && currentNftQueue.length > 0) {
                    for (const nftQueue of currentNftQueue) {
                        if (nftQueue.type === "update") {
                            const currentNftQueueAll = await this.nftQueueScanAllSchemaRepository.findOne({
                                where: {
                                    nftContractAddress: nftQueue.nftContractAddress,
                                    tokenID: nftQueue.tokenID,
                                    type: "update"
                                }
                            });
                            if (currentNftQueueAll) {
                                console.log(`deleteById: ${nftQueue.nftContractAddress} - tokenID: ${nftQueue.tokenID}`);
                                await this.nftQueueSchemaRepository.deleteById(nftQueue._id);
                            } else {
                                console.log(`create: ${nftQueue.nftContractAddress} - tokenID: ${nftQueue.tokenID}`);
                                await this.nftQueueScanAllSchemaRepository.create({
                                    nftContractAddress: nftQueue.nftContractAddress,
                                    tokenID: nftQueue.tokenID,
                                    type: "update",
                                    isProcessing: false,
                                    createdTime: new Date(),
                                    updatedTime: new Date()
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(`ERROR: ${e.message}`);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/api/config/update-all-queue')
    async updateAllQueue(
        @requestBody(RequestResetAllQueueBody) req:ReqResetAllQueueType
    ): Promise<object> {
        const currentTime = convertToUTCTime(new Date());
        console.log("RUN resetAllQueue now: " + currentTime);
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            const nftRepo = this.nfTsSchemaRepository;
            const nftQueueRepo = this.nftQueueSchemaRepository;
            const nftQueueScanAllRepo = this.nftQueueScanAllSchemaRepository;
            const collectionsRepo = this.collectionsSchemaRepository;
            const collectionQueueRepo = this.collectionQueueSchemaRepository;
            const azeroDomainEventRepo = this.azeroDomainEventRepository;

            const provider = new WsProvider(process.env.WSSPROVIDER);
            const apiTrigger = new ApiPromise({
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
            apiTrigger.on("connected", () => {
                apiTrigger.isReady.then(() => {
                    console.log("Smartnet AZERO Connected");
                });
            });
            apiTrigger.on("ready", async () => {
                console.log("Smartnet AZERO Ready");
                const marketplace_contract = new ContractPromise(
                    apiTrigger,
                    marketplace.CONTRACT_ABI,
                    marketplace.CONTRACT_ADDRESS
                );
                console.log("Marketplace Contract is ready");
                marketplace_calls.setContract(marketplace_contract);

                const az_nft_contract = new ContractPromise(
                    apiTrigger,
                    artzero_nft.CONTRACT_ABI,
                    artzero_nft.CONTRACT_ADDRESS
                );
                console.log("ArtZero NFT Contract is ready 4");
                artzero_nft_calls.setContract(az_nft_contract);

                const collection_contract = new ContractPromise(
                    apiTrigger,
                    collection_manager.CONTRACT_ABI,
                    collection_manager.CONTRACT_ADDRESS
                );
                console.log("Collection Contract is ready");
                collection_manager_calls.setContract(collection_contract);
                global_vars.is_check_NFT_queue = false;
                global_vars.is_scan_all_NFTs = false;
                global_vars.is_check_new_AZ_NFT = false;
                global_vars.is_check_NFT_queue_all = false;
                try {
                    // TODO: Testing
                    await scanAllNFTs(
                        globalApi,
                        nftRepo,
                        nftQueueRepo,
                        nftQueueScanAllRepo,
                        collectionsRepo,
                        collectionQueueRepo,
                        azeroDomainEventRepo
                    );
                } catch (e) {
                    console.log(e);
                }
                await apiTrigger.disconnect();
            });
            apiTrigger.on("error", (err) => {
                console.log("error", err);
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
        return {}
    }

    @post('/api/config/updateConfig')
    async updateConfig(
        @requestBody(RequestUpdateConfigBody) req:ReqUpdateConfigType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.typeConfig || !req.mainConfig || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            if (userName !== process.env.BLACK_LIST_USER_NAME || password !== process.env.BLACK_LIST_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            for(const typeConfig of req?.typeConfig) {
                // const typeConfig = req?.typeConfig;
                const nodeIp = req?.nodeIp;
                const nodeCluster = req?.nodeCluster;
                const mainConfig = req?.mainConfig;
                let data = await this.configRepository.findOne({
                    where: {
                        typeConfig: typeConfig,
                        nodeIp: nodeIp,
                        nodeCluster: nodeCluster,
                    }
                });

                if (data) {
                    try {
                        data.typeConfig = typeConfig;
                        data.mainConfig = mainConfig;
                        await this.configRepository.updateById(data._id, {
                            ...data,
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                } else {
                    try {
                        await this.configRepository.create({
                            typeConfig: typeConfig,
                            nodeIp: nodeIp,
                            nodeCluster: nodeCluster,
                            mainConfig: mainConfig,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        })
                    } catch (e) {
                        console.log(`ERROR: ${e.message}`);
                    }
                }
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @get('/api/withdraw-event-schemas')
    @response(200, {
        description: 'Array of WithdrawEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(withdrawevents, {includeRelations: true}),
                },
            },
        },
    })
    async getWithdrawEvent(
        @param.filter(withdrawevents) filter?: Filter<withdrawevents>,
    ): Promise<Response> {
        const data = await this.withdrawEventSchemaRepository.find(filter);
        const eventCount = await this.withdrawEventSchemaRepository.count(filter?.where);

        const totalBalanceData = await this.withdrawEventSchemaRepository.find({
            where: {...filter?.where},
            fields: {
                withdrawAmount: true,
            },
        });

        const totalBalanceAmount = totalBalanceData.reduce(
            (prev, curr) => prev + (curr?.withdrawAmount || 0),
            0,
        );

        // @ts-ignore
        return this.response.send({
            status: STATUS.OK,
            ret: data,
            totalCount: eventCount,
            totalBalanceAmount
        });
    }

    @get('/api/launchpad-minting-event-schemas')
    @response(200, {
        description: 'Array of LaunchpadMintingEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(launchpadmintingevents, {includeRelations: true}),
                },
            },
        },
    })
    async getLaunchpadMintingEvent(
        @param.filter(launchpadmintingevents) filter?: Filter<launchpadmintingevents>,
    ): Promise<Response> {
        const data = await this.launchpadMintingEventSchemaRepository.find(filter);
        const eventCount = await this.launchpadMintingEventSchemaRepository.count(filter?.where);
        // @ts-ignore
        return this.response.send({status: STATUS.OK, ret: data, totalCount: eventCount});
    }

    @post('/api/launchpad-minting-event-schemas-v1')
    async getLaunchpadMintingEventV1(
        @requestBody(RequestGetLaunchpadMintingEventBody) req:ReqGetLaunchpadMintingEventType
    ): Promise<ResponseBody | Response> {
        if (!req || !req.nftContractAddress) {
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NO_INPUT,
                ret: [],
                totalCount: 0
            });
        }
        let keyword = req?.keyword;
        let limit = req?.limit || 24;
        let offset = req?.offset || 0;
        let nftContractAddress = req.nftContractAddress;
        let collectionInfo = await this.collectionsSchemaRepository.findOne({
            where: {
                nftContractAddress: nftContractAddress,
            }
        });
        if (!collectionInfo) {
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
                ret: [],
                totalCount: 0
            });
        }

        let paramTmp = {};
        if (keyword) {
            paramTmp = {...paramTmp, minter: {like: `${keyword}`, options: "i" }};
        }
        const filterData = {
            nftContractAddress: nftContractAddress,
            ...paramTmp
        };
        console.log(filterData);
        const data = await this.launchpadMintingEventSchemaRepository.find({
            where: filterData,
            limit: limit,
            offset: offset
        });

        const eventCount = await this.launchpadMintingEventSchemaRepository.count({
            nftContractAddress: nftContractAddress
        });

        const totalMintedData = await this.launchpadMintingEventSchemaRepository.find({
            where: {...filterData},
            fields: {
                mintAmount: true,
            },
        });

        const totalMintedAmount = totalMintedData.reduce(
          (prev, curr) => prev + (curr?.mintAmount || 0),
          0,
        );

        // @ts-ignore
        return this.response.send({
            status: STATUS.OK,
            ret: data,
            totalCount: eventCount,
            totalMintedAmount
        });
    }

    @post('/api/checking/images-and-json')
    async checkingImagesAndJson(
        @requestBody(RequestCheckingImagesAndJsonBody) req:ReqCheckingImagesAndJsonType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            const nftContractAddress = req?.nftContractAddress;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            if (!nftContractAddress) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT,
                });
            }
            let listError:string[] = [];
            let listSuccess:string[] = [];
            let totalSuccess: number = 0;
            let totalError: number = 0;
            try {
                let foundCollection = await this.collectionsSchemaRepository.findOne({
                    where: {
                        nftContractAddress: nftContractAddress,
                    }
                });
                if (!foundCollection) {
                    // @ts-ignore
                    return this.response.send({
                        status: STATUS.FAILED,
                        message: MESSAGE.INVALID_COLLECTION_ADDRESS,
                    });
                }
                const launchpad_psp34_nft_standard_contract = new ContractPromise(
                    api,
                    launchpad_psp34_nft_standard.CONTRACT_ABI,
                    nftContractAddress
                );
                // @ts-ignore
                const {result, output} = await launchpad_psp34_nft_standard_contract.query["psp34Traits::tokenUri"](
                    global_vars.caller,
                    {value: 0, gasLimit: await readOnlyGasLimit(api)},
                    1
                );
                let tokenUri = "";
                if (result.isOk && output) {
                    // @ts-ignore
                    tokenUri = output.toHuman()?.Ok?.replace("1.json", "");
                }
                let currentSupply = await launchpad_psp34_nft_standard_calls.getTotalSupply(
                    launchpad_psp34_nft_standard_contract,
                    global_vars.caller
                );
                console.log({data: {
                        nftContractAddress: nftContractAddress,
                        currentSupply: currentSupply,
                        tokenUri: tokenUri
                    }});
                if (currentSupply) {
                    for (let tokenID = 1; tokenID <= currentSupply; tokenID++) {
                        console.log(`Checking tokenID: ${tokenID} of tokenUri ${tokenUri} from currentSupply ${currentSupply} NFTs`);
                        const input = `${tokenUri.replace("ipfs://", "/ipfs/")}${tokenID}.json`;
                        let input_data = await this.jsonSchemaRepository.findOne({
                            where: {
                                input: input
                            }
                        });
                        if (!input_data) {
                            console.log(`ERROR: ${input} not found!`);
                        } else if (input_data?.location) {
                            const locationTmp = input_data.location;
                            const bufferString = await fs.promises.readFile(locationTmp);
                            const offChainData = JSON.parse(bufferString.toString());
                            // TODO: Check data here!
                            let imageIpfsLinkI = offChainData?.image.replace("ipfs://","/ipfs/");
                            if (imageIpfsLinkI) {
                                const data = await this.imagesSchemaRepository.findOne({
                                    where: {
                                        isCloudFlare: true,
                                        input: imageIpfsLinkI
                                    }
                                });
                                if (!data) {
                                    listError.push(offChainData?.image);
                                    totalError += 1;
                                } else {
                                    listSuccess.push(offChainData?.image);
                                    totalSuccess += 1;
                                }
                            } else {
                                listError.push(offChainData?.image);
                                totalError += 1;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS,
                totalSuccess: totalSuccess,
                totalError: totalError,
                listError: listError,
                listSuccess: listSuccess,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/api/checking/get-all-bidsqueue')
    async getAllBidsQueue(
        @requestBody(RequestGetAllBidsQueueBody) req:ReqGetAllBidsQueueType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            const nftContractAddress = req?.nftContractAddress;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            if (!nftContractAddress) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT,
                });
            }
            try {
                const allCollection = await this.collectionsSchemaRepository.find({
                    where: {
                        nftContractAddress: nftContractAddress
                    }
                });
                if (allCollection) {
                    for (const collection of allCollection) {
                        if (collection.isActive) {
                            const nftsForSale = await this.nfTsSchemaRepository.find({
                                where: {
                                    nftContractAddress: collection.nftContractAddress,
                                    is_for_sale: true
                                }
                            });
                            console.log(`${collection.nftContractAddress}: ${nftsForSale.length} NFTs`);
                            for (const nft of nftsForSale) {
                                // TODO - Step 1: Get current owner NFT
                                const seller = nft.nft_owner;
                                // TODO - Step 2: Insert to bidsQueue
                                if (seller) {
                                    try {
                                        const newData = await this.bidQueueSchemaRepository.create({
                                            nftContractAddress: collection.nftContractAddress,
                                            tokenID: nft.tokenID,
                                            seller: seller,
                                            createdTime: new Date(),
                                            updatedTime: new Date()
                                        });
                                        console.log(newData);
                                    } catch (e) {
                                        console.log(e.message);
                                    }
                                } else {
                                    console.log(`ERROR: Not found seller!`);
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e.message);
            }

            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS,
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/ad/updateCollection')
    async adUpdateCollection(
        @requestBody(RequestAdUpdateCollectionBody) req:ReqAdUpdateCollectionType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            const maxTotalSupply = req?.maxTotalSupply;
            const nftContractAddress = req?.nftContractAddress;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            if (!nftContractAddress) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT,
                });
            }
            if (!maxTotalSupply || maxTotalSupply <= 0) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT,
                });
            }
            try {
                let foundCollection = await this.collectionsSchemaRepository.findOne({
                    where: {
                        nftContractAddress: nftContractAddress,
                    }
                });
                if (!foundCollection) {
                    // @ts-ignore
                    return this.response.send({
                        status: STATUS.FAILED,
                        message: MESSAGE.INVALID_COLLECTION_ADDRESS,
                    });
                } else {
                    try {
                        await this.collectionsSchemaRepository.updateById(foundCollection._id, {
                            maxTotalSupply: maxTotalSupply
                        });
                    } catch (e) {
                        return this.response.send({
                            status: STATUS.FAILED,
                            message: e.message
                        });
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/ad/getListMinter')
    async adGetListMinter(
        @requestBody(RequestAdGetListMinterBody) req:ReqAdGetListMinterType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            const nftContractAddress = req?.nftContractAddress;
            const mode = req?.mode;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            if (!nftContractAddress || !mode) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT,
                });
            }
            try {
                const filter = (nftContractAddress === "all") ? {} : {
                    nftContractAddress: nftContractAddress
                };
                let collections = await this.collectionsSchemaRepository.find({
                    where: filter,
                    fields: {
                        _id: true,
                        nftContractAddress: true
                    }
                });
                let data: object[] = [];
                const mintingFeeData = new Map<string, number>();
                const mintingAmountData = new Map<string, number>();
                let totalMinted = 0;
                for (const collection of collections) {
                    console.log(`collection: ${collection.nftContractAddress}`);
                    if (collection) {
                        try {
                            const filterMode = (mode === "all") ? {
                                nftContractAddress: collection.nftContractAddress,
                            } : {
                                nftContractAddress: collection.nftContractAddress,
                                mode: mode
                            };
                            const mintedData = await this.launchpadMintingEventSchemaRepository.find({
                                where: filterMode
                            });
                            for(const item of mintedData) {
                                if (item?.minter && (item?.mintingFee != undefined) && item?.mintAmount) {
                                    mintingFeeData.set(item.minter, (mintingFeeData.get(item.minter) || 0) + item.mintingFee);
                                    mintingAmountData.set(item.minter, (mintingAmountData.get(item.minter) || 0) + item.mintAmount);
                                    totalMinted += item.mintAmount;
                                }
                            }

                            // TODO: List acc haven't minted NFT from whitlist data
                            const listWhitelist = await this.projectsSchemaRepository.findOne({
                                where: {
                                    nftContractAddress: collection.nftContractAddress
                                }
                            });
                            let listAccMintedInWhitelist: WhiteListUserData[] = [];
                            let listAccUnMintedInWhitelist: WhiteListUserData[] = [];
                            if (listWhitelist) {
                                const whitelist = listWhitelist.whiteList;
                                if (whitelist) {
                                    for (const whitelistData of whitelist) {
                                        if (whitelistData.phaseId == 1){
                                            const userData = whitelistData.userData;
                                            if (userData) {
                                                for (const user of userData) {
                                                    if ( user.whitelistAmount && user.whitelistAmount > 0
                                                        && (user.claimedAmount != undefined) && (user.claimedAmount > 0)
                                                    ) {
                                                        listAccMintedInWhitelist.push(user);
                                                    }

                                                    if ( user.whitelistAmount && user.whitelistAmount > 0
                                                        && (user.claimedAmount != undefined) && (user.claimedAmount == 0)
                                                    ) {
                                                        listAccUnMintedInWhitelist.push(user);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            data.push({
                                nftContractAddress: collection.nftContractAddress,
                                mintedData: mintedData,
                                listAccMintedInWhitelist: listAccMintedInWhitelist,
                                listAccUnMintedInWhitelist: listAccUnMintedInWhitelist,
                                listAccMintedInWhitelistAddress: listAccMintedInWhitelist.map((item) => (item.address)),
                                listAccUnMintedInWhitelistAddress: listAccUnMintedInWhitelist.map((item) => (item.address))
                            });
                        } catch (e) {
                            return this.response.send({
                                status: STATUS.FAILED,
                                message: e.message
                            });
                        }
                    }
                }
                let sortedMintingFeeData = new Map([...mintingFeeData.entries()].sort((a, b) => a[1] - b[1]));
                let sortedMintingAmountData = new Map([...mintingAmountData.entries()].sort((a, b) => a[1] - b[1]));
                return this.response.send({
                    status: STATUS.OK,
                    message: MESSAGE.SUCCESS,
                    ret: data,
                    retCount: data.length,
                    mintingFeeData: Object.fromEntries(mintingFeeData),
                    sortedMintingFeeData: Object.fromEntries(sortedMintingFeeData),
                    mintingAmountData: Object.fromEntries(mintingAmountData),
                    sortedMintingAmountData: Object.fromEntries(sortedMintingAmountData),
                    totalMinted: totalMinted
                });
            } catch (e) {
                console.log(e.message);
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/ad/adSearchNFTOfCollectionByTraits')
    async adSearchNFTOfCollectionByTraits(
        @requestBody(RequestSearchNFTOfCollectionByTraitsBody) req:ReqSearchNFTOfCollectionByTraitsType
    ): Promise<ResponseBody | Response> {
        try {
            // // console.log(req);
            // if (!req || !req.collectionAddress) {
            //     // @ts-ignore
            //     return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            // }
            // let params:TraitFilters | undefined = (req.traitFilters) ? JSON.parse(req.traitFilters) : undefined;
            // let collectionAddress = req.collectionAddress;
            // if (!isValidAddressPolkadotAddress(collectionAddress)) {
            //     // @ts-ignore
            //     return this.response.send({
            //         status: STATUS.FAILED,
            //         message: MESSAGE.INVALID_COLLECTION_ADDRESS,
            //     });
            // }
            // let ret = {result: {}};
            // let collectionInfo = await this.collectionsSchemaRepository.findOne({
            //     where: {
            //         nftContractAddress: collectionAddress,
            //     }
            // });
            // if (!collectionInfo) {
            //     // @ts-ignore
            //     return this.response.send({
            //         status: STATUS.FAILED,
            //         message: MESSAGE.NOT_EXIST_COLLECTION_ADDRESS,
            //     });
            // }
            // ret = {...ret, ...collectionInfo?.toJSON()};
            //
            // let paramTmp = {};
            // if (params?.price) {
            //     paramTmp = {...paramTmp, price: params.price};
            // }
            // if (params && params?.is_for_sale != undefined) {
            //     paramTmp = {...paramTmp, is_for_sale: params.is_for_sale};
            // }
            // if (params?.and) {
            //     paramTmp = {...paramTmp, and: params.and};
            // }
            // if (params?.keyword) {
            //     paramTmp = {...paramTmp, nftName: {like: `${params.keyword}`, options: "i" }};
            // }
            //
            // let data:any[] = [];
            // let countNft:any = {};
            // try {
            //     await this.tmpDataRepository.deleteAll({
            //         nftContractAddress: collectionAddress,
            //     });
            // } catch (e) {
            //     console.log(`WARNING: ${e.message}`);
            // }
            // for (let page=1; page < 100; page ++) {
            //     let limit:number = 12;
            //     let offset:number = (page - 1) * limit;
            //     const filterData = {
            //         nftContractAddress: collectionAddress,
            //         ...paramTmp
            //     };
            //     let order:string = "tokenID ASC";
            //     if (req?.sort) {
            //         if (params && params.is_for_sale) {
            //             if (req.sort == 1) {
            //                 order = "price DESC";
            //             } else if (req.sort == 2) {
            //                 order = "price ASC";
            //             } else if (req.sort == 3) {
            //                 order = "listed_date DESC";
            //             }
            //         } else {
            //             if ((req.sort == 1)) {
            //                 order = "tokenID DESC";
            //             } else if ((req.sort == 2)) {
            //                 order = "tokenID ASC";
            //             }
            //         }
            //     }
            //     let filterObject = {
            //         where: filterData,
            //         order: [order],
            //         skip: offset,
            //         limit: limit
            //     };
            //     console.log(filterObject);
            //     data = await this.nfTsSchemaRepository.find(filterObject);
            //     countNft = await this.nfTsSchemaRepository.count(filterData);
            //     for (const nftData of data) {
            //         console.log(`Create data of #${nftData.nftName} from ${data.length} NFTs`);
            //         try {
            //             await this.tmpDataRepository.create({
            //                 nftContractAddress: nftData.nftContractAddress,
            //                 tokenID: nftData.tokenID,
            //                 nftName: nftData.nftName,
            //                 price: nftData.price,
            //                 listed_date: nftData.listed_date,
            //                 createdTime: new Date(),
            //                 updatedTime: new Date(),
            //             });
            //         } catch (e) {
            //             console.log(`WARNING: ${e.message}`);
            //         }
            //     }
            // }
            // const precheck = data.map((item) => ({
            //     nftName: item.nftName,
            //     price: item.price,
            //     listed_date: item.listed_date,
            //     tokenID: item.tokenID
            // }));
            //
            // ret.result = {
            //     NFTList: data,
            //     totalResults: (countNft && countNft?.count) ? countNft.count : 0,
            //     precheck: precheck
            // };
            // // @ts-ignore
            // return this.response.send({status: STATUS.OK, ret});
            return this.response.send({
                status: STATUS.FAILED,
                message: 'For checking only!'
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/ad/getBidByCollection')
    async getBidByCollection(
        @requestBody(RequestGetBidByCollectionBody) req:ReqGetBidByCollectionType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req || !req.userName || !req.password) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            const nftContractAddress = req?.nftContractAddress;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            let totalBid: number = 0;
            let nftLive: nfts[] = []
            if (nftContractAddress) {
                console.log(`Get all bids for ${nftContractAddress}`);
                if (!isValidAddressPolkadotAddress(nftContractAddress)) {
                    // @ts-ignore
                    return this.response.send({status: STATUS.FAILED, message: MESSAGE.INVALID_ADDRESS});
                }
                nftLive = await this.nfTsSchemaRepository.find({
                    where: {
                        nftContractAddress: nftContractAddress,
                        is_for_sale: true
                    }
                });
            } else {
                console.log(`Get all bids for all collections.`);
                nftLive = await this.nfTsSchemaRepository.find({
                    where: {
                        is_for_sale: true
                    }
                });
            }
            console.log(`Total NFT lived: ${nftLive.length}`);
            for (const nft of nftLive) {
                const bids = await this.bidsSchemaRepository.find({
                    where: {
                        nftContractAddress: nft.nftContractAddress,
                        tokenID: nft.tokenID
                    }
                });
                console.log(`Total bids of ${nft.tokenID} of collection ${nft.nftContractAddress}: ${bids.length}`);
                for (const bid of bids) {
                    console.log(`Sum of ${bid.bid_value} from ${bid.tokenID} of collection ${bid.nftContractAddress}`);
                    if (bid.bid_value) {
                        totalBid += parseFloat((new BN(bid.bid_value)).toString());
                    }
                }
            }

            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS,
                ret: {
                    totalBid: totalBid
                }
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/ad/exportData')
    async exportData(
        @requestBody(RequestResetAllQueueBody) req:ReqResetAllQueueType
    ): Promise<ResponseBody | Response> {
        try {
            // const collectionAddres = `5GszY1BAfQ7EpzmF13Y7zkzPAuQjW2PXNwBRaTNsSgVgoEUf`;
            // const bidWin = await this.bidWinEventSchemaRepository.find({
            //     where: {
            //         nftContractAddress: collectionAddres
            //     },
            //     fields: {
            //         _id: true,
            //         blockNumber: true,
            //         buyer: true,
            //         seller: true,
            //         nftContractAddress: true,
            //         tokenID: true,
            //         price: true,
            //         platformFee: true,
            //         royaltyFee: true,
            //         createdTime: true,
            //         updatedTime: true,
            //     }
            // });
            // const purchaseEvents = await this.purchaseEventSchemaRepository.find({
            //     where: {
            //         nftContractAddress: collectionAddres
            //     }
            // });
            // const workbook = new Excel.Workbook();
            // const worksheetBidAccepted = workbook.addWorksheet('Bid Accepted');
            // const worksheetPurchase = workbook.addWorksheet('Purchase');
            // const bidAcceptedColumns = [
            //     { key: '_id', header: 'ID' },
            //     { key: 'blockNumber', header: 'Block Number' },
            //     { key: 'buyer', header: 'Buyer' },
            //     { key: 'seller', header: 'Seller' },
            //     { key: 'nftContractAddress', header: 'Collection Address' },
            //     { key: 'tokenID', header: 'Token ID' },
            //     { key: 'price', header: 'Price' },
            //     { key: 'platformFee', header: 'Platform Fee' },
            //     { key: 'royaltyFee', header: 'Royalty Fee' },
            //     { key: 'createdTime', header: 'Created Time' },
            //     { key: 'updatedTime', header: 'Updated Time' },
            // ];
            // worksheetBidAccepted.columns = bidAcceptedColumns;
            //
            // const purchaseColumns = [
            //     { key: '_id', header: 'ID' },
            //     { key: 'blockNumber', header: 'Block Number' },
            //     { key: 'buyer', header: 'Buyer' },
            //     { key: 'seller', header: 'Seller' },
            //     { key: 'nftContractAddress', header: 'Collection Address' },
            //     { key: 'tokenID', header: 'Token ID' },
            //     { key: 'price', header: 'Price' },
            //     { key: 'platformFee', header: 'Platform Fee' },
            //     { key: 'royaltyFee', header: 'Royalty Fee' },
            //     { key: 'createdTime', header: 'Created Time' },
            //     { key: 'updatedTime', header: 'Updated Time' },
            // ];
            // worksheetPurchase.columns = purchaseColumns;
            //
            // for (const bid of bidWin) {
            //     worksheetBidAccepted.addRow(bid);
            // }
            //
            // for (const purchase of purchaseEvents) {
            //     worksheetPurchase.addRow(purchase);
            // }
            //
            // const exportPath = path.resolve(__dirname, 'exportedData.xlsx');
            // await workbook.xlsx.writeFile(exportPath);
            //
            // console.log("Finished writing data");

            return this.response.send({
                status: STATUS.FAILED,
                message: 'For checking only!'
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @post('/ad/getListOwnerNft')
    async getListOwnerNft(
        @requestBody(RequestGetListOwnerNftBody) req:ReqGetListOwnerNftType
    ): Promise<ResponseBody | Response> {
        try {
            // console.log(req);
            if (!req || !req.nftContractAddress) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            const userName = req?.userName;
            const password = req?.password;
            let nftContractAddress = req?.nftContractAddress;
            if (userName !== process.env.ADMIN_USER_NAME || password !== process.env.ADMIN_PASSWORD) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_AUTHENTICATION,
                });
            }
            if (!nftContractAddress) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_INPUT,
                });
            }

            if (!isValidAddressPolkadotAddress(nftContractAddress)) {
                // @ts-ignore
                return this.response.send({
                    status: STATUS.FAILED,
                    message: MESSAGE.INVALID_COLLECTION_ADDRESS,
                });
            }
            try {
                let foundCollection = await this.collectionsSchemaRepository.findOne({
                    where: {
                        nftContractAddress: nftContractAddress,
                    }
                });
                if (!foundCollection) {
                    // @ts-ignore
                    return this.response.send({
                        status: STATUS.FAILED,
                        message: MESSAGE.INVALID_COLLECTION_ADDRESS,
                    });
                } else {
                    try {
                        const listNft = await this.nfTsSchemaRepository.find({
                            where: {
                                nftContractAddress: nftContractAddress
                            }
                        });
                        return this.response.send({
                            status: STATUS.OK,
                            listNft: listNft,
                            numberOwner: listNft.length
                        });
                    } catch (e) {
                        return this.response.send({
                            status: STATUS.FAILED,
                            message: e.message
                        });
                    }
                }
            } catch (e) {
                console.log(e.message);
            }


            return this.response.send({status: STATUS.OK});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }

    @get('/api/purchase-event-schema')
    @response(200, {
      description: 'Array of purchaseEventSchema model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(purchaseevents, {includeRelations: true}),
          },
        },
      },
    })
    async getUserPurchaseEvents(
      @param.filter(purchaseevents) filter?: Filter<purchaseevents>,
    ): Promise<Response> {
      const eventData = await this.purchaseEventSchemaRepository
        .find(filter)
        .then(events => {
          return Promise.all(
            events.map(async event => {
              const {nftContractAddress, tokenID, azDomainName} = event;

              const azChecking = isAzEnabled(nftContractAddress);

              let nftInfo;

              if (azChecking?.isAzDomain) {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    azDomainName,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              } else {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    tokenID,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              }

              // Temp disable due to no use collectio info
              //   let collectionInfo =
              //     await this.collectionsSchemaRepository.findOne({
              //       where: {
              //         nftContractAddress,
              //       },
              //       fields: {
              //         name: true,
              //         avatarImage: true,
              //       },
              //     });

              return {
                ...event,
                avatar: nftInfo?.avatar,
                nftName: nftInfo?.nftName,
                // collectionName: collectionInfo?.name,
                // collectionAvatar: collectionInfo?.avatarImage,
              };
            }),
          );
        });

      const eventCount = await this.purchaseEventSchemaRepository.count(
        filter?.where,
      );

      return this.response.send({
        status: STATUS.OK,
        totalCount: eventCount,
        ret: eventData,
      });
    }

    @get('/api/bid-win-event-schema')
    @response(200, {
      description: 'Array of bidwinevents model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(bidwinevents, {includeRelations: true}),
          },
        },
      },
    })
    async getUserBidWinEvents(
      @param.filter(bidwinevents) filter?: Filter<bidwinevents>,
    ): Promise<Response> {
      const eventData = await this.bidWinEventSchemaRepository
        .find(filter)
        .then(events => {
          return Promise.all(
            events.map(async event => {
              const {nftContractAddress, tokenID, azDomainName} = event;

              const azChecking = isAzEnabled(nftContractAddress);

              let nftInfo;

              if (azChecking?.isAzDomain) {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    azDomainName,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              } else {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    tokenID,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              }

              // Temp disable due to no use collectio info
              //   let collectionInfo =
              //     await this.collectionsSchemaRepository.findOne({
              //       where: {
              //         nftContractAddress,
              //       },
              //       fields: {
              //         name: true,
              //         avatarImage: true,
              //       },
              //     });

              return {
                ...event,
                avatar: nftInfo?.avatar,
                nftName: nftInfo?.nftName,
                // collectionName: collectionInfo?.name,
                // collectionAvatar: collectionInfo?.avatarImage,
              };
            }),
          );
        });

      const eventCount = await this.bidWinEventSchemaRepository.count(
        filter?.where,
      );

      return this.response.send({
        status: STATUS.OK,
        totalCount: eventCount,
        ret: eventData,
      });
    }

    @get('/api/new-list-event-schema')
    @response(200, {
      description: 'Array of newlistevents model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(newlistevents, {includeRelations: true}),
          },
        },
      },
    })
    async getUserNewListEvents(
      @param.filter(newlistevents) filter?: Filter<newlistevents>,
    ): Promise<Response> {
      const eventData = await this.newListEventSchemaRepository
        .find(filter)
        .then(events => {
          return Promise.all(
            events.map(async event => {
              const {nftContractAddress, tokenID, azDomainName} = event;

              const azChecking = isAzEnabled(nftContractAddress);

              let nftInfo;

              if (azChecking?.isAzDomain) {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    azDomainName,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              } else {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    tokenID,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              }

              // Temp disable due to no use collectio info
              //   let collectionInfo =
              //     await this.collectionsSchemaRepository.findOne({
              //       where: {
              //         nftContractAddress,
              //       },
              //       fields: {
              //         name: true,
              //         avatarImage: true,
              //       },
              //     });

              return {
                ...event,
                avatar: nftInfo?.avatar,
                nftName: nftInfo?.nftName,
                // collectionName: collectionInfo?.name,
                // collectionAvatar: collectionInfo?.avatarImage,
              };
            }),
          );
        });

      const eventCount = await this.newListEventSchemaRepository.count(
        filter?.where,
      );

      return this.response.send({
        status: STATUS.OK,
        totalCount: eventCount,
        ret: eventData,
      });
    }

    @get('/api/un-list-event-schema')
    @response(200, {
      description: 'Array of unlistevents model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(unlistevents, {includeRelations: true}),
          },
        },
      },
    })
    async getUserUnlistEvents(
      @param.filter(unlistevents) filter?: Filter<unlistevents>,
    ): Promise<Response> {
      const eventData = await this.unListEventSchemaRepository
        .find(filter)
        .then(events => {
          const eventsWithNftInfo = Promise.all(
            events.map(async event => {
              const {nftContractAddress, tokenID, azDomainName} = event;

              const azChecking = isAzEnabled(nftContractAddress);

              let nftInfo;

              if (azChecking?.isAzDomain) {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    azDomainName,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              } else {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    tokenID,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              }

              // Temp disable due to no use collectio info
              //   let collectionInfo =
              //     await this.collectionsSchemaRepository.findOne({
              //       where: {
              //         nftContractAddress,
              //       },
              //       fields: {
              //         name: true,
              //         avatarImage: true,
              //       },
              //     });

              return {
                ...event,
                avatar: nftInfo?.avatar,
                nftName: nftInfo?.nftName,
                // collectionName: collectionInfo?.name,
                // collectionAvatar: collectionInfo?.avatarImage,
              };
            }),
          );

          return eventsWithNftInfo;
        });

      const eventCount = await this.unListEventSchemaRepository.count(
        filter?.where,
      );

      return this.response.send({
        status: STATUS.OK,
        totalCount: eventCount,
        ret: eventData,
      });
    }

    @get('/api/top-nft-trades')
    @response(200, {
      description: 'Array of purchaseEventSchema model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(purchaseevents, {includeRelations: true}),
          },
        },
      },
    })
    async getTopNftTrades(
      @param.filter(purchaseevents) filter?: Filter<purchaseevents>,
    ): Promise<Response> {

        const purchaseEventData = await this.purchaseEventSchemaRepository
        .find(filter)
        .then(events => {
          return Promise.all(
            events.map(async event => {
              const {nftContractAddress, tokenID, azDomainName} = event;

              const azChecking = isAzEnabled(nftContractAddress);

              let nftInfo;

              if (azChecking?.isAzDomain) {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    azDomainName,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              } else {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    tokenID,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              }

              // Temp disable due to no use collectio info
              //   let collectionInfo =
              //     await this.collectionsSchemaRepository.findOne({
              //       where: {
              //         nftContractAddress,
              //       },
              //       fields: {
              //         name: true,
              //         avatarImage: true,
              //       },
              //     });

              return {
                ...event,
                avatar: nftInfo?.avatar,
                nftName: nftInfo?.nftName,
                eventDataType: 'purchase',

                // collectionName: collectionInfo?.name,
                // collectionAvatar: collectionInfo?.avatarImage,
              };
            }),
          );
        });

        const bidWinEventData = await this.bidWinEventSchemaRepository
        .find(filter)
        .then(events => {
          return Promise.all(
            events.map(async event => {
              const {nftContractAddress, tokenID, azDomainName} = event;

              const azChecking = isAzEnabled(nftContractAddress);

              let nftInfo;

              if (azChecking?.isAzDomain) {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    azDomainName,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              } else {
                nftInfo = await this.nfTsSchemaRepository.findOne({
                  where: {
                    tokenID,
                    nftContractAddress,
                  },
                  fields: {
                    avatar: true,
                    nftName: true,
                  },
                });
              }

              // Temp disable due to no use collectio info
              //   let collectionInfo =
              //     await this.collectionsSchemaRepository.findOne({
              //       where: {
              //         nftContractAddress,
              //       },
              //       fields: {
              //         name: true,
              //         avatarImage: true,
              //       },
              //     });

              return {
                ...event,
                avatar: nftInfo?.avatar,
                nftName: nftInfo?.nftName,
                eventDataType:'bid win'
                // collectionName: collectionInfo?.name,
                // collectionAvatar: collectionInfo?.avatarImage,
              };
            }),
          );
        });

        let ret = [...purchaseEventData, ...bidWinEventData]

        ret = ret
           .sort((a, b) => (b?.price || 0) - (a?.price || 0))
            .slice(filter?.offset, filter?.limit);

        return this.response.send({
        status: STATUS.OK,
        ret,
      });
    }

    @post('/getCollectionGroupByAddress')
    async getCollectionGroupByAddress(
        @requestBody(RequestGetCollectionGroupByAddressBody) req:ReqGetCollectionGroupByAddressType
    ): Promise<ResponseBody | Response> {
        try {
            if (!req) {
                // @ts-ignore
                return this.response.send({status: STATUS.FAILED, message: MESSAGE.NO_INPUT});
            }
            let limit = req?.limit;
            let offset = req?.offset;
            if (!limit) limit = 15;
            if (!offset) offset = 0;
            const order = (req?.sort && req?.sort == 1) ? "updatedTime ASC" : "updatedTime DESC";
            let data: any[] = [];
            if (collectionsList?.nftSchema) {
                data = await collectionsList.nftSchema.aggregate([
                    {
                        "$group" : {
                            _id: "$nftContractAddress",
                            all: {
                                $push: "$$ROOT"
                            },
                            count: {$sum:1}
                        },
                    },
                ]).toArray();
            }
            // @ts-ignore
            return this.response.send({
                status: STATUS.OK,
                message: MESSAGE.SUCCESS,
                ret: data
            });
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
    }
     // Get Floor Price of all
     @post('/getAllCollectionsFloorPrice')
     async getAllCollectionsFloorPrice(): Promise<ResponseBody> {
        try {
            const collections = await this.collectionsSchemaRepository.find({
                where: {
                    isActive: true,
                },
            });
            const floorPriceList =  await Promise.all(collections.map(async (collection) => {
            let data = await this.nfTsSchemaRepository.find({
                where: {
                    nftContractAddress: collection.nftContractAddress,
                    is_for_sale: true,
                },
                order: ["price ASC"],  // price ASC
                limit: 1
            });
            if (data) {
                return {
                    collection: collection.nftContractAddress,
                    floorPrice: data?.[0]?.price || 0,
                };
            } else {
                return null;
            }
        }))
            // @ts-ignore
            return this.response.send({status: STATUS.OK, ret: floorPriceList.filter((floorPrice) => floorPrice !== null)});
        } catch (e) {
            console.log(`ERROR: ${e.message}`);
            // @ts-ignore
            return this.response.send({
                status: STATUS.FAILED,
                message: e.message
            });
        }
     }

    @get('/api/user-buy-sell-event')
    @response(200, {
        description: 'Array of purchaseEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(purchaseevents, { includeRelations: true }),
                },
            },
        },
    })
    async getUserBuySellEvent(
        @param.filter(purchaseevents) filter?: Filter<purchaseevents>,
    ): Promise<Response> {

        const purchaseEventData = await this.purchaseEventSchemaRepository
            .find({ ...filter, offset: 0, limit : 9999999})

        const bidWinEventData = await this.bidWinEventSchemaRepository
            .find({ ...filter, offset: 0, limit: 9999999 })

        let ret = [...purchaseEventData, ...bidWinEventData]

        const order = filter?.order;

        if (order?.length) {
            if (order[0] === "blockNumber DESC") {
                ret = ret.sort((a, b) => (b?.blockNumber || 0) - (a?.blockNumber || 0))
            }
        }

        type eventType = {
            seller?: string;
            buyer?: string;
        };

        const eventData = filter?.where as eventType;
        const eventDataType = eventData?.seller ? 'seller' : eventData?.buyer ? 'buyer' : 'n/a';

        const sliceRet = ret.slice(filter?.offset, filter?.limit);

        ret = await Promise.all(
            sliceRet.map(async (event:any) => {
                const { nftContractAddress, tokenID, azDomainName } = event;

                const azChecking = isAzEnabled(nftContractAddress);

                let where: any = { nftContractAddress };

                if (azChecking?.isAzDomain) {
                    where.azDomainName = azDomainName
                } else{
                    where.tokenID = tokenID
                }

                const nftInfo = await this.nfTsSchemaRepository.findOne({
                    where,
                    fields: {
                        avatar: true,
                        nftName: true,
                    },
                });

                return {
                    ...event,
                    avatar: nftInfo?.avatar,
                    nftName: nftInfo?.nftName,
                    eventData,
                    eventDataType
                };
            }),
        ).then(resultArr => ret = resultArr);


        return this.response.send({
            status: STATUS.OK,
            ret,
            eventData,
            eventDataType
        });
    }
}
