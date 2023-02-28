import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collectionevents, CollectionEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class CollectionEventSchemaRepository extends DefaultCrudRepository<
  collectionevents,
  typeof collectionevents.prototype._id,
  CollectionEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(collectionevents, dataSource);
  }
}
