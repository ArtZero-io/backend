import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nftqueues, NftQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class NftQueueSchemaRepository extends DefaultCrudRepository<
    nftqueues,
    typeof nftqueues.prototype._id,
    NftQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(nftqueues, dataSource);
    }
}
