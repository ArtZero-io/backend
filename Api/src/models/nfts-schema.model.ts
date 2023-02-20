import {Entity, model, property} from '@loopback/repository';

@model()
export class nfts extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  nftName?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'string',
  })
  owner?: string;

  @property({
    type: 'number',
  })
  tokenID?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  attributes?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  attributesValue?: string;

  @property({
    type: 'number',
  })
  listed_date?: number;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'boolean',
  })
  is_for_sale?: boolean;

  @property({
    type: 'string',
  })
  nft_owner?: string;

  @property({
    type: 'number',
  })
  highest_bid?: number;

  @property({
    type: 'boolean',
  })
  is_locked?: boolean;

  @property({
    type: 'string',
  })
  traits?: string;

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


  constructor(data?: Partial<nfts>) {
    super(data);
  }
}

export interface NfTsSchemaRelations {
  // describe navigational properties here
}

export type NfTsSchemaWithRelations = nfts & NfTsSchemaRelations;
