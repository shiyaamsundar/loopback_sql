const http = require('http');
const fs = require('fs');

let myReadStream=fs.createReadStream(__dirname+'/sample.txt','utf8')

let myWriteStream=fs.createWriteStream(__dirname+'/samplewrite.txt')

// myReadStream.on('data',(chunk)=>{
//     console.log('chunk received:',chunk);

//     myWriteStream.write(chunk)
// })

myReadStream.pipe(myWriteStream)