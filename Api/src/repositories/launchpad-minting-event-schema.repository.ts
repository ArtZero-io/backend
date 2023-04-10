import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {launchpadmintingevents, LaunchpadMintingEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class LaunchpadMintingEventSchemaRepository extends DefaultCrudRepository<
    launchpadmintingevents,
    typeof launchpadmintingevents.prototype._id,
    LaunchpadMintingEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(launchpadmintingevents, dataSource);
    }
}
