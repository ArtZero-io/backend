import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {images, ImagesSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ImagesSchemaRepository extends DefaultCrudRepository<
    images,
    typeof images.prototype._id,
    ImagesSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(images, dataSource);
    }
}
