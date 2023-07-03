import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collections, CollectionsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class CollectionsSchemaRepository extends DefaultCrudRepository<
    collections,
    typeof collections.prototype._id,
    CollectionsSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(collections, dataSource);
    }
}
