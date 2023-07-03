import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {claimrewardevents, ClaimRewardEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ClaimRewardEventSchemaRepository extends DefaultCrudRepository<
    claimrewardevents,
    typeof claimrewardevents.prototype._id,
    ClaimRewardEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(claimrewardevents, dataSource);
    }
}
