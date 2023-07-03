import {Entity, model, property} from '@loopback/repository';

@model()
export class bidwinevents extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'number',
  })
  blockNumber?: number;

  @property({
    type: 'string',
  })
  buyer?: string;

  @property({
    type: 'string',
  })
  seller?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

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
    type: 'number',
  })
  price?: number;

  @property({
    type: 'number',
  })
  platformFee?: number;

  @property({
    type: 'number',
  })
  royaltyFee?: number;

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


  constructor(data?: Partial<bidwinevents>) {
    super(data);
  }
}

export interface BidWinEventSchemaRelations {
  // describe navigational properties here
}

export type BidWinEventSchemaWithRelations = bidwinevents & BidWinEventSchemaRelations;
