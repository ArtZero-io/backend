import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {projects, ProjectsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ProjectsSchemaRepository extends DefaultCrudRepository<
    projects,
    typeof projects.prototype._id,
    ProjectsSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(projects, dataSource);
    }
}
