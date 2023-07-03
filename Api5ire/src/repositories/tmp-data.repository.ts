import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TmpData, TmpDataRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class TmpDataRepository extends DefaultCrudRepository<
  TmpData,
  typeof TmpData.prototype.id,
  TmpDataRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(TmpData, dataSource);
  }
}
