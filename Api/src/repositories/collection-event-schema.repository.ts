import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collectionevents, CollectionEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class CollectionEventSchemaRepository extends DefaultCrudRepository<
    collectionevents,
    typeof collectionevents.prototype._id,
    CollectionEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(collectionevents, dataSource);
    }
}
