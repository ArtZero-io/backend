import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {imagequeues, ImageQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ImageQueueSchemaRepository extends DefaultCrudRepository<
    imagequeues,
    typeof imagequeues.prototype._id,
    ImageQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(imagequeues, dataSource);
    }
}
