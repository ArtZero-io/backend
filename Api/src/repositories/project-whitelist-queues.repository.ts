import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectWhitelistQueues, ProjectWhitelistQueuesRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ProjectWhitelistQueuesRepository extends DefaultCrudRepository<
    ProjectWhitelistQueues,
    typeof ProjectWhitelistQueues.prototype._id,
    ProjectWhitelistQueuesRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(ProjectWhitelistQueues, dataSource);
    }
}
