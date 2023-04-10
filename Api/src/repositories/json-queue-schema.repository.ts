import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {jsonqueues, JsonQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class JsonQueueSchemaRepository extends DefaultCrudRepository<
    jsonqueues,
    typeof jsonqueues.prototype._id,
    JsonQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(jsonqueues, dataSource);
    }
}
