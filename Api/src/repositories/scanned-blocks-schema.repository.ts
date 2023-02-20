import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {scannedblocks, ScannedBlocksSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ScannedBlocksSchemaRepository extends DefaultCrudRepository<
  scannedblocks,
  typeof scannedblocks.prototype.id,
  ScannedBlocksSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(scannedblocks, dataSource);
  }
}
