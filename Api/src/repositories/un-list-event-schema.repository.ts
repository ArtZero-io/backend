import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {unlistevents, UnListEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class UnListEventSchemaRepository extends DefaultCrudRepository<
    unlistevents,
    typeof unlistevents.prototype._id,
    UnListEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(unlistevents, dataSource);
    }
}
