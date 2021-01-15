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
