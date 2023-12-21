import {Entity, model, property} from '@loopback/repository';

@model()
export class eventteleQueue extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  _id: string;

  @property({
    type: 'number',
  })
  blockNumber?: number;

  @property({
    type: 'string',
  })
  eventName?: string;

  @property({
    type: 'string',
  })
  buyer?: string;

  @property({
    type: 'string',
  })
  staker?: string;

  @property({
    type: 'string',
  })
  seller?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'string',
  })
  azDomainName?: string;

  @property({
    type: 'number',
  })
  royaltyFee?: number;

  @property({
    type: 'number',
  })
  platformFee?: number;

  @property({
    type: 'string',
  })
  nftTokenId?: string;

  @property({
    type: 'string',
  })
  tokenID?: string;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<eventteleQueue>) {
    super(data);
  }
}

export interface EventTeleQueueSchemaRelations {
  // describe navigational properties here
}

export type EventTeleQueueSchemaWithRelations = eventteleQueue & EventTeleQueueSchemaRelations;
