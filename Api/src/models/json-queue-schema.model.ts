import {Entity, model, property} from '@loopback/repository';

@model()
export class jsonqueues extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  input?: string;

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


  constructor(data?: Partial<jsonqueues>) {
    super(data);
  }
}

export interface JsonQueueSchemaRelations {
  // describe navigational properties here
}

export type JsonQueueSchemaWithRelations = jsonqueues & JsonQueueSchemaRelations;
