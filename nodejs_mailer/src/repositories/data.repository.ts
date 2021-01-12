import {DefaultCrudRepository} from '@loopback/repository';
import {Data, DataRelations} from '../models';
import {DatasourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DataRepository extends DefaultCrudRepository<
  Data,
  typeof Data.prototype.id,
  DataRelations
> {
  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
  ) {
    super(Data, dataSource);
  }
}
