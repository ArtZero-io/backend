import {Entity, model, property} from '@loopback/repository';

@model()
export class purchaseevents extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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


  constructor(data?: Partial<purchaseevents>) {
    super(data);
  }
}

export interface PurchaseEventSchemaRelations {
  // describe navigational properties here
}

export type PurchaseEventSchemaWithRelations = purchaseevents & PurchaseEventSchemaRelations;
