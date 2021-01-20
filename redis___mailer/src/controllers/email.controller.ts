import {inject} from '@loopback/core';
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
import {Queue} from 'bullmq';
import {Email} from '../models';
import {RedisService} from '../redisdb';
import {EmailRepository} from '../repositories';

export class EmailController {
  constructor(

    @repository(EmailRepository)
    public emailRepository : EmailRepository,

    @inject('services.redis.service')
    public redisService: RedisService,




  ) {}

  @post('/emails', {
    responses: {
      '200': {
        description: 'Email model instance',
        content: {'application/json': {schema: getModelSchemaRef(Email)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Email, {
            title: 'NewEmail',

          }),
        },
      },
    })
    email: Email,
  ): Promise<Email> {
    return this.emailRepository.create(email);
  }

  @get('/emails/count', {
    responses: {
      '200': {
        description: 'Email model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Email) where?: Where<Email>,
  ): Promise<Count> {
    return this.emailRepository.count(where);
  }

  @get('/emails', {
    responses: {
      '200': {
        description: 'Array of Email model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Email, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Email) filter?: Filter<Email>,
  ): Promise<Email[]> {
    return this.emailRepository.find(filter);
  }


  @get('/sendmail', {
    responses: {
      '200': {
        description: 'Array of Email model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Email, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async sendmail(


    @param.filter(Email) filter?: Filter<Email>,
  ): Promise<Email[]> {
    let res:any= this.emailRepository.find(filter);
    const myQueue = new Queue('foo');

    async function addJobs(){
        await myQueue.add('myJobName', { foo: 'bar' });
        await myQueue.add('myJobName', { qux: 'baz' });
    }

    await addJobs();


    // this.redisService.setMessageTemplate('hello','abcd')
    // this.redisService.getMessageTempelate('hello')




    return res
  }

  @patch('/emails', {
    responses: {
      '200': {
        description: 'Email PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Email, {partial: true}),
        },
      },
    })
    email: Email,
    @param.where(Email) where?: Where<Email>,
  ): Promise<Count> {
    return this.emailRepository.updateAll(email, where);
  }

  @get('/emails/{id}', {
    responses: {
      '200': {
        description: 'Email model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Email, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Email, {exclude: 'where'}) filter?: FilterExcludingWhere<Email>
  ): Promise<Email> {
    return this.emailRepository.findById(id, filter);
  }

  @patch('/emails/{id}', {
    responses: {
      '204': {
        description: 'Email PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Email, {partial: true}),
        },
      },
    })
    email: Email,
  ): Promise<void> {
    await this.emailRepository.updateById(id, email);
  }

  @put('/emails/{id}', {
    responses: {
      '204': {
        description: 'Email PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() email: Email,
  ): Promise<void> {
    await this.emailRepository.replaceById(id, email);
  }

  @del('/emails/{id}', {
    responses: {
      '204': {
        description: 'Email DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.emailRepository.deleteById(id);
  }
}
