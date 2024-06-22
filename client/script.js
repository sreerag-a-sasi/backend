async function getData() {
  const data = await fetch("/getData");
  console.log("data : ", data);
  const parsed_data = await data.json();
  console.log("parsed data : ", parsed_data);

  let dataContainer = document.getElementById("dataContainer");
  console.log("dataContainer : ", dataContainer);

  let rows = '';

  for (let i = 0; i < parsed_data.length; i++) {
    let name= parsed_data[i].name ? parsed_data[i].name : "Null";
    let username = parsed_data[i].username ? parsed_data[i].username : "Null";
    let email = parsed_data[i].email ? parsed_data[i].email : "Null";
    let password = parsed_data[i].password ? parsed_data[i].password : "Null";
    let password1 = parsed_data[i].password1 ? parsed_data[i].password1 : "Null";  
    rows =
      rows +
      `
    <tr>
              <td><input type="text" id='name-${parsed_data[i]._id}' value=${name} disabled="true" placeholder="name"></td>
              <td><input type="text" id='username-${parsed_data[i]._id}' value=${username} disabled=true placeholder="username"></td>
              <td><input type="email" id='email-${parsed_data[i]._id}' value=${email} disabled=true></td>
              <td><input type="password" id='password-${parsed_data[i]._id}' value=${password} disabled=true></td>
              <td><input type="password" id='password1-${parsed_data[i]._id}' value=${password1} disabled=true></td>
              <td><button onclick= "handleEdit('${parsed_data[i]._id}')">Edit</button></td>
              <td><button>Save</button></td>
    </tr>
        `;
  }
  console.log("rows : ", rows);
  dataContainer.innerHTML = rows;
}

function handleEdit(id) {
  alert(`Edit button of id : ${id}`);
  console.log("id : ",id);

  let name = document.getElementById(`name-${id}`);
  let username = document.getElementById(`username-${id}`);
  let email = document.getElementById(`email-${id}`);
  let password = document.getElementById(`password-${id}`);
  let password1 = document.getElementById(`password1-${id}`);

  name.disabled = false;
  username.disabled = false;
  email.disabled = false;
  password.disabled = false;
  password1.disabled = false;
}


async function handleSave(id) {
  console.log("id : ",id);

  let name = document.getElementById(`name-${id}`).value;
  console.log("name :  ", name);

  let username = document.getElementById(`username-${id}`).value;
  console.log("username :  ", username);

  let email = document.getElementById(`email-${id}`).value;
  console.log("email :  ", email);

  let password = document.getElementById(`password-${id}`).value;
  console.log("password :  ", password);

  let password1 = document.getElementById(`password1-${id}`).value;
  console.log("password1 :  ", password1);

  let datas = {
    id,
    name,
    username,
    email,
    password,
    password1,
  }

  let json_datas  = JSON.stringify(datas);
  console.log("json_datas : ", json_datas);

  let response = await fetch('/editData', {
    method : "PUT" ,
    headers : {
      'content-Type' : 'application/json'
    },
    body : json_datas,
  });
  console.log("response : ", response);

  let parsed_response = await response.text();
  console.log("parsed_response : ",parsed_response);

  if(parsed_response === "success") {
    alert("user details updated successfully");
    return;
  }else {
    alert("user updation failed");
  }
}