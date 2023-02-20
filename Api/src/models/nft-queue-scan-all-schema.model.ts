import {Entity, model, property} from '@loopback/repository';

@model()
export class nftqueuealls extends Entity {
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


  constructor(data?: Partial<nftqueuealls>) {
    super(data);
  }
}

export interface NftQueueScanAllSchemaRelations {
  // describe navigational properties here
}

export type NftQueueScanAllSchemaWithRelations = nftqueuealls & NftQueueScanAllSchemaRelations;
