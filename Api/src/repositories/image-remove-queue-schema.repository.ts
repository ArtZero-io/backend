import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {imageremovequeues, ImageRemoveQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ImageRemoveQueueSchemaRepository extends DefaultCrudRepository<
  imageremovequeues,
  typeof imageremovequeues.prototype.id,
  ImageRemoveQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(imageremovequeues, dataSource);
  }
}
