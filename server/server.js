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
const { MongoClient, Collection, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

const server = http.createServer(async (req, res) => {
  console.log("Created Server");

  const db = client.db("hrm");
  const Collection = db.collection("users");

  const req_url = req.url;
  console.log("req_url : ", req_url);

  const parsed_url = url.parse(req_url);
  console.log("parsed_url : ", parsed_url);

  const req_method = req.method;
  console.log("req_method : ", req_method);

  if (parsed_url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("../client/index.html"));
    return;
  } else if (parsed_url.pathname === "/getUsers.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.end(fs.readFileSync("../client/getUsers.css"));
    return;
  } else if (parsed_url.pathname === "/style.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.end(fs.readFileSync("../client/style.css"));
    return;
  } else if (parsed_url.pathname === "/form.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("../client/form.js"));
    return;
  } else if (parsed_url.pathname === "/script.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("../client/script.js"));
    return;
  } else if (parsed_url.pathname === "/form-password.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("../client/form-password.js"));
    return;
  } else if (parsed_url.pathname === "/eagle2.jpg") {
    res.writeHead(200, { "content-type": "image/jpeg" });
    res.end(fs.readFileSync("../client/eagle2.jpg"));
    return;
  } else if (parsed_url.pathname === "/google.png") {
    res.writeHead(200, { "content-type": "image/png" });
    res.end(fs.readFileSync("../client/google.png"));
    return;
  } else if (parsed_url.pathname === "/img/river-8286407.png") {
    res.writeHead(200, { "content-type": "image/png" });
    res.end(fs.readFileSync("../client/img/river-8286407.png"));
    return;
  } else if (parsed_url.pathname === "/getData.html") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("../client/getData.html"));
    return;
  } else if (parsed_url.pathname === "/postData.html") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("../client/postData.html"));
    return;
  } else if (parsed_url.pathname === "/submit" && req_method === "POST") {
    let body = "";
    let data;

    // req.on('data', (chunks) => {
    //     body += chunks.toString(); // Accumulate the data
    // });
    req.on("data", (chunks) => {
      console.log("chunks : ", chunks);
      body = chunks.toString();
      console.log("body : ", body);
      return;
    });

    req.on("end", async () => {
      data = queryString.parse(body); // Parse the query string data
      console.log("data : ", data);

      let form_data = {
        //to see the data add name attribute in the html form
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        password1: data.password1,
      };

      console.log("formData : ", form_data);

      const nameRegx = /^([a-zA-Z ]){3,30}$/;
      const isNameValid = nameRegx.test(form_data.name);

      console.log("isnamevalid : ", isNameValid);

      if (!isNameValid) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("your name is invalid");
        return;
      }

      const usernameRegx = /^([a-zA-Z 0-9]){3,30}$/;
      const userNameValid = usernameRegx.test(form_data.username);

      console.log("isnamevalid : ", userNameValid);

      if (!userNameValid) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("your username is invalid");
        return;
      }
           
      if (!form_data.password) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("your password is invalid");
        return; // Stop further processing
      };

      const passregex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
      const passwordvalid = passregex.test(form_data.password);
      const password1valid = passregex.test(form_data.password1);
      const pass = form_data.password;
      const pass1 = form_data.password1;
      // if (pass === pass1){
      // res.writeHead(200,{ "content-Type" : "text/plain"});
      // res.end("your password is ok");
      // return;
      // }else{
      //   res.writeHead(400,{ "content-Type" : "text/plain"});
      //   res.end("your password is not matching");
      // }


      //save to database
      Collection.insertOne(form_data)
        .then((data) => {
          console.log("data : ", data);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Form submitted successfully");
          return;
        })
        .catch((error) => {
          console.log("error : ", error.message ? error.message : error);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Something went wrong");
          return;
        });
    });
  } else if (parsed_url.pathname === "/getData" && req_method === "GET") {
    const data = await Collection.find().toArray();
    console.log("data :", data);
    const json_data = JSON.stringify(data);
    console.log("json_data : ", json_data);

    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(json_data);
    return;
  } else if (parsed_url.pathname === "/editData" && req_method === "PUT") {
    let body;

    req.on("data", (chunks) => {
      console.log("chunks: ", chunks);
      body = chunks.toString();
      console.log("body : ", body);
    });
    req.on("end", async () => {
      let parsed_body = JSON.parse(body);
      console.log("parsed_body : ", parsed_body);

      let update_datas = {
        name: parsed_body.name,
        username: parsed_body.username,
        email: parsed_body.email,
        password: parsed_body.password,
        password1: parsed_body.password1,
      };
      let id = parsed_body.id;
      console.log("id :", id);
      console.log("type Of(id) :", typeof id);

      let _id = new ObjectId(id);
      console.log("_id :", _id);
      console.log("typeOf(_id) :", typeof _id);

      let updateUser = await Collection.findOneAndUpdate(
        { _id },
        { $set: update_datas }
      );
      console.log("updateUser : ", updateUser);

      if (updateUser) {
        res.writeHead(200, { "content-Type": "text/plain" });
        res.end("success");
        return;
      } else {
        res.writeHead(400, { "content-Type": "text/plain" });
        res.end("failed");
        return;
      }
    });
  } else if (parsed_url.pathname === "/deleteData" && req_method === "DELETE") {
    let body;

    req.on("data", (chunks) => {
      console.log("chunks: ", chunks);
      body = chunks.toString();
      console.log("body : ", body);
    });

    req.on("end", async () => {
      let parsed_body = JSON.parse(body);
      let id = parsed_body.id;
      console.log("id :", id);

      let _id = new ObjectId(id);
      console.log("_id :", _id);

      // Correct method: findOneAndDelete
      let deletedUser = await Collection.findOneAndDelete({ _id });
      console.log("deletedUser : ", deletedUser);

      if (deletedUser) {
        res.writeHead(200, { "content-Type": "text/plain" });
        res.end("success");
      } else {
        res.writeHead(400, { "content-Type": "text/plain" });
        res.end("failed");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});
async function connect() {
  try {
    await client.connect();
    console.log("DataBase connection established...");
  } catch (error) {
    console.log("error : ", error.message ? error.message : error);
  }
}

connect();

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
