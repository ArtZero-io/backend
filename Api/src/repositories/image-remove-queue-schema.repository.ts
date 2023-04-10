import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {imageremovequeues, ImageRemoveQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ImageRemoveQueueSchemaRepository extends DefaultCrudRepository<
    imageremovequeues,
    typeof imageremovequeues.prototype._id,
    ImageRemoveQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(imageremovequeues, dataSource);
    }
}
