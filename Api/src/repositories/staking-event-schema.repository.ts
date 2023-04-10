import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {stakingevents, StakingEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class StakingEventSchemaRepository extends DefaultCrudRepository<
    stakingevents,
    typeof stakingevents.prototype._id,
    StakingEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(stakingevents, dataSource);
    }
}
