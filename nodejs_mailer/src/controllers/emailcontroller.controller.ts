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
import PromisePool from '@supercharge/promise-pool/dist';
import {CronJob} from 'cron';
import * as nodemailer from 'nodemailer';
import {Data} from '../models';
import {DataRepository} from '../repositories';






export class EmailcontrollerController {
  cronJob:CronJob
  constructor(

    @repository(DataRepository)
    public dataRepository : DataRepository
  ) {}

  @post('/data', {
    responses: {
      '200': {
        description: 'Data model instance',
        content: {'application/json': {schema: getModelSchemaRef(Data)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Data, {
            title: 'NewData',
            exclude: ['id'],
          }),
        },
      },
    })
    data: Omit<Data, 'id'>,
  ): Promise<Data> {
    return this.dataRepository.create(data);
  }

  @get('/data/count', {
    responses: {
      '200': {
        description: 'Data model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Data) where?: Where<Data>,
  ): Promise<Count> {
    return this.dataRepository.count(where);
  }

  @get('/data', {
    responses: {
      '200': {
        description: 'Array of Data model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Data, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Data) filter?: Filter<Data>,
  ): Promise<Data[]> {
    let res:any= await this.dataRepository.find(filter);
    console.log(res)
    return res
  }



  async sendddmail(mails:any){




    //for(let i=0;i<mails.length;i++){

    const transporter = nodemailer.createTransport(
      `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
    );

    const mailOptions = {
      from : '17tucs221@skct.edu.in',
      to : `${mails['email']}`,
      subject :' hello world',
      text: `You have been invited `
    };


    await transporter.sendMail( mailOptions, (error:any, info:any) => {
      if (error) {
        // notdelivered.push(mails[i])
        return console.log(`error: ${error}`);

      }
      console.log(`Message Sent ${info.response}`,mailOptions['to']);

    });
  //}


  }
  @get('/sendmail', {
    responses: {
      '200': {
        description: 'Array of Data model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Data, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async sendmail(
    @param.filter(Data) filter?: Filter<Data>,
  ): Promise<Data[]> {
    let res:any= await this.dataRepository.find(filter);

    const { results, errors } = await PromisePool
  .withConcurrency(10000)
  .for(res)
  .process(async data => {

    this.sendddmail(data)

  })






    return res
  }

  @patch('/data', {
    responses: {
      '200': {
        description: 'Data PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Data, {partial: true}),
        },
      },
    })
    data: Data,
    @param.where(Data) where?: Where<Data>,
  ): Promise<Count> {
    return this.dataRepository.updateAll(data, where);
  }

  @get('/data/{id}', {
    responses: {
      '200': {
        description: 'Data model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Data, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Data, {exclude: 'where'}) filter?: FilterExcludingWhere<Data>
  ): Promise<Data> {
    return this.dataRepository.findById(id, filter);
  }

  @patch('/data/{id}', {
    responses: {
      '204': {
        description: 'Data PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Data, {partial: true}),
        },
      },
    })
    data: Data,
  ): Promise<void> {
    await this.dataRepository.updateById(id, data);
  }

  @put('/data/{id}', {
    responses: {
      '204': {
        description: 'Data PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() data: Data,
  ): Promise<void> {
    await this.dataRepository.replaceById(id, data);
  }

  @del('/data/{id}', {
    responses: {
      '204': {
        description: 'Data DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dataRepository.deleteById(id);
  }
}




