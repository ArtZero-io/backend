import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {withdrawevents, WithdrawEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class WithdrawEventSchemaRepository extends DefaultCrudRepository<
    withdrawevents,
    typeof withdrawevents.prototype._id,
    WithdrawEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(withdrawevents, dataSource);
    }
}
