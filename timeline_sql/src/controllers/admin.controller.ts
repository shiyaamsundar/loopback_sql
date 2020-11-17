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
import {Admin} from '../models';
import {AdminRepository, InternRepository, ProjectRepository, TaskRepository} from '../repositories';

export class AdminController {
  constructor(
    @repository(AdminRepository)
    public adminRepository : AdminRepository,
    @repository(InternRepository)
    public internRepository : InternRepository,
    @repository(ProjectRepository)
    public projectRepository : ProjectRepository,
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
  ) {}

  @post('/admins', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Admin)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {
            title: 'NewAdmin',
            exclude: ['id'],
          }),
        },
      },
    })
    admin: Omit<Admin, 'id'>,
  ): Promise<Admin> {
    return this.adminRepository.create(admin);
  }

  @get('/admins/count', {
    responses: {
      '200': {
        description: 'Admin model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Admin) where?: Where<Admin>,
  ): Promise<Count> {
    return this.adminRepository.count(where);
  }

  @get('/admins', {
    responses: {
      '200': {
        description: 'Array of Admin model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Admin, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Admin) filter?: Filter<Admin>,
  ): Promise<Admin[]> {
    return this.adminRepository.find(filter);
  }

  @patch('/admins', {
    responses: {
      '200': {
        description: 'Admin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {partial: true}),
        },
      },
    })
    admin: Admin,
    @param.where(Admin) where?: Where<Admin>,
  ): Promise<Count> {
    return this.adminRepository.updateAll(admin, where);
  }

  @get('/admins/{id}', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Admin, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Admin, {exclude: 'where'}) filter?: FilterExcludingWhere<Admin>
  ): Promise<Admin> {
    return this.adminRepository.findById(id, filter);
  }

  @patch('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {partial: true}),
        },
      },
    })
    admin: Admin,
  ): Promise<void> {
    await this.adminRepository.updateById(id, admin);
  }

  @put('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() admin: Admin,
  ): Promise<void> {
    await this.adminRepository.replaceById(id, admin);
  }

  @del('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.adminRepository.deleteById(id);
  }

  @get('/admin/{id}/allprojects', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Admin, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findallproject(
    @param.path.number('id') id: number,
    @param.filter(Admin) filter?: FilterExcludingWhere<Admin>

  ): Promise<Admin> {
    const res:any=await this.projectRepository.find({where:{adminId:id}})
    return res

  }
  @get('/admin/{id}/alltasks', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Admin, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findalltask(
    @param.path.number('id') id: number,
    @param.filter(Admin) filter?: FilterExcludingWhere<Admin>

  ): Promise<Admin> {
    const res:any=await this.taskRepository.find({where:{adminId:id}})
    return res

  }
  @get('/admin/{id}/allintern', {
    responses: {
      '200': {
        description: 'Intern model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Admin, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findallintern(
    @param.path.number('id') id: number,
    @param.filter(Admin) filter?: FilterExcludingWhere<Admin>

  ): Promise<Admin> {
    const res:any=await this.internRepository.find({where:{adminId:id}})
    return res

  }

}
