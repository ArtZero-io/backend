import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {newlistevents, NewListEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class NewListEventSchemaRepository extends DefaultCrudRepository<
    newlistevents,
    typeof newlistevents.prototype._id,
    NewListEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(newlistevents, dataSource);
    }
}
