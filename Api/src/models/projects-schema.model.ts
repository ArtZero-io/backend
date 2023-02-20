import {Entity, model, property} from '@loopback/repository';

@model()
export class projects extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  index?: number;

  @property({
    type: 'string',
  })
  collectionOwner?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  teamMembers?: string;

  @property({
    type: 'string',
  })
  roadmaps?: string;

  @property({
    type: 'string',
  })
  avatarImage?: string;

  @property({
    type: 'string',
  })
  squareImage?: string;

  @property({
    type: 'string',
  })
  headerImage?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  twitter?: string;

  @property({
    type: 'string',
  })
  discord?: string;

  @property({
    type: 'number',
  })
  startTime?: number;

  @property({
    type: 'number',
  })
  endTime?: number;

  @property({
    type: 'number',
  })
  nft_count?: number;

  @property({
    type: 'string',
  })
  nftName?: string;

  @property({
    type: 'string',
  })
  nftSymbol?: string;

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


  constructor(data?: Partial<projects>) {
    super(data);
  }
}

export interface ProjectsSchemaRelations {
  // describe navigational properties here
}

export type ProjectsSchemaWithRelations = projects & ProjectsSchemaRelations;
