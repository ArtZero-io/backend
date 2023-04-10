import {Entity, model, property} from '@loopback/repository';

@model()
export class launchpadmintingevents extends Entity {
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
  nftContractAddress: string;

  @property({
    type: 'string',
  })
  mode?: string;

  @property({
    type: 'string',
  })
  minter?: string;

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
  mintingFee?: number;

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


  constructor(data?: Partial<launchpadmintingevents>) {
    super(data);
  }
}

export interface LaunchpadMintingEventSchemaRelations {
  // describe navigational properties here
}

export type LaunchpadMintingEventSchemaWithRelations = launchpadmintingevents & LaunchpadMintingEventSchemaRelations;
