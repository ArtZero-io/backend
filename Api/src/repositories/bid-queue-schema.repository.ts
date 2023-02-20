import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bidqueues, BidQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class BidQueueSchemaRepository extends DefaultCrudRepository<
  bidqueues,
  typeof bidqueues.prototype.id,
  BidQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(bidqueues, dataSource);
  }
}
