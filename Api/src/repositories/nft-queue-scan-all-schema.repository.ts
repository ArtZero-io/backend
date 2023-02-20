import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nftqueuealls, NftQueueScanAllSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class NftQueueScanAllSchemaRepository extends DefaultCrudRepository<
  nftqueuealls,
  typeof nftqueuealls.prototype.id,
  NftQueueScanAllSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(nftqueuealls, dataSource);
  }
}
