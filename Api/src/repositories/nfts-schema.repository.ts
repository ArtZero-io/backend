import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nfts, NfTsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class NftsSchemaRepository extends DefaultCrudRepository<
    nfts,
    typeof nfts.prototype._id,
    NfTsSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(nfts, dataSource);
    }
}
