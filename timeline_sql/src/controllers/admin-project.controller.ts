import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import * as nodemailer from 'nodemailer';
import {
  Admin,

  Project
} from '../models';
import {AdminRepository, InternRepository} from '../repositories';


export class AdminProjectController {
  constructor(
    @repository(AdminRepository) protected adminRepository: AdminRepository,
    @repository(InternRepository) protected internRepository: InternRepository,
  ) { }

  @get('/admins/{id}/projects', {
    responses: {
      '200': {
        description: 'Array of Admin has many Project',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Project[]> {
    return this.adminRepository.projects(id).find(filter);
  }

  @post('/admins/{id}/projects', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Project)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Admin.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProjectInAdmin',
            exclude: ['id'],
            optional: ['adminId']
          }),
        },
      },
    }) project: Omit<Project, 'id'>,
  ): Promise<Project> {

    const transporter = nodemailer.createTransport(
      `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
    );

    const mailOptions = {
      from : '17tucs221@skct.edu.in',
      to : `${project.assignedto}`,
      subject : `${project.title}`,
      text: `You have been invited to a project  by:- ${project.postedby} Descption:- ${project.description} `
    };

    transporter.sendMail( mailOptions, (error:any, info:any) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    });




    return this.adminRepository.projects(id).create(project);
  }

  @patch('/admins/{id}/projects', {
    responses: {
      '200': {
        description: 'Admin.Project PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Partial<Project>,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.adminRepository.projects(id).patch(project, where);
  }

  @get('/admins/{id1}/project/{id2}/interns', {
    responses: {
      '200': {
        description: 'Array of intern model instances',
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
  async findallinterns(
    @param.path.number('id1') id1: number,
    @param.path.number('id2') id2: number,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Project[]> {
    const proj:any=await this.adminRepository.projects(id2).find({where:{adminId:id1}})

    const internsarr:any=[]
    for(let i=0;i<proj.length;i++)
    {
      if(proj[i]["assignedto"])
      {
        internsarr.push(proj[i]["assignedto"])
      }
    }
    console.log(internsarr)
    const internfilter:any=await this.internRepository.find({where:{email:internsarr}})

    console.log(internfilter)
    return proj
  }



  @del('/admins/{id}/projects', {
    responses: {
      '200': {
        description: 'Admin.Project DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.adminRepository.projects(id).delete(where);
  }
}
