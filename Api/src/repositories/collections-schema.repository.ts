import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collections, CollectionsSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class CollectionsSchemaRepository extends DefaultCrudRepository<
  collections,
  typeof collections.prototype.id,
  CollectionsSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(collections, dataSource);
  }
}
