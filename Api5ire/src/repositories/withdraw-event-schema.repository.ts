import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {withdrawevents, WithdrawEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class WithdrawEventSchemaRepository extends DefaultCrudRepository<
  withdrawevents,
  typeof withdrawevents.prototype._id,
  WithdrawEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(withdrawevents, dataSource);
  }
}
