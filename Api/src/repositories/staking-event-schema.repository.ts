import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {stakingevents, StakingEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class StakingEventSchemaRepository extends DefaultCrudRepository<
    stakingevents,
    typeof stakingevents.prototype._id,
    StakingEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(stakingevents, dataSource);
    }
}
