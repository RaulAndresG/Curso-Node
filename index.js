const fs = require('fs')
const http = require('http')
const url = require('url')


//Blocking synchronous way
/* const  textIn = fs.readFileSync('./txt/input.txt','utf8');
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);
console.log('File written!'); */


//Non-blocking, asynchronous way

/* fs.readFile('./txt/start.txt','utf-8', (err,data) =>{
    console.log(data);

});
console.log('Will read file!');
 */

/// SERVER
const server = http.createServer((req,res)=>{
  const pathName = req.url;

  if( pathName === '/' || pathName === '/overview'){
    res.end('This is the OVERVIEW');  
  }else if (pathName === '/product'){
    res.end('This is the OVERVIEW');
  }else{
    res.writeHead(404,{
        'Content-type':'text/html',
        'my-own-header':'hello-world'

    });
    res.end('<h1>Page not found!</h1>');
  }
});


server.listen(8000,'127.0.0.1', () =>{
    console.log('listening to request on port 8000');
});


