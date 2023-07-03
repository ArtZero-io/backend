import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {projects, ProjectsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ProjectsSchemaRepository extends DefaultCrudRepository<
    projects,
    typeof projects.prototype._id,
    ProjectsSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(projects, dataSource);
    }
}
