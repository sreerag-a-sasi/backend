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

const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 3500;
const hostname = "localhost";

const server = http.createServer((req, res) => {
  console.log("Created Server");

  // res.writeHead(200, {'contet-type' : 'text/plain'});
  // res.end("server Created succsessfully");

  const req_url = req.url;
  console.log("req_url : ", req_url);

  const parsed_url = url.parse(req_url);
  console.log("parsed_url : ", parsed_url);

  if (parsed_url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("../client/form.html"));
  }
   else if (parsed_url.pathname === "/form.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.end(fs.readFileSync("../client/form.css"));
  } 
  else if (parsed_url.pathname === "/form.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("../client/form.js"));
  } 
  else if (parsed_url.pathname === "/form-password.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("../client/form-password.js"));
  }
  else if (parsed_url.pathname === "/eagle2.jpg") {
    res.writeHead(200, { "content-type": "image/jpeg" });
    res.end(fs.readFileSync("../client/eagle2.jpg"));
  }
  else if (parsed_url.pathname === "/google.png") {
    res.writeHead(200, { "content-type": "image/png" });
    res.end(fs.readFileSync("../client/google.png"));
  }
  else if(pathname === '/submit' && req_methode === 'POST') {
    let body;
    let data;

    req.on('data', (chunks) => {
      console.log("chunks : ", chunks);
      body = chunks.toString();
      console.log("body : ", body);
    });

    req.on('end',()=>{
      data = queryString.parse(body);
      console.log("data : ",data);

      let form_data = {
        fname : data.first_name,
        lname : data.last_name,
        email : data.email,
        password : data.password,
      };

      console.log("formData : ", form_data);

      //Do something with the data, eg : save to a database
      res.writeHead(200, {'content-type' : 'text/plain'});
      res.end("Form submitted successfully");
    });
  }
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(fs.readFileSync("../client/404.html"));
  }
});

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
