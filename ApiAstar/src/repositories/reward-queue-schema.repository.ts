import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {rewardqueues, RewardQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class RewardQueueSchemaRepository extends DefaultCrudRepository<
    rewardqueues,
    typeof rewardqueues.prototype._id,
    RewardQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(rewardqueues, dataSource);
    }
}
