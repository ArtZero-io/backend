import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bids, BidsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class BidsSchemaRepository extends DefaultCrudRepository<
    bids,
    typeof bids.prototype._id,
    BidsSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(bids, dataSource);
    }
}
