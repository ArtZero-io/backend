import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BlackList, BlackListRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class BlackListRepository extends DefaultCrudRepository<
  BlackList,
  typeof BlackList.prototype._id,
  BlackListRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(BlackList, dataSource);
  }
}
