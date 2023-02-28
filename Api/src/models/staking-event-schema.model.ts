import {Entity, model, property} from '@loopback/repository';

@model()
export class stakingevents extends Entity {
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
  eventName?: string;

  @property({
    type: 'string',
  })
  staker?: string;

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


  constructor(data?: Partial<stakingevents>) {
    super(data);
  }
}

export interface StakingEventSchemaRelations {
  // describe navigational properties here
}

export type StakingEventSchemaWithRelations = stakingevents & StakingEventSchemaRelations;
