import {Entity, model, property} from '@loopback/repository';

@model()
export class claimrewardevents extends Entity {
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
  staker?: string;

  @property({
    type: 'number',
  })
  stakedAmount?: number;

  @property({
    type: 'number',
  })
  rewardAmount?: number;

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


  constructor(data?: Partial<claimrewardevents>) {
    super(data);
  }
}

export interface ClaimRewardEventSchemaRelations {
  // describe navigational properties here
}

export type ClaimRewardEventSchemaWithRelations = claimrewardevents & ClaimRewardEventSchemaRelations;
