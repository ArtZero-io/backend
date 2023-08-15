import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {rewardqueues, RewardQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class RewardQueueSchemaRepository extends DefaultCrudRepository<
  rewardqueues,
  typeof rewardqueues.prototype._id,
  RewardQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(rewardqueues, dataSource);
  }
}
