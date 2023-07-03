import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {projects, ProjectsSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ProjectsSchemaRepository extends DefaultCrudRepository<
  projects,
  typeof projects.prototype._id,
  ProjectsSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(projects, dataSource);
  }
}
