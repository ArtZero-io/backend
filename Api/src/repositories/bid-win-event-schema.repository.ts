import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bidwinevents, BidWinEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class BidWinEventSchemaRepository extends DefaultCrudRepository<
  bidwinevents,
  typeof bidwinevents.prototype._id,
  BidWinEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(bidwinevents, dataSource);
  }
}
