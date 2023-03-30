import {Entity, model, property} from '@loopback/repository';
import {MainConfig} from "../utils/Message";

@model()
export class Config extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  typeConfig: string;

  @property({
    type: 'string',
    required: true,
  })
  nodeIp: string;

  @property({
    type: 'string',
    required: true,
  })
  nodeCluster: string;

  @property({
    type: 'object',
  })
  mainConfig?: MainConfig;

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

  constructor(data?: Partial<Config>) {
    super(data);
  }
}

export interface ConfigRelations {
  // describe navigational properties here
}

export type ConfigWithRelations = Config & ConfigRelations;
