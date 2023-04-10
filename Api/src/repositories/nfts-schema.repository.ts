import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {nfts, NfTsSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class NftsSchemaRepository extends DefaultCrudRepository<
    nfts,
    typeof nfts.prototype._id,
    NfTsSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(nfts, dataSource);
    }
}
