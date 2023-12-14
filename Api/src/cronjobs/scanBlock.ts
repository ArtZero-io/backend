import {repository} from "@loopback/repository";
import {
    AddRewardEventSchemaRepository, AzeroDomainEventRepository,
    BidWinEventSchemaRepository,
    ClaimRewardEventSchemaRepository,
    CollectionEventSchemaRepository, ConfigRepository,
    LaunchpadMintingEventSchemaRepository,
    NewListEventSchemaRepository, NftQueueScanAllSchemaRepository, NftQueueSchemaRepository, NftsSchemaRepository, ProjectsSchemaRepository,
    PurchaseEventSchemaRepository,
    ScannedBlocksSchemaRepository,
    StakingEventSchemaRepository,
    UnListEventSchemaRepository,
    WithdrawEventSchemaRepository
} from "../repositories";
import {scanBlocks} from "./actions";
import {CONFIG_TYPE_NAME} from "../utils/constant";
import {global_vars} from "./global";
import {Abi} from "@polkadot/api-contract";
import {marketplace} from "../contracts/marketplace";
import {staking} from "../contracts/staking";
import {collection_manager} from "../contracts/collection_manager";
import {launchpad_psp34_nft_standard} from "../contracts/launchpad_psp34_nft_standard";
import {ApiPromise} from "@polkadot/api";
import {inject} from "@loopback/core";

export class ScanBlock {
    constructor(
        @repository(ScannedBlocksSchemaRepository)
        public scannedBlocksSchemaRepository: ScannedBlocksSchemaRepository,
        @repository(NewListEventSchemaRepository)
        public newListEventSchemaRepository: NewListEventSchemaRepository,
        @repository(UnListEventSchemaRepository)
        public unListEventSchemaRepository: UnListEventSchemaRepository,
        @repository(PurchaseEventSchemaRepository)
        public purchaseEventSchemaRepository: PurchaseEventSchemaRepository,
        @repository(BidWinEventSchemaRepository)
        public bidWinEventSchemaRepository: BidWinEventSchemaRepository,
        @repository(StakingEventSchemaRepository)
        public stakingEventSchemaRepository: StakingEventSchemaRepository,
        @repository(ClaimRewardEventSchemaRepository)
        public claimRewardEventSchemaRepository: ClaimRewardEventSchemaRepository,
        @repository(LaunchpadMintingEventSchemaRepository)
        public launchpadMintingEventSchemaRepository: LaunchpadMintingEventSchemaRepository,
        @repository(WithdrawEventSchemaRepository)
        public withdrawEventSchemaRepository: WithdrawEventSchemaRepository,
        @repository(AddRewardEventSchemaRepository)
        public addRewardEventSchemaRepository: AddRewardEventSchemaRepository,
        @repository(CollectionEventSchemaRepository)
        public collectionEventSchemaRepository: CollectionEventSchemaRepository,
        @repository(ProjectsSchemaRepository)
        public projectsSchemaRepository: ProjectsSchemaRepository,
        @repository(AzeroDomainEventRepository)
        public azeroDomainEventRepository: AzeroDomainEventRepository,
        @repository(NftQueueScanAllSchemaRepository)
        public nftQueueScanAllSchemaRepository: NftQueueScanAllSchemaRepository,
        @repository(NftQueueSchemaRepository)
        public nftQueueSchemaRepository: NftQueueSchemaRepository,
        @repository(NftsSchemaRepository)
        public nftRepo: NftsSchemaRepository,
        @repository(ConfigRepository)
        public configRepository: ConfigRepository,
    ) {
    }

    public async startScanBlocks(
        header: string,
        eventApi: ApiPromise,
        api_azero_doman: Abi,
        api_launchpad_psp34_nft_standard: Abi,
        abi_marketplace_contract: Abi,
        abi_staking_contract: Abi,
        abi_collection_contract: Abi,
    ) {
        try {
            const scannedBlocksRepo = this.scannedBlocksSchemaRepository;
            const newListEventRepo = this.newListEventSchemaRepository;
            const unListEventRepo = this.unListEventSchemaRepository;
            const purchaseEventRepo = this.purchaseEventSchemaRepository;
            const bidWinEventRepo = this.bidWinEventSchemaRepository;
            const stakingEventRepo = this.stakingEventSchemaRepository;
            const claimRewardEventRepo = this.claimRewardEventSchemaRepository;
            const launchpadMintingEventRepo = this.launchpadMintingEventSchemaRepository;
            const withdrawEventRepo = this.withdrawEventSchemaRepository;
            const addRewardEventRepo = this.addRewardEventSchemaRepository;
            const collectionEventRepo = this.collectionEventSchemaRepository;
            const projectsRepo = this.projectsSchemaRepository;
            const azeroDomainEventRepo = this.azeroDomainEventRepository;
            const nftQueueScanAllRepo = this.nftQueueScanAllSchemaRepository;
            const nftQueueSchemaRepo = this.nftQueueSchemaRepository;
            const nftRepo = this.nftRepo;

            // TODO: Start scanBlocks
            await scanBlocks(
                parseInt(header),
                eventApi,
                api_azero_doman,
                api_launchpad_psp34_nft_standard,
                abi_marketplace_contract,
                abi_staking_contract,
                abi_collection_contract,
                scannedBlocksRepo,
                newListEventRepo,
                unListEventRepo,
                purchaseEventRepo,
                bidWinEventRepo,
                stakingEventRepo,
                claimRewardEventRepo,
                launchpadMintingEventRepo,
                withdrawEventRepo,
                addRewardEventRepo,
                collectionEventRepo,
                projectsRepo,
                azeroDomainEventRepo,
                nftQueueScanAllRepo,
                nftQueueSchemaRepo,
                nftRepo
            );
        } catch (e) {
            console.log(`ERRPR: ${e.messages}`);
        }
    }
}