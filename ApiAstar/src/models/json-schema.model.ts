import {Entity, model, property} from '@loopback/repository';

@model()
export class jsons extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  input?: string;

  @property({
    type: 'string',
  })
  location?: string;

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


  constructor(data?: Partial<jsons>) {
    super(data);
  }
}

export interface JsonSchemaRelations {
  // describe navigational properties here
}

export type JsonSchemaWithRelations = jsons & JsonSchemaRelations;
