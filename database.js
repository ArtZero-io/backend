let mongoose = require("mongoose");

/**
 * Trait subdocument schema.
 */

let traitSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

// add new rarityTable model
const CollectionsSchema = new mongoose.Schema({
  index: {
    type: Number,
  },
  collectionOwner: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  contractType: {
    type: String,
  },
  isCollectRoyaltyFee: {
    type: Boolean,
  },
  royaltyFee: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  showOnChainMetadata: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  avatarImage: {
    type: String,
  },
  squareImage: {
    type: String,
  },
  headerImage: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
  },
  twitter: {
    type: String,
  },
  discord: {
    type: String,
  },
  telegram: {
    type: String,
  },
  abi_file: {
    type: String,
  },
  volume: {
    type: Number,
  },
  nft_count: {
    type: Number,
  },
  isDoxxed: {
    type: Boolean,
  },
  isDuplicationChecked: {
    type: Boolean,
  },
  rarityTable: {
    type: Map,
    of: [traitSchema],
  },
});

const CollectionQueueSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
});
const ProjectsSchema = new mongoose.Schema({
  index: {
    type: Number,
  },
  collectionOwner: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  teamMembers: {
    type: String,
  },
  roadmaps: {
    type: String,
  },
  avatarImage: {
    type: String,
  },
  squareImage: {
    type: String,
  },
  headerImage: {
    type: String,
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  discord: {
    type: String,
  },
  telegram: {
    type: String,
  },
  startTime: {
    type: Number,
  },
  endTime: {
    type: Number,
  },
  nft_count: {
    type: Number,
  },
  nftName: {
    type: String,
  },
  nftSymbol: {
    type: String,
  },
});

const ProjectQueueSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
});

// add new traits model
const NFTsSchema = new mongoose.Schema({
  nftName: {
    type: String,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  owner: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
  attributes: {
    type: Array,
  },
  attributesValue: {
    type: Array,
  },
  listed_date: {
    type: Number,
  },
  price: {
    type: Number,
  },
  is_for_sale: {
    type: Boolean,
  },
  nft_owner: {
    type: String,
  },
  highest_bid: {
    type: Number,
  },
  is_locked: {
    type: Boolean,
  },
  traits: {
    type: Map,
    of: String,
  },
});

const NFTQueueSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
});
const NFTQueueScanAllSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
});

const ImagesSchema = new mongoose.Schema({
  input: {
    type: String,
  },
  isCloudFlare: {
    type: Boolean,
  },
  locationOrigin: {
    type: String,
  },
  location1440: {
    type: String,
  },
  location1920: {
    type: String,
  },
  location1024: {
    type: String,
  },
  location500: {
    type: String,
  },
  location100: {
    type: String,
  },
});

const ImageQueueSchema = new mongoose.Schema({
  input: {
    type: String,
  },
  is1024: {
    type: Boolean,
  },
  is1440: {
    type: Boolean,
  },
  is1920: {
    type: Boolean,
  },
  is500: {
    type: Boolean,
  },
  is100: {
    type: Boolean,
  },
  imageType: {
    type: String,
  },
  metadata: {
    type: String,
  },
});

const ImageRemoveQueueSchema = new mongoose.Schema({
  input: {
    type: String,
  },
});

const JSONSchema = new mongoose.Schema({
  input: {
    type: String,
  },
  location: {
    type: String,
  },
});

const JSONQueueSchema = new mongoose.Schema({
  input: {
    type: String,
  },
});

const BidsSchema = new mongoose.Schema({
  nftContractAddress: {
    type: String,
  },
  seller: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
  bidder: {
    type: String,
  },
  bid_date: {
    type: Number,
  },
  bid_value: {
    type: Number,
  },
});

const BidQueueSchema = new mongoose.Schema({
  nftContractAddress: {
    type: String,
  },
  seller: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
});

const NewListEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  trader: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
  price: {
    type: Number,
  },
});
const UnListEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  trader: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
});

const PurchaseEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  buyer: {
    type: String,
  },
  seller: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
  price: {
    type: Number,
  },
  platformFee: {
    type: Number,
  },
  royaltyFee: {
    type: Number,
  },
});

const BidWinEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  buyer: {
    type: String,
  },
  seller: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
  price: {
    type: Number,
  },
  platformFee: {
    type: Number,
  },
  royaltyFee: {
    type: Number,
  },
});

const StakingEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  eventName: {
    type: String,
  },
  staker: {
    type: String,
  },
  tokenID: {
    type: Number,
  },
});

const CollectionEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  collectionOwner: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  contractType: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  showOnChainMetadata: {
    type: Boolean,
  },
});
const MintingEventSchema = new mongoose.Schema({
  nftContractAddress: {
    type: String,
  },
  minterAddress: {
    type: String,
  },
  phaseId: {
    type: Number,
  },
  mintAmount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  projectMintFee: {
    type: Number,
  },
});
const ScannedBlocksSchema = new mongoose.Schema({
  lastScanned: {
    type: Boolean,
  },
  blockNumber: {
    type: Number,
  },
});
const RewardQueueSchema = new mongoose.Schema({
  status: {
    type: Number,
  },
  staker: {
    type: String,
  },
  stakedAmount: {
    type: Number,
  },
  rewardAmount: {
    type: Number,
  },
  transaction: {
    type: String,
  },
  transferTime: {
    type: String,
  },
  createdTime: {
    type: String,
  },
  updatedTime: {
    type: String,
  },
});

const ClaimRewardEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  staker: {
    type: String,
  },
  stakedAmount: {
    type: Number,
  },
  rewardAmount: {
    type: Number,
  },
});
const AddRewardEventSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
  },
  totalStakedAmount: {
    type: Number,
  },
  rewardAmount: {
    type: Number,
  },
});
module.exports = {
  Collections: mongoose.model("Collections", CollectionsSchema),
  CollectionQueue: mongoose.model("CollectionQueue", CollectionQueueSchema),
  Projects: mongoose.model("Projects", ProjectsSchema),
  ProjectQueue: mongoose.model("ProjectQueue", ProjectQueueSchema),
  NFTQueue: mongoose.model("NFTQueue", NFTQueueSchema),
  NFTQueueAll: mongoose.model("NFTQueueAll", NFTQueueScanAllSchema),
  NFTs: mongoose.model("NFTs", NFTsSchema),
  ImageRemoveQueue: mongoose.model("ImageRemoveQueue", ImageRemoveQueueSchema),
  ImageQueue: mongoose.model("ImageQueue", ImageQueueSchema),
  Images: mongoose.model("Images", ImagesSchema),
  JSON: mongoose.model("JSON", JSONSchema),
  JSONQueue: mongoose.model("JSONQueue", JSONQueueSchema),
  Bids: mongoose.model("Bids", BidsSchema),
  BidQueue: mongoose.model("BidQueue", BidQueueSchema),
  NewListEvent: mongoose.model("NewListEvent", NewListEventSchema),
  MintingEvent: mongoose.model("MintingEvent", MintingEventSchema),
  UnListEvent: mongoose.model("UnListEvent", UnListEventSchema),
  PurchaseEvent: mongoose.model("PurchaseEvent", PurchaseEventSchema),
  BidWinEvent: mongoose.model("BidWinEvent", BidWinEventSchema),
  ScannedBlocks: mongoose.model("ScannedBlocks", ScannedBlocksSchema),
  StakingEvent: mongoose.model("StakingEvent", StakingEventSchema),
  CollectionEvent: mongoose.model("CollectionEvent", CollectionEventSchema),
  RewardQueue: mongoose.model("RewardQueue", RewardQueueSchema),
  ClaimRewardEvent: mongoose.model("ClaimRewardEvent", ClaimRewardEventSchema),
  AddRewardEvent: mongoose.model("AddRewardEvent", AddRewardEventSchema),
};
