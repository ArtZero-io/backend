import {Model, model, property} from '@loopback/repository';

@model()
export class WhiteListUserData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
  })
  phaseId?: number;

  @property({
    type: 'number',
  })
  whitelistAmount?: number;

  @property({
    type: 'number',
  })
  claimedAmount?: number;

  @property({
    type: 'number',
  })
  mintingFee?: number;

  @property({
    type: 'number',
  })
  userPublicClaimedAmount?: number;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;

  constructor(data?: Partial<WhiteListUserData>) {
    super(data);
  }
}

export interface WhiteListDataRelations {
  // describe navigational properties here
}

export type WhiteListDataWithRelations = WhiteListUserData & WhiteListDataRelations;
