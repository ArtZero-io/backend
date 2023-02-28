import {Entity, model, property} from '@loopback/repository';

@model()
export class addrewardevents extends Entity {
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
    type: 'number',
  })
  totalStakedAmount?: number;

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

  constructor(data?: Partial<addrewardevents>) {
    super(data);
  }
}

export interface AddRewardEventSchemaRelations {
  // describe navigational properties here
}

export type AddRewardEventSchemaWithRelations = addrewardevents & AddRewardEventSchemaRelations;
