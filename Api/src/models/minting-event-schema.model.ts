import {Entity, model, property} from '@loopback/repository';

@model()
export class mintingevents extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'string',
  })
  minterAddress?: string;

  @property({
    type: 'number',
  })
  phaseId?: number;

  @property({
    type: 'number',
  })
  mintAmount?: number;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'number',
  })
  projectMintFee?: number;

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


  constructor(data?: Partial<mintingevents>) {
    super(data);
  }
}

export interface MintingEventSchemaRelations {
  // describe navigational properties here
}

export type MintingEventSchemaWithRelations = mintingevents & MintingEventSchemaRelations;
