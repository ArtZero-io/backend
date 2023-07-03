import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BlackList, BlackListRelations} from '../models';
import {AstarDbDatasource} from "../datasources";

export class BlackListRepository extends DefaultCrudRepository<
    BlackList,
    typeof BlackList.prototype._id,
    BlackListRelations
> {
    constructor(
        @inject(`datasources.AstarDB`) dataSource: AstarDbDatasource,
    ) {
        super(BlackList, dataSource);
    }
}
