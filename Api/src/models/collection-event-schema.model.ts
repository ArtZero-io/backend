import {Entity, model, property} from '@loopback/repository';

@model()
export class collectionevents extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  blockNumber?: number;

  @property({
    type: 'string',
  })
  collectionOwner?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'number',
  })
  contractType?: number;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'boolean',
  })
  showOnChainMetadata?: boolean;

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


  constructor(data?: Partial<collectionevents>) {
    super(data);
  }
}

export interface CollectionEventSchemaRelations {
  // describe navigational properties here
}

export type CollectionEventSchemaWithRelations = collectionevents & CollectionEventSchemaRelations;
