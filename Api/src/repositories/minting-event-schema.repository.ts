import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {mintingevents, MintingEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class MintingEventSchemaRepository extends DefaultCrudRepository<
  mintingevents,
  typeof mintingevents.prototype._id,
  MintingEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(mintingevents, dataSource);
  }
}
