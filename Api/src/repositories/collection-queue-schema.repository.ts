import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {collectionqueues, CollectionQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class CollectionQueueSchemaRepository extends DefaultCrudRepository<
  collectionqueues,
  typeof collectionqueues.prototype.id,
  CollectionQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(collectionqueues, dataSource);
  }
}
