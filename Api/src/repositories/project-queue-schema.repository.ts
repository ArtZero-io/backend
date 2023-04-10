import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {projectqueues, ProjectQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ProjectQueueSchemaRepository extends DefaultCrudRepository<
    projectqueues,
    typeof projectqueues.prototype._id,
    ProjectQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(projectqueues, dataSource);
    }
}
