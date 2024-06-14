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
const queryString = require("querystring");
//const { Client } = require("undici-types");
const {MongoClient, Collection} = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');


const server = http.createServer((req, res) => {
  console.log("Created Server");

  const db = client.db("hrm");
  const Collection = db.collection('users');

  const req_url = req.url;
  console.log("req_url : ", req_url);

  const parsed_url = url.parse(req_url);
  console.log("parsed_url : ", parsed_url);

  const req_method = req.method;
  console.log("req_method : ",req_method);

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
  else if (parsed_url.pathname === '/submit' && req_method === 'POST') {
    let body = "";
    let data;

    // req.on('data', (chunks) => {
    //     body += chunks.toString(); // Accumulate the data
    // });
    req.on('data', (chunks) => {
      console.log("chunks : ", chunks);
      body = chunks.toString();
      console.log("body : ", body);
    });

    req.on('end', () => {
        data = queryString.parse(body); // Parse the query string data
        console.log("data : ", data);

        let form_data = {
          //to see the data add name attribute in the html form
            name: data.name,
            username: data.username,
            email:data.email,
            password:data.password,
            password1:data.password1,
        };

        console.log("formData : ", form_data);


        //save to database
        Collection.insertOne(form_data)
          .then((data) => {
            console.log("data : ", data);
            res.writeHead(200, { 'Content-Type' : 'text/plain'});
            res.end("Form submitted successfully");
            return;
          })
          .catch((error) => {
            console.log("error : ",error.message?error.message:error);
            res.writeHead(200, { 'Content-Type' : 'text/plain'});
            res.end("Something went wrong");
            return;
          })
        // Do something with the data (e.g., save to a database)
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end("Form submitted successfully");
        return;
    });
}
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(fs.readFileSync("../client/404.html"));
    return;
  }
});

async function connect() {
  try{
    await Client.connect();
    console.log("DataBase connection established...");
  } catch (error) {
    console.log("error : ",error.message?error.message:error);
  }
}

connect();

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
