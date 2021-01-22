import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Data extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    required: true,
  })
  sent: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Data>) {
    super(data);
  }
}

export interface DataRelations {
  // describe navigational properties here
}

export type DataWithRelations = Data & DataRelations;
