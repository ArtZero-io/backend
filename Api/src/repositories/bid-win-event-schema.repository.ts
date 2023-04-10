import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bidwinevents, BidWinEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class BidWinEventSchemaRepository extends DefaultCrudRepository<
    bidwinevents,
    typeof bidwinevents.prototype._id,
    BidWinEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(bidwinevents, dataSource);
    }
}
