import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collectionevents, CollectionEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class CollectionEventSchemaRepository extends DefaultCrudRepository<
    collectionevents,
    typeof collectionevents.prototype._id,
    CollectionEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(collectionevents, dataSource);
    }
}
