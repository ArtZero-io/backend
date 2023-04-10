import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collectionqueues, CollectionQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class CollectionQueueSchemaRepository extends DefaultCrudRepository<
    collectionqueues,
    typeof collectionqueues.prototype._id,
    CollectionQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(collectionqueues, dataSource);
    }
}
