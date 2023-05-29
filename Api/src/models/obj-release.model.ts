import {Model, model, property} from '@loopback/repository';

@model()
export class ObjRelease extends Model {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  from?: string;


  constructor(data?: Partial<ObjRelease>) {
    super(data);
  }
}

export interface ObjReleaseRelations {
  // describe navigational properties here
}

export type ObjReleaseWithRelations = ObjRelease & ObjReleaseRelations;
