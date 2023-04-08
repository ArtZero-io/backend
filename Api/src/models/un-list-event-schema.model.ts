import {Entity, model, property} from '@loopback/repository';

@model()
export class unlistevents extends Entity {
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
  trader?: string;

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


  constructor(data?: Partial<unlistevents>) {
    super(data);
  }
}

export interface UnListEventSchemaRelations {
  // describe navigational properties here
}

export type UnListEventSchemaWithRelations = unlistevents & UnListEventSchemaRelations;
