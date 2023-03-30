import {Entity, model, property} from '@loopback/repository';

@model()
export class BlackList extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nftContractAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  typeName: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

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
  constructor(data?: Partial<BlackList>) {
    super(data);
  }
}

export interface BlackListRelations {
  // describe navigational properties here
}

export type BlackListWithRelations = BlackList & BlackListRelations;
