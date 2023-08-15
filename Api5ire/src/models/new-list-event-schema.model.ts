import {Entity, model, property} from '@loopback/repository';

@model()
export class newlistevents extends Entity {
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
  trader?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'number',
  })
  tokenID?: number;

  @property({
    type: 'string',
  })
  azDomainName?: string;

  @property({
    type: 'boolean',
  })
  isAzDomain?: boolean;

  @property({
    type: 'number',
  })
  price?: number;

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


  constructor(data?: Partial<newlistevents>) {
    super(data);
  }
}

export interface NewListEventSchemaRelations {
  // describe navigational properties here
}

export type NewListEventSchemaWithRelations = newlistevents & NewListEventSchemaRelations;
