import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bidqueues, BidQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class BidQueueSchemaRepository extends DefaultCrudRepository<
    bidqueues,
    typeof bidqueues.prototype._id,
    BidQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(bidqueues, dataSource);
    }
}
