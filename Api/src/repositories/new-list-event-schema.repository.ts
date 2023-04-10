import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {newlistevents, NewListEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class NewListEventSchemaRepository extends DefaultCrudRepository<
    newlistevents,
    typeof newlistevents.prototype._id,
    NewListEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(newlistevents, dataSource);
    }
}
