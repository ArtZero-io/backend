import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {imagequeues, ImageQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ImageQueueSchemaRepository extends DefaultCrudRepository<
  imagequeues,
  typeof imagequeues.prototype._id,
  ImageQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(imagequeues, dataSource);
  }
}
