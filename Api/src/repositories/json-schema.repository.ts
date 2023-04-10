import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {jsons, JsonSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class JsonSchemaRepository extends DefaultCrudRepository<
    jsons,
    typeof jsons.prototype._id,
    JsonSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(jsons, dataSource);
    }
}
