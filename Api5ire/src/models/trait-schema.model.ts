import {Entity, model, property} from '@loopback/repository';

@model()
export class traits extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  count?: number;

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


  constructor(data?: Partial<traits>) {
    super(data);
  }
}

export interface TraitSchemaRelations {
  // describe navigational properties here
}

export type TraitSchemaWithRelations = traits & TraitSchemaRelations;
