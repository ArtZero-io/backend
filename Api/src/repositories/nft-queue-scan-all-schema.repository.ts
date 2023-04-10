import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nftqueuealls, NftQueueScanAllSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class NftQueueScanAllSchemaRepository extends DefaultCrudRepository<
    nftqueuealls,
    typeof nftqueuealls.prototype._id,
    NftQueueScanAllSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(nftqueuealls, dataSource);
    }
}
