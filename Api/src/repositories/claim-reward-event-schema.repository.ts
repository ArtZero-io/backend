import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {claimrewardevents, ClaimRewardEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ClaimRewardEventSchemaRepository extends DefaultCrudRepository<
    claimrewardevents,
    typeof claimrewardevents.prototype._id,
    ClaimRewardEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(claimrewardevents, dataSource);
    }
}
