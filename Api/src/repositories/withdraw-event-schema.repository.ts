import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {withdrawevents, WithdrawEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class WithdrawEventSchemaRepository extends DefaultCrudRepository<
    withdrawevents,
    typeof withdrawevents.prototype._id,
    WithdrawEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(withdrawevents, dataSource);
    }
}
