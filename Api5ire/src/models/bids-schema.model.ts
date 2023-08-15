import {Entity, model, property} from '@loopback/repository';

@model()
export class bids extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'string',
  })
  seller?: string;

  @property({
    type: 'number',
  })
  tokenID?: number;

  @property({
    type: 'string',
  })
  azDomainName?: string;

  @property({
    type: 'boolean',
  })
  isAzDomain?: boolean;

  @property({
    type: 'string',
  })
  bidder?: string;

  @property({
    type: 'number',
  })
  bid_date?: number;

  @property({
    type: 'number',
  })
  bid_value?: number;

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


  constructor(data?: Partial<bids>) {
    super(data);
  }
}

export interface BidsSchemaRelations {
  // describe navigational properties here
}

export type BidsSchemaWithRelations = bids & BidsSchemaRelations;
