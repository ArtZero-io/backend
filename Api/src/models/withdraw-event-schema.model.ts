import {Entity, model, property} from '@loopback/repository';

@model()
export class withdrawevents extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
  })
  blockNumber?: number;

  @property({
    type: 'string',
  })
  receiver?: string;

  @property({
    type: 'string',
  })
  nftContractAddress: string;

  @property({
    type: 'number',
  })
  withdrawAmount?: number;

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


  constructor(data?: Partial<withdrawevents>) {
    super(data);
  }
}

export interface WithdrawEventSchemaRelations {
  // describe navigational properties here
}

export type WithdrawEventSchemaWithRelations = withdrawevents & WithdrawEventSchemaRelations;
