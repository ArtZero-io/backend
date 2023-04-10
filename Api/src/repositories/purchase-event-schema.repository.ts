import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {purchaseevents, PurchaseEventSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class PurchaseEventSchemaRepository extends DefaultCrudRepository<
    purchaseevents,
    typeof purchaseevents.prototype._id,
    PurchaseEventSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(purchaseevents, dataSource);
    }
}
