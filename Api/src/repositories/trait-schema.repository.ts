import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {traits, TraitSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class TraitSchemaRepository extends DefaultCrudRepository<
  traits,
  typeof traits.prototype.id,
  TraitSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(traits, dataSource);
  }
}
