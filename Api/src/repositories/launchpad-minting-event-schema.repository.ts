import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {launchpadmintingevents, LaunchpadMintingEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class LaunchpadMintingEventSchemaRepository extends DefaultCrudRepository<
    launchpadmintingevents,
    typeof launchpadmintingevents.prototype._id,
    LaunchpadMintingEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(launchpadmintingevents, dataSource);
    }
}
