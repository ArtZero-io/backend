import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Config, ConfigRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ConfigRepository extends DefaultCrudRepository<
    Config,
    typeof Config.prototype._id,
    ConfigRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(Config, dataSource);
    }
}
