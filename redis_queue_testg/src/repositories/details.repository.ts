import {DefaultCrudRepository} from '@loopback/repository';
import {Details, DetailsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DetailsRepository extends DefaultCrudRepository<
  Details,
  typeof Details.prototype.id,
  DetailsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Details, dataSource);
  }
}
