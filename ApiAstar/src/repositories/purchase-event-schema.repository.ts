import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {purchaseevents, PurchaseEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class PurchaseEventSchemaRepository extends DefaultCrudRepository<
    purchaseevents,
    typeof purchaseevents.prototype._id,
    PurchaseEventSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(purchaseevents, dataSource);
    }
}
