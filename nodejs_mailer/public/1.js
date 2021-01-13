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
