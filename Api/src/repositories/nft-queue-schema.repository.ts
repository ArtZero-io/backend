import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nftqueues, NftQueueSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class NftQueueSchemaRepository extends DefaultCrudRepository<
    nftqueues,
    typeof nftqueues.prototype._id,
    NftQueueSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(nftqueues, dataSource);
    }
}
