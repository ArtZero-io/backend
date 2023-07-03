import {Model, model, property} from '@loopback/repository';

@model()
export class ObjTransfer extends Model {
  @property({
    type: 'string',
  })
  from?: string;

  @property({
    type: 'string',
  })
  to?: string;

  @property({
    type: 'string',
  })
  id?: string;


  constructor(data?: Partial<ObjTransfer>) {
    super(data);
  }
}

export interface ObjTransferRelations {
  // describe navigational properties here
}

export type ObjTransferWithRelations = ObjTransfer & ObjTransferRelations;
