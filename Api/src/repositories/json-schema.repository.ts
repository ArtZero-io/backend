import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {jsons, JsonSchemaRelations} from '../models';
import {ArtZeroDbDataSource} from "../datasources";

export class JsonSchemaRepository extends DefaultCrudRepository<
  jsons,
  typeof jsons.prototype.id,
  JsonSchemaRelations
> {
  constructor(
    @inject('datasources.ArtZeroDB') dataSource: ArtZeroDbDataSource,
  ) {
    super(jsons, dataSource);
  }
}
