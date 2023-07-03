import {Model, model, property} from '@loopback/repository';

@model()
export class WhiteListPhaseData extends Model {
  @property({
    type: 'number',
  })
  publicClaimedAmount?: number;

  @property({
    type: 'number',
  })
  publicRemainAmount?: number;

  @property({
    type: 'number',
  })
  publicMintingFee?: number;

  @property({
    type: 'number',
  })
  publicMintingAmount?: number;

  @property({
    type: 'number',
  })
  publicMaxMintingAmount?: number;

  @property({
    type: 'number',
  })
  totalCountWLAddress?: number;

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
  totalAmount?: number;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'boolean',
  })
  isPublic?: boolean;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'number',
  })
  startTime?: number;

  @property({
    type: 'number',
  })
  endTime?: number;


  @property({
    type: 'object',
  })
  projectData?: object;


  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;
  constructor(data?: Partial<WhiteListPhaseData>) {
    super(data);
  }
}

export interface WhiteListPhaseDataRelations {
  // describe navigational properties here
}

export type WhiteListPhaseDataWithRelations = WhiteListPhaseData & WhiteListPhaseDataRelations;
