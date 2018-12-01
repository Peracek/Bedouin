const axios = require('axios');
// const httpAdapter = require('axios/lib/adapters/http');
const INPUT = 'http://localhost:4646/v1/client/fs/logs/8734f871-438b-3e77-06dc-4c7dda8a62ce?follow=true&task=example&type=stdout';

console.log('runnin')


//request the file
axios.get(INPUT, {responseType: 'stream'})//,adapter: httpAdapter})
.then((response) => {
  console.log('got res')
    const stream = response.data;
    stream.on('data', (chunk /* chunk is an ArrayBuffer */) => {
      chunk = JSON.parse(chunk)
      if(chunk.Data) {
      console.log(Buffer.from(chunk.Data, 'base64').toString())
      } else {
        console.log('nothing new')
      }
        // output.write(new Buffer(chunk));
    });
    // stream.on('end', () => {
    //     console.log('end')
    // });
})
.catch(err => console.log(err))