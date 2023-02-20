import {Entity, model, property} from '@loopback/repository';

@model()
export class nftqueues extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

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


  constructor(data?: Partial<nftqueues>) {
    super(data);
  }
}

export interface NftQueueSchemaRelations {
  // describe navigational properties here
}

export type NftQueueSchemaWithRelations = nftqueues & NftQueueSchemaRelations;
