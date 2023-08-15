import {Model, model, property} from '@loopback/repository';

@model()
export class ObjRegister extends Model {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  from?: string;

  @property({
    type: 'number',
  })
  registrationTimestamp?: number;

  @property({
    type: 'number',
  })
  expirationTimestamp?: number;


  constructor(data?: Partial<ObjRegister>) {
    super(data);
  }
}

export interface ObjRegisterRelations {
  // describe navigational properties here
}

export type ObjRegisterWithRelations = ObjRegister & ObjRegisterRelations;
