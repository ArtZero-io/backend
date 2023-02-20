import {Entity, model, property} from '@loopback/repository';

@model()
export class imageremovequeues extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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


  constructor(data?: Partial<imageremovequeues>) {
    super(data);
  }
}

export interface ImageRemoveQueueSchemaRelations {
  // describe navigational properties here
}

export type ImageRemoveQueueSchemaWithRelations = imageremovequeues & ImageRemoveQueueSchemaRelations;
