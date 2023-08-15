import {Entity, model, property} from '@loopback/repository';
import {ObjRegister} from "./obj-register.model";
import {ObjRelease} from "./obj-release.model";
import {ObjTransfer} from "./obj-transfer.model";

@model()
export class AzeroDomainEvent extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  eventName: string;

  @property({
    type: 'string',
    required: true,
  })
  nftContractAddress: string;

  @property({
    type: 'number',
    required: true,
  })
  blockNumber: number;

  @property({
    type: 'object',
  })
  dataObject?: object;

  @property({
    type: 'string',
    required: true,
  })
  hashObject: string;

  @property({
    type: 'object',
  })
  objTransfer?: ObjTransfer;

  @property({
    type: 'object',
  })
  objRelease?: ObjRelease;

  @property({
    type: 'object',
  })
  objRegister?: ObjRegister;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<AzeroDomainEvent>) {
    super(data);
  }
}

export interface AzeroDomainEventRelations {
  // describe navigational properties here
}

export type AzeroDomainEventWithRelations = AzeroDomainEvent & AzeroDomainEventRelations;
