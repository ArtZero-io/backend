import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {imagequeues, ImageQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ImageQueueSchemaRepository extends DefaultCrudRepository<
    imagequeues,
    typeof imagequeues.prototype._id,
    ImageQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(imagequeues, dataSource);
    }
}
