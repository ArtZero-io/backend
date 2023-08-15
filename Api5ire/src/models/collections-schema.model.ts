import {Entity, model, property} from '@loopback/repository';

@model()
export class collections extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'number',
  })
  index?: number;

  @property({
    type: 'string',
  })
  collectionOwner?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'string',
  })
  contractType?: string;

  @property({
    type: 'boolean',
  })
  isCollectRoyaltyFee?: boolean;

  @property({
    type: 'number',
  })
  royaltyFee?: number;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'boolean',
  })
  showOnChainMetadata?: boolean;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  avatarImage?: string;

  @property({
    type: 'string',
  })
  squareImage?: string;

  @property({
    type: 'string',
  })
  headerImage?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  twitter?: string;

  @property({
    type: 'string',
  })
  discord?: string;

  @property({
    type: 'string',
  })
  telegram?: string;

  @property({
    type: 'string',
  })
  abi_file?: string;

  @property({
    type: 'number',
  })
  volume?: number;

  @property({
    type: 'number',
  })
  nft_count?: number;

  @property({
    type: 'number',
  })
  maxTotalSupply?: number;

  @property({
    type: 'boolean',
  })
  isDoxxed?: boolean;

  @property({
    type: 'boolean',
  })
  isDuplicationChecked?: boolean;

  @property({
    type: 'object',
  })
  rarityTable?: object;

  @property({
    type: 'object',
  })
  dataObject?: object;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<collections>) {
    super(data);
  }
}

export interface CollectionsSchemaRelations {
  // describe navigational properties here
}

export type CollectionsSchemaWithRelations = collections & CollectionsSchemaRelations;
