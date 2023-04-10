import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {jsons, JsonSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class JsonSchemaRepository extends DefaultCrudRepository<
    jsons,
    typeof jsons.prototype._id,
    JsonSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(jsons, dataSource);
    }
}
