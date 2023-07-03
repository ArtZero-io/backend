import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ArtZeroDbDataSource} from '../datasources';
import {addrewardevents, AddRewardEventSchemaRelations} from '../models';

export class AddRewardEventSchemaRepository extends DefaultCrudRepository<
  addrewardevents,
  typeof addrewardevents.prototype._id,
  AddRewardEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(addrewardevents, dataSource);
  }
}
