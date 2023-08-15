import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Config, ConfigRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class ConfigRepository extends DefaultCrudRepository<
  Config,
  typeof Config.prototype._id,
  ConfigRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(Config, dataSource);
  }
}
