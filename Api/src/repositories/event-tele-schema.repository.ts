import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {eventteleQueue, EventTeleQueueSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from '../datasources';

export class EventTeleQueueSchemaRepository extends DefaultCrudRepository<
  eventteleQueue,
  EventTeleQueueSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(eventteleQueue, dataSource);
  }
}
