import {Entity, model, property} from '@loopback/repository';

@model()
export class projectqueues extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

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


  constructor(data?: Partial<projectqueues>) {
    super(data);
  }
}

export interface ProjectQueueSchemaRelations {
  // describe navigational properties here
}

export type ProjectQueueSchemaWithRelations = projectqueues & ProjectQueueSchemaRelations;
