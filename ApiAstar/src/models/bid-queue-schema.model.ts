import {Entity, model, property} from '@loopback/repository';

@model()
export class bidqueues extends Entity {
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


  constructor(data?: Partial<bidqueues>) {
    super(data);
  }
}

export interface BidQueueSchemaRelations {
  // describe navigational properties here
}

export type BidQueueSchemaWithRelations = bidqueues & BidQueueSchemaRelations;
