import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nfts, NfTsSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class NftsSchemaRepository extends DefaultCrudRepository<
  nfts,
  typeof nfts.prototype.id,
  NfTsSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(nfts, dataSource);
  }
}
