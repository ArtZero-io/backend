import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bids, BidsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class BidsSchemaRepository extends DefaultCrudRepository<
    bids,
    typeof bids.prototype._id,
    BidsSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(bids, dataSource);
    }
}
