import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {images, ImagesSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ImagesSchemaRepository extends DefaultCrudRepository<
    images,
    typeof images.prototype._id,
    ImagesSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(images, dataSource);
    }
}
