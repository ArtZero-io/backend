import {Entity, model, property} from '@loopback/repository';

@model()
export class collectionqueues extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

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


  constructor(data?: Partial<collectionqueues>) {
    super(data);
  }
}

export interface CollectionQueueSchemaRelations {
  // describe navigational properties here
}

export type CollectionQueueSchemaWithRelations = collectionqueues & CollectionQueueSchemaRelations;
