import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {launchpadmintingevents, LaunchpadMintingEventSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class LaunchpadMintingEventSchemaRepository extends DefaultCrudRepository<
  launchpadmintingevents,
  typeof launchpadmintingevents.prototype._id,
  LaunchpadMintingEventSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(launchpadmintingevents, dataSource);
  }
}
