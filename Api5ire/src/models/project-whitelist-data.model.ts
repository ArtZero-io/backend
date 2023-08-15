import {Model, model, property} from '@loopback/repository';
import {WhiteListUserData} from "./white-list-data.model";
import {WhiteListPhaseData} from "./white-list-phase-data.model";

@model()
export class ProjectWhitelistData extends Model {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  phaseId: number;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;

  @property({
    type: 'array',
    itemType: 'object',
  })
  userData?: WhiteListUserData[];

  @property({
    type: 'object',
  })
  phaseData?: WhiteListPhaseData;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;

  constructor(data?: Partial<ProjectWhitelistData>) {
    super(data);
  }
}

export interface ProjectWhitelistDataRelations {
  // describe navigational properties here
}

export type ProjectWhitelistDataWithRelations = ProjectWhitelistData & ProjectWhitelistDataRelations;
