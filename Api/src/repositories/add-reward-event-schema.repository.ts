import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AstarDbDatasource} from '../datasources';
import {addrewardevents, AddRewardEventSchemaRelations} from '../models';
import * as dotenv from 'dotenv';

dotenv.config();

export class AddRewardEventSchemaRepository extends DefaultCrudRepository<
    addrewardevents,
    typeof addrewardevents.prototype._id,
    AddRewardEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(addrewardevents, dataSource);
    }
}
