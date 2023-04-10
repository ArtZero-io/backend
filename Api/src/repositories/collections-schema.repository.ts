import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collections, CollectionsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class CollectionsSchemaRepository extends DefaultCrudRepository<
    collections,
    typeof collections.prototype._id,
    CollectionsSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(collections, dataSource);
    }
}
