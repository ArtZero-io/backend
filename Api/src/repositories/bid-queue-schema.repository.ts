import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bidqueues, BidQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class BidQueueSchemaRepository extends DefaultCrudRepository<
    bidqueues,
    typeof bidqueues.prototype._id,
    BidQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(bidqueues, dataSource);
    }
}
