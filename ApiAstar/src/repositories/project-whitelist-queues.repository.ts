import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectWhitelistQueues, ProjectWhitelistQueuesRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ProjectWhitelistQueuesRepository extends DefaultCrudRepository<
    ProjectWhitelistQueues,
    typeof ProjectWhitelistQueues.prototype._id,
    ProjectWhitelistQueuesRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(ProjectWhitelistQueues, dataSource);
    }
}
