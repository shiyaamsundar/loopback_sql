// import * as async from "async";
// import {CronJob} from 'cron';
// const PromisePool = require('@supercharge/promise-pool')
// import { Worker,Queue,QueueEvents,Job } from 'bullmq'
// import PromisePool from '@supercharge/promise-pool/dist';

import {Job, Queue, QueueEvents, Worker} from 'bullmq';
import {CronJob} from 'cron';
import {default as redis} from 'ioredis';
import * as nodemailer from 'nodemailer';



export class RedisService {
  client = new redis(49153, '127.0.0.1', {db: 0});
  cronJob: CronJob;


  async redisQueue(data:any){
    console.log('hello');

    let cnt=0

    let notdelivered:any=[]

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
          notdelivered.push(data)
          return console.log(`error: ${error}`);

        }
        console.log(`Message Sent ${info.response}`,data);
      });

    }
    async function sendmailarr(data:any)
    {

      for(let i=0;i<data.length;i++)
      {



      const transporter = nodemailer.createTransport(
        `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
      );
      const mailOptions = {
        from : '17tucs221@skct.edu.in',
        to : `${data[i]}`,
        subject :' hello world',
        text: `You have been invited `
      };
      await transporter.sendMail( mailOptions, (error:any, info:any) => {
        if (error) {
          notdelivered.push(data)
          return console.log(`error: ${error}`);

        }
        console.log(`Message Sent ${info.response}`,data);
      });
    }
    }
    let asyncTask = function(email:string) {
      return function (cb:any) {
          setTimeout(function() {
            const transporter = nodemailer.createTransport(
              `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
            );

            const mailOptions = {
              from : '17tucs221@skct.edu.in',
              to :`${email}`,
              subject :' hello world',
              text: `You have been invited `
            };





              transporter.sendMail( mailOptions, (error:any, info:any) => {
              if (error) {
                notdelivered.push(email)
                console.log(`error: ${error}`);

              }
              console.log(`Message Sent `,mailOptions['to'],',','not delivered',notdelivered);

            });


            cnt+=1


              cb(null, email);

          },

          ),1000}

    };
//---------------------------------------------------------------

    const queue = new Queue('Email',
      { connection: {
          host: "127.0.0.1",
          port: 49153
      },

    });

    //----queue with cron

  //     //   await queue.add('Email', { id: 'abcd@gmail.com' },
  // // {
  // //   repeat: {
  // //     cron: '* * * * *'
  // //   }
  // // });


    for(let i=0;i<data.length;i++)
    {
      await queue.add('email',{id:data[i]['email']})
    }



    const worker = new Worker('Email', async (job:Job) => {

        await sendmail(job.data.id);
       await setTimeout(() => {

      }, 1000);



      return "delivered"
    },{  concurrency: 20 ,connection: {
        host: "127.0.0.1",
        port: 49153
      }}

      );

      //---------------aaaaaaaa
    // const worker = new Worker('Email', async job => sendmail(job), {
    //   limiter: {
    //     max: 10,
    //     duration: 1000
    //   }, { connection: {
    //   host: "127.0.0.1",
    //   port: 49153
    // }});






  await  worker.on("completed", (job: Job, returnvalue: any) => {
      console.log(job.data,'completed');

    });



    const queueEvents=new QueueEvents('Email',{ connection: {
      host: "127.0.0.1",
      port: 49153}
  },)



  //   queueEvents.on('completed', (jobId: string, returnvalue: any) => {
  //     console.log('Job completed ',jobId,returnvalue);

  // });


  //async parallel...................



  // let when_done=async function(err:any,notdelivered:any){


  //   if(!err){

  //   console.log('completed');
  //   }



  // }
  // let task:any=[

  // ]


  // for(let i=0;i<data.length;i++)
  // {
  //   task.push(asyncTask(data[i]['email']))
  // }



  // async.parallelLimit(task,1,when_done)
//---------------------------------------------------------------------------------


//promise pool

  // const { results, errors } = await PromisePool
  // .for(data)
  // .withConcurrency(10)
  // .process(async (res:any) => {

  //   console.log(res['email']);

  //   await sendmail(res['email'])


  // })





  //----------------------------------------------------------------------------------

 // task queue

//   let taskQueue=async.queue(function( res,callback:any){

//     console.log('sending mail to',res)
//     const transporter = nodemailer.createTransport(
//       `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
//     );

//     const mailOptions = {
//       from : '17tucs221@skct.edu.in',
//       to : `${res}`,
//       subject :' hello world',
//       text: `You have been invited `
//     };


//      transporter.sendMail( mailOptions, (error:any, info:any) => {
//       if (error) {
//         notdelivered.push(res)
//         console.log(`error: ${error}`);

//       }
//       console.log(`Message Sent ${info.response}`,mailOptions['to']);

//     });



//     console.log('waiting to be processed',taskQueue.length());


//     setTimeout(function(){
//         callback()
//     },1000)
//     console.log('-----------------------');


//     if(taskQueue.length()==0)
//     {
//       console.log('all processed',notdelivered)
//     }

//   },1)

//   for(let i=0;i<data.length;i++)
//   {
//   taskQueue.push(data[i]['email'],function(err){
//     if(err){
//       console.log(err);

//     }
//   })
// }

// taskQueue.unshift(data[0]['email'],function(err){
//   if(err){
//     console.log(err);

//   }
// })


//------------------cron job


  //     let i=0
  //     let j=2
  //     let arr:any=[]
  //  let notsent:any=[]

  //     this.cronJob=new CronJob('* * * * * *',async ()=>{


  //       if(data.length<=i)
  //       {

  //         console.log('Stopped..');
  //           console.log(notsent)

  //         this.cronJob.stop()
  //       }

  //       if(i<j+cnt)
  //       {
  //         arr.push(data[i]['email'])
  //         i+=1
  //       }

  //       else{
  //          await sendmailarr(arr)
  //         console.log(arr)
  //         arr=[]
  //         cnt+=j
  //       }
  //     })

  //     if(!this.cronJob.running){
  //       console.log('started..');

  //       this.cronJob.start()
  // }


    // let i=0
    // let cnt=0
    // let j=10000
    // let arr:any=[]
    // let notsent:any=[]

    // this.cronJob=new CronJob('* * * * * *',async ()=>{


    //   if(data.length<=i)
    //   {

    //     console.log('Stopped..');
    //     console.log(notsent)


    //     this.cronJob.stop()
    //   }

    //   if(i<j+cnt)
    //   {
    //     arr.push(data[i]['email'])
    //     i+=1
    //   }

    //   else{
    //      await this.sendddmail(arr,notsent)
    //     console.log(arr)
    //     arr=[]
    //     cnt+=j
    //   }


    // let j=0;

    // this.cronJob=new CronJob('* * * * * *',async ()=>{

    //     arr=[]
    // if(j>=res.length){
    //     this.cronJob.stop()
    // }

    // for(let i=0+j;i<limit;i++){
    //     arr.push(res[i])


    //     }
    //     j+=i
    //     sendmail(arr)
    // }


    //----cron jobbb





}}


 // await worker.on("save", (job: Job, returnvalue: any) => {
  //   console.log(job.data,'saved...',returnvalue);

  // });

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
