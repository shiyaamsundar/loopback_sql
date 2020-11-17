import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Intern, Project, Task} from '../models';
import {AdminRepository, InternRepository, ProjectRepository, TaskRepository} from '../repositories';

export class InternController {
  constructor(
    @repository(InternRepository)
    public internRepository : InternRepository,
    @repository(AdminRepository)
    public adminRepository : AdminRepository,
    @repository(ProjectRepository) public projectRepository: ProjectRepository,
    @repository(TaskRepository) public taskRepository: TaskRepository,

  ) {}

  @post('/interns', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {'application/json': {schema: getModelSchemaRef(Intern)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {
            title: 'NewIntern',
            exclude: ['id'],
          }),
        },
      },
    })
    intern: Omit<Intern, 'id'>,
  ): Promise<Intern> {
    return this.internRepository.create(intern);
  }

  @get('/interns/count', {
    responses: {
      '200': {
        description: 'Intern model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Intern) where?: Where<Intern>,
  ): Promise<Count> {
    return this.internRepository.count(where);
  }

  @get('/interns', {
    responses: {
      '200': {
        description: 'Array of Intern model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Intern, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Intern) filter?: Filter<Intern>,
  ): Promise<Intern[]> {
    return this.internRepository.find(filter);
  }

  @patch('/interns', {
    responses: {
      '200': {
        description: 'Intern PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {partial: true}),
        },
      },
    })
    intern: Intern,
    @param.where(Intern) where?: Where<Intern>,
  ): Promise<Count> {
    return this.internRepository.updateAll(intern, where);
  }

  @get('/interns/{id}', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Intern, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Intern, {exclude: 'where'}) filter?: FilterExcludingWhere<Intern>
  ): Promise<Intern> {
    return this.internRepository.findById(id, filter);
  }

  @get('/interns/admin/{id}', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Intern, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findByAdmin(
    @param.path.number('id') id: number,
    @param.filter(Intern) filter?: FilterExcludingWhere<Intern>

  ): Promise<Intern> {

    const a:any=await this.internRepository.find({where:{adminId:id}})
    return a


  }

  @get('/interns/{id}/alltasks', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Intern, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findalltask(
    @param.path.number('id') id: number,
    @param.filter(Intern) filter?: FilterExcludingWhere<Intern>

  ): Promise<Intern> {

    const interndet:any=await this.internRepository.findById(id,filter)
    const email:any=interndet['email']
    const res:any=await this.taskRepository.find({where:{assignedto:email}})
    return res

  }

  @get('/interns/{id1}/project{id2}/tasks', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Intern, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findallprojecttask(
    @param.path.number('id1') id1: number,
    @param.path.number('id2') id2: number,
    @param.filter(Intern) filter?: FilterExcludingWhere<Intern>

  ): Promise<Intern> {

    const interndet:any=await this.internRepository.findById(id1,filter)
    const email:any=interndet['email']
    const res1:any=await this.taskRepository.find({

      where: {and: [{assignedto:email}, {projectId: id2}]},

    })

    return res1

  }


  @get('/interns/{id}/allprojects', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Intern, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findallproject(
    @param.path.number('id') id: number,
    @param.filter(Intern) filter?: FilterExcludingWhere<Intern>

  ): Promise<Intern> {
    const interndet:any=await this.internRepository.findById(id,filter)
    const email:any=interndet['email']
    const res:any=await this.projectRepository.find({where:{assignedto:email}})
    return res

  }


  @patch('/interns/{id}', {
    responses: {
      '204': {
        description: 'Intern PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {partial: true}),
        },
      },
    })
    intern: Intern,
  ): Promise<void> {
    await this.internRepository.updateById(id, intern);
  }

  @put('/interns/{id}', {
    responses: {
      '204': {
        description: 'Intern PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() intern: Intern,
  ): Promise<void> {
    await this.internRepository.replaceById(id, intern);
  }

  @del('/interns/{id}', {
    responses: {
      '204': {
        description: 'Intern DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.internRepository.deleteById(id);
  }

  @post('/intern/{id1}/projects/{id2}/tasks', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async createtask(
    @param.path.number('id2') id2: typeof Project.prototype.id,
    @param.path.number('id1') id1:number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    const interndet:any=await this.internRepository.find({where:{id:id1}})
    const adminid:any=interndet[0]['adminId']
    task.adminId=adminid




    return this.projectRepository.tasks(id2).create(task);

  }

}
