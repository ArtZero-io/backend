import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {scannedblocks, ScannedBlocksSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class ScannedBlocksSchemaRepository extends DefaultCrudRepository<
    scannedblocks,
    typeof scannedblocks.prototype._id,
    ScannedBlocksSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(scannedblocks, dataSource);
    }
}
