import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bids, BidsSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class BidsSchemaRepository extends DefaultCrudRepository<
  bids,
  typeof bids.prototype._id,
  BidsSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(bids, dataSource);
  }
}
