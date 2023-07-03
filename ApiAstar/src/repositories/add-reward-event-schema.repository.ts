import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AstarDbDatasource} from '../datasources';
import {addrewardevents, AddRewardEventSchemaRelations} from '../models';

export class AddRewardEventSchemaRepository extends DefaultCrudRepository<
    addrewardevents,
    typeof addrewardevents.prototype._id,
    AddRewardEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(addrewardevents, dataSource);
    }
}
