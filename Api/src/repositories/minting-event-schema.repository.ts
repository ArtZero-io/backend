import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {mintingevents, MintingEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class MintingEventSchemaRepository extends DefaultCrudRepository<
    mintingevents,
    typeof mintingevents.prototype._id,
    MintingEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(mintingevents, dataSource);
    }
}
