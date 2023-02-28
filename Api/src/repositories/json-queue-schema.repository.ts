import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {jsonqueues, JsonQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class JsonQueueSchemaRepository extends DefaultCrudRepository<
  jsonqueues,
  typeof jsonqueues.prototype._id,
  JsonQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(jsonqueues, dataSource);
  }
}
