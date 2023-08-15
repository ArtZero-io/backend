import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectWhitelistQueues, ProjectWhitelistQueuesRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ProjectWhitelistQueuesRepository extends DefaultCrudRepository<
  ProjectWhitelistQueues,
  typeof ProjectWhitelistQueues.prototype._id,
  ProjectWhitelistQueuesRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(ProjectWhitelistQueues, dataSource);
  }
}
