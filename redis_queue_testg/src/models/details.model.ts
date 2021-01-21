import {Entity, model, property} from '@loopback/repository';

@model()
export class Details extends Entity {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  delivered: string;


  constructor(data?: Partial<Details>) {
    super(data);
  }
}

export interface DetailsRelations {
  // describe navigational properties here
}

export type DetailsWithRelations = Details & DetailsRelations;
