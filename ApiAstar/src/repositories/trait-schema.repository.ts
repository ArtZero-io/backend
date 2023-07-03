import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {traits, TraitSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class TraitSchemaRepository extends DefaultCrudRepository<
    traits,
    typeof traits.prototype._id,
    TraitSchemaRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(traits, dataSource);
    }
}
