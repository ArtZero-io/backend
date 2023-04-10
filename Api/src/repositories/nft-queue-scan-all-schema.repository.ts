import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nftqueuealls, NftQueueScanAllSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class NftQueueScanAllSchemaRepository extends DefaultCrudRepository<
    nftqueuealls,
    typeof nftqueuealls.prototype._id,
    NftQueueScanAllSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(nftqueuealls, dataSource);
    }
}
