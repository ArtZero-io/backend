import {Entity, model, property} from '@loopback/repository';

@model()
export class imagequeues extends Entity {
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
    type: 'boolean',
  })
  is1024?: boolean;

  @property({
    type: 'boolean',
  })
  is1440?: boolean;

  @property({
    type: 'boolean',
  })
  is1920?: boolean;

  @property({
    type: 'boolean',
  })
  is500?: boolean;

  @property({
    type: 'boolean',
  })
  is100?: boolean;

  @property({
    type: 'string',
  })
  imageType?: string;

  @property({
    type: 'string',
  })
  metadata?: string;

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


  constructor(data?: Partial<imagequeues>) {
    super(data);
  }
}

export interface ImageQueueSchemaRelations {
  // describe navigational properties here
}

export type ImageQueueSchemaWithRelations = imagequeues & ImageQueueSchemaRelations;
