import {Entity, model, property} from '@loopback/repository';

@model()
export class Task extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  createdby?: string;

  @property({
    type: 'string',
  })
  assignedto?: string;

  @property({
    type: 'number',
  })
  estimation?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  adminId?: number;



  @property({
    type: 'number',
  })
  projectId?: number;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
