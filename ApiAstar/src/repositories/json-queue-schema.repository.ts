import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {jsonqueues, JsonQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class JsonQueueSchemaRepository extends DefaultCrudRepository<
    jsonqueues,
    typeof jsonqueues.prototype._id,
    JsonQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(jsonqueues, dataSource);
    }
}
