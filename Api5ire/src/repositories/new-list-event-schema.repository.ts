import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {newlistevents, NewListEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class NewListEventSchemaRepository extends DefaultCrudRepository<
  newlistevents,
  typeof newlistevents.prototype._id,
  NewListEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(newlistevents, dataSource);
  }
}
