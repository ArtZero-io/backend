import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {images, ImagesSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ImagesSchemaRepository extends DefaultCrudRepository<
  images,
  typeof images.prototype.id,
  ImagesSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(images, dataSource);
  }
}
