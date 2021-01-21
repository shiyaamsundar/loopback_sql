import {Job, Queue, QueueEvents, Worker} from 'bullmq';
import {default as redis} from 'ioredis';
import * as nodemailer from 'nodemailer';



export class RedisService {
  client = new redis(49153, '127.0.0.1', {db: 0});
  async setMessageTemplate(messageId: string, payload: string) {
    return await this.client.set(messageId, payload);
  }
  async getMessageTempelate(messageId: string) {
    let message = await this.client.get(messageId);
    console.log(message);
    return message;
  }

  async redisQueue(data:any){
    console.log('hello');


    async function sendmail(data:any)
    {


      const transporter = nodemailer.createTransport(
        `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
      );
      const mailOptions = {
        from : '17tucs221@skct.edu.in',
        to : `${data}`,
        subject :' hello world',
        text: `You have been invited `
      };
      await transporter.sendMail( mailOptions, (error:any, info:any) => {
        if (error) {
          return console.log(`error: ${error}`);
        }
        console.log(`Message Sent ${info.response}`,data);
      });

    }

    const queue = new Queue('Email',
      { connection: {
          host: "127.0.0.1",
          port: 49153
      },

    });

    for(let i=0;i<data.length;i++)
    {
      await queue.add('email',{id:data[i]['email']})
    }



    const worker = new Worker('Email', async (job:Job) => {

        await sendmail(job.data.id);

      return "delivered"
    },{  concurrency: 20 ,connection: {
        host: "127.0.0.1",
        port: 49153
      }}

      );

     await worker.on("save", (job: Job, returnvalue: any) => {
        console.log(job.data,'saved...',returnvalue);

      });


  await  worker.on("completed", (job: Job, returnvalue: any) => {
      console.log(job.data,'completed');

    });



    const queueEvents=new QueueEvents('Email',{ connection: {
      host: "127.0.0.1",
      port: 49153}
  },)



    queueEvents.on('completed', (jobId: string, returnvalue: any) => {
      console.log('completed quqquququququ',jobId,returnvalue);

  });


  // queueEvents.on('failed', (jobId: string, failedReason: string) => {
  //     // jobId received a progress event
  //     console.log('failed',jobId);
  // });

  // queueEvents.on('progress', (jobId: string, progress: number | object) => {
  //     // jobId received a progress event
  //     console.log('progress',jobId);
  // });

    // worker.on("progress", (job: Job, progress: number | object) => {
    //   // Do something with the return value.
    //   console.log(job.data,'progress',progress);
    // });

    // worker.on("failed", (job: Job, failedReason: string) => {
    //   console.log(job.data,'failed',failedReason);

    // });
    // worker.on("delay", (job: Job, failedReason: string) => {
    //   console.log(job.data,'delay',failedReason);

    // });

    // worker.on("delayed", (job: Job, delayed: string) => {
    //   console.log(job.data,'delayed',delayed);

    // });

      //   await queue.add('cars', { color: 'blue' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'green' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'yellow' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'red' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'grey' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'bbbb' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'aaaaa' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'ccccc' },{ removeOnComplete: true, removeOnFail: 1000 },);
  //  await queue.add('cars', { color: 'dd' },{ removeOnComplete: true, removeOnFail: 1000 },);

  //  await queue.add('cars', { color: 'dd' },{ removeOnComplete: true, removeOnFail: 1000 }, { priority: 7 });




  //   await queue.add('submarine', { color: 'yellow' },
  // {
  //   repeat: {
  //     cron: '15 3 * * *'
  //   }
  // });

  // await queue.add('wall', { color: 'pink' }, { priority: 10 });


    // const myQueue = new Queue('myqueue', { connection: {
    //   host: "127.0.0.1",
    //   port: 49153
    // }});
  //   async function addJobs(){
  //     await myQueue.add('paint', { color: 'red' });
  //     await myQueue.add('paint', { color: 'yellow' });
  // }

  // await addJobs();
  // await myQueue.add('paint', { color: 'green' });
  // await myQueue.add('paint', { colour: 'blue' }, { delay: 5000 });

    // const queue=Queue('muqueue')

    // const worker = new Worker('painter', async job => paintCar(job), {
    //   limiter: {
    //     max: 10,
    //     duration: 1000
    //   }, { connection: {
    //   host: "127.0.0.1",
    //   port: 49153
    // }});


    // const scheduler = new QueueScheduler('painter');


}}
