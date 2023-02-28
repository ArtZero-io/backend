import {Entity, model, property} from '@loopback/repository';

@model()
export class rewardqueues extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
  })
  status?: number;

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
    type: 'string',
  })
  transaction?: string;

  @property({
    type: 'string',
  })
  transferTime?: string;

  @property({
    type: 'object',
  })
  dataObject?: object;

  @property({
    type: 'string',
  })
  createdTime?: string;

  @property({
    type: 'string',
  })
  updatedTime?: string;

  constructor(data?: Partial<rewardqueues>) {
    super(data);
  }
}

export interface RewardQueueSchemaRelations {
  // describe navigational properties here
}

export type RewardQueueSchemaWithRelations = rewardqueues & RewardQueueSchemaRelations;
