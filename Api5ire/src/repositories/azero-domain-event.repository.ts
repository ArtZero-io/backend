import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzeroDomainEvent, AzeroDomainEventRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class AzeroDomainEventRepository extends DefaultCrudRepository<
  AzeroDomainEvent,
  typeof AzeroDomainEvent.prototype._id,
  AzeroDomainEventRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(AzeroDomainEvent, dataSource);
  }
}
