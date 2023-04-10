import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {unlistevents, UnListEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class UnListEventSchemaRepository extends DefaultCrudRepository<
    unlistevents,
    typeof unlistevents.prototype._id,
    UnListEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(unlistevents, dataSource);
    }
}
