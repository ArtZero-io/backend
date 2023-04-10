import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {traits, TraitSchemaRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class TraitSchemaRepository extends DefaultCrudRepository<
    traits,
    typeof traits.prototype._id,
    TraitSchemaRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(traits, dataSource);
    }
}
