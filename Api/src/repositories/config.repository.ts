import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Config, ConfigRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigRepository extends DefaultCrudRepository<
    Config,
    typeof Config.prototype._id,
    ConfigRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(Config, dataSource);
    }
}
