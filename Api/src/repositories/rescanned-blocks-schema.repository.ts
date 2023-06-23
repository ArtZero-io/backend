import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {rescannedblocks, ReScannedBlocksSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ReScannedBlocksSchemaRepository extends DefaultCrudRepository<
  rescannedblocks,
  typeof rescannedblocks.prototype._id,
  ReScannedBlocksSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(rescannedblocks, dataSource);
  }
}
