import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {claimrewardevents, ClaimRewardEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ClaimRewardEventSchemaRepository extends DefaultCrudRepository<
  claimrewardevents,
  typeof claimrewardevents.prototype._id,
  ClaimRewardEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(claimrewardevents, dataSource);
  }
}
