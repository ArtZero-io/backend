import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {projectqueues, ProjectQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ProjectQueueSchemaRepository extends DefaultCrudRepository<
    projectqueues,
    typeof projectqueues.prototype._id,
    ProjectQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(projectqueues, dataSource);
    }
}
