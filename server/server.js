// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res)=>{
  console.log("Created Server");

  // res.writeHead(200, {'contet-type' : 'text/plain'});
  // res.end("server Created succsessfully");

  const req_url = req.url;
  console.log("req_url : ", req_url);

  const parsed_url = url.parse(req_url);
  console.log("parsed_url : ", parsed_url);

  if(parsed_url.pathname === '/') {
    res.writeHead(200, {'contet-type' : 'text/html'});
    res.end(fs.readFilesync('../client/form.html'));
  }else if(parsed_url.pathname === '/form.css') {
    res.writeHead(200, {'contet-type' : 'text/css'});
    res.end(fs.readFilesync('../client/form.css'));
  }else{
    res.writeHead(404, {'contet-type' : 'text/plain'});
    res.end(fs.readFilesync("Page not found"));
  }
});

server.listen(port, hostname, ()=> {
  console.log(`server running at http://${hostname}:${port}`)
});


