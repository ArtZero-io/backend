import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {stakingevents, StakingEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class StakingEventSchemaRepository extends DefaultCrudRepository<
  stakingevents,
  typeof stakingevents.prototype._id,
  StakingEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(stakingevents, dataSource);
  }
}
