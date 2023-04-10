import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collectionqueues, CollectionQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class CollectionQueueSchemaRepository extends DefaultCrudRepository<
    collectionqueues,
    typeof collectionqueues.prototype._id,
    CollectionQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(collectionqueues, dataSource);
    }
}
