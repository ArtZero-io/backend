import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {rewardqueues, RewardQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class RewardQueueSchemaRepository extends DefaultCrudRepository<
    rewardqueues,
    typeof rewardqueues.prototype._id,
    RewardQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(rewardqueues, dataSource);
    }
}
