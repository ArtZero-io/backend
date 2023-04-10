import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BlackList, BlackListRelations} from '../models';
import {AstarDbDatasource} from "../datasources";
import * as dotenv from 'dotenv';

dotenv.config();

export class BlackListRepository extends DefaultCrudRepository<
    BlackList,
    typeof BlackList.prototype._id,
    BlackListRelations
> {
    constructor(
        @inject(`datasources.${process.env.DB_NAME}`) dataSource: AstarDbDatasource,
    ) {
        super(BlackList, dataSource);
    }
}
