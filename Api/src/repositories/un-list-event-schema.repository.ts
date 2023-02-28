import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {unlistevents, UnListEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class UnListEventSchemaRepository extends DefaultCrudRepository<
  unlistevents,
  typeof unlistevents.prototype._id,
  UnListEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(unlistevents, dataSource);
  }
}
