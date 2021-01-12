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



  async sendddmail(mails:any,notdelivered:any){


    for(let i=0;i<mails.length;i++){

    const transporter = nodemailer.createTransport(
      `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
    );

    const mailOptions = {
      from : '17tucs221@skct.edu.in',
      to : `${mails[i]}`,
      subject :' hello world',
      text: `You have been invited `
    };


    await transporter.sendMail( mailOptions, (error:any, info:any) => {
      if (error) {
        notdelivered.push(mails[i])
        return console.log(`error: ${error}`);

      }
      console.log(`Message Sent ${info.response}`,mailOptions['to']);

    });
  }


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
    let i=0
    let cnt=0
    let j=10000
    let arr:any=[]
    let notsent:any=[]

    this.cronJob=new CronJob('* * * * * *',async ()=>{


      if(res.length<=i)
      {

        console.log('Stopped..');
        console.log(notsent)


        this.cronJob.stop()
      }

      if(i<j+cnt)
      {
        arr.push(res[i]['email'])
        i+=1
      }

      else{
         await this.sendddmail(arr,notsent)
        console.log(arr)
        arr=[]
        cnt+=j
      }




    })




    if(!this.cronJob.running){
      console.log('started..');

      this.cronJob.start()
    }

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




// async sendddmail(mails:any){


//       for(let i=0;i<mails.length;i++){

//       const transporter = nodemailer.createTransport(
//         `smtps://********@gmail.com:***************`
//       );

//       const mailOptions = {
//         from : '17tucs221@skct.edu.in',
//         to : `${mails[i]}`,
//         subject :' hello world',
//         text: `You have been invited `
//       };


//       await transporter.sendMail( mailOptions, (error:any, info:any) => {
//         if (error) {
//           return console.log(`error: ${error}`);
//         }
//         console.log(`Message Sent ${info.response}`,mailOptions['to']);

//       });
//     }


//     }
//     @get('/sendmail', {
//       responses: {
//         '200': {
//           description: 'Array of Data model instances',
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'array',
//                 items: getModelSchemaRef(Data, {includeRelations: true}),
//               },
//             },
//           },
//         },
//       },
//     })
//     async sendmail(
//       @param.filter(Data) filter?: Filter<Data>,
//     ): Promise<Data[]> {
//       let res:any= await this.dataRepository.find(filter);
//       let i=0
//       let cnt=0
//       let j=2
//       let arr:any=[]
//    let notsent:any=[]

//       this.cronJob=new CronJob('* * * * * *',async ()=>{


//         if(res.length<=i)
//         {

//           console.log('Stopped..');
//             console.log(notsent)

//           this.cronJob.stop()
//         }

//         if(i<j+cnt)
//         {
//           arr.push(res[i]['email'])
//           i+=1
//         }

//         else{
//            await this.sendddmail(arr)
//           console.log(arr)
//           arr=[]
//           cnt+=j
//         }
//       })

//       if(!this.cronJob.running){
//         console.log('started..');

//         this.cronJob.start()
//       }
//     }





//   when api is called it collects all the data present in db/file  (email with id's)
//   And using cron we can loop through infinite time based on the limit begin set by the user it adds the email id in an array
//   after the limit is being reached it calls the sendmail function , And it sends the mail
//   mean while the cron process gets ready with the next set of email id
//   so it simultaneously processes the data
//  we will also get the mail id that fails in the send mail function
