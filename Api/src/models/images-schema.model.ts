import {Entity, model, property} from '@loopback/repository';

@model()
export class images extends Entity {
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
    type: 'boolean',
  })
  isCloudFlare?: boolean;

  @property({
    type: 'string',
  })
  locationOrigin?: string;

  @property({
    type: 'string',
  })
  location1440?: string;

  @property({
    type: 'string',
  })
  location1920?: string;

  @property({
    type: 'string',
  })
  location1024?: string;

  @property({
    type: 'string',
  })
  location500?: string;

  @property({
    type: 'string',
  })
  location100?: string;

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


  constructor(data?: Partial<images>) {
    super(data);
  }
}

export interface ImagesSchemaRelations {
  // describe navigational properties here
}

export type ImagesSchemaWithRelations = images & ImagesSchemaRelations;
