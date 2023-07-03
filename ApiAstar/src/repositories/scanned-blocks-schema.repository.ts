import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {scannedblocks, ScannedBlocksSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class ScannedBlocksSchemaRepository extends DefaultCrudRepository<
    scannedblocks,
    typeof scannedblocks.prototype._id,
    ScannedBlocksSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(scannedblocks, dataSource);
    }
}
