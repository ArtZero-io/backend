import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {bidwinevents, BidWinEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class BidWinEventSchemaRepository extends DefaultCrudRepository<
    bidwinevents,
    typeof bidwinevents.prototype._id,
    BidWinEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(bidwinevents, dataSource);
    }
}
