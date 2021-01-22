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







    // let i=0
    // let cnt=0
    // let j=10000
    // let arr:any=[]
    // let notsent:any=[]

    // this.cronJob=new CronJob('* * * * * *',async ()=>{


    //   if(res.length<=i)
    //   {

    //     console.log('Stopped..');
    //     console.log(notsent)


    //     this.cronJob.stop()
    //   }

    //   if(i<j+cnt)
    //   {
    //     arr.push(res[i]['email'])
    //     i+=1
    //   }

    //   else{
    //      await this.sendddmail(arr,notsent)
    //     console.log(arr)
    //     arr=[]
    //     cnt+=j
    //   }




    // })




    // if(!this.cronJob.running){
    //   console.log('started..');

    //   this.cronJob.start()
    // }


    // sendmail(data){
    //     async.parallel([
    //         for(let i=0;i<data.length)
    //         function(callback) {
    //             setTimeout(function() {
    //                 callback(null, 'one');
    //             }, 200);
    //         },

    //     ]

    //     )
    // }





    //-------------------------------------------------------------------\

    let taskQueue=async.queue(function( res,callback:any){

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

        //   for(let i=0;i<res.length;i++)
        //   {
        //   taskQueue.push(res[i]['email'],function(err){
        //     if(err){
        //       console.log(err);

        //     }
        //   })
        // }

        // taskQueue.unshift(res[0],function(err){
        //   if(err){
        //     console.log(err);

        //   }
        // })


    //------

let taskQueue=async.queue(function(task,callback){

    console.log('sending mail to',task['mail'])
    sendmail(task)
    console.log('waiting to be processed',taskQueue.length);
    console.log('-----------------------');

    setTimeout(function(){
        callback()
    },1000)

},100)


taskQueue.drain=function(){
    console.log('all req has been processed');
}

_.each(res,function(task){
    taskQueue.push(task,function(err){
        if(err)
        {
            console.log(err);
        }
    })
})



  //   const { results, errors } = await PromisePool
  // .withConcurrency(10000)
  // .for(res)
  // .process(async data => {

  //   this.sendddmail(data)

  // })


//-------------------------------------------------
  //queue



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

//   for(let i=0;i<res.length;i++)
//   {
//   taskQueue.push(res[i]['email'],function(err){
//     if(err){
//       console.log(err);

//     }
//   })
// }

// taskQueue.unshift(res[0],function(err){
//   if(err){
//     console.log(err);

//   }
// })


//parallel--------------------------------

let cnt=0

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


let when_done=function(err:any,notdelivered:any){
  if(!err)

  console.log('completed');



}
let task:any=[

]


for(let i=0;i<res.length;i++)
{
  task.push(asyncTask(res[i]['email']))
}



async.parallelLimit(task,1,when_done)



    return res
