import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {imageremovequeues, ImageRemoveQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ImageRemoveQueueSchemaRepository extends DefaultCrudRepository<
    imageremovequeues,
    typeof imageremovequeues.prototype._id,
    ImageRemoveQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(imageremovequeues, dataSource);
    }
}
