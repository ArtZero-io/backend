import {Model, model, property} from '@loopback/repository';

@model()
export class JobData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  cronTime: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'string',
    required: true,
  })
  nodeId: string;


  constructor(data?: Partial<JobData>) {
    super(data);
  }
}

export interface JobDataRelations {
  // describe navigational properties here
}

export type JobDataWithRelations = JobData & JobDataRelations;
