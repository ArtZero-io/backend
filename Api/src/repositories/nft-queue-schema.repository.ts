import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nftqueues, NftQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class NftQueueSchemaRepository extends DefaultCrudRepository<
  nftqueues,
  typeof nftqueues.prototype.id,
  NftQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(nftqueues, dataSource);
  }
}
