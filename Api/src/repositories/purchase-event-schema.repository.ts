import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {purchaseevents, PurchaseEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class PurchaseEventSchemaRepository extends DefaultCrudRepository<
  purchaseevents,
  typeof purchaseevents.prototype.id,
  PurchaseEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(purchaseevents, dataSource);
  }
}
