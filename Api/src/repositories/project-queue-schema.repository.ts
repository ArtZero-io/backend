import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {projectqueues, ProjectQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ProjectQueueSchemaRepository extends DefaultCrudRepository<
  projectqueues,
  typeof projectqueues.prototype.id,
  ProjectQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(projectqueues, dataSource);
  }
}
