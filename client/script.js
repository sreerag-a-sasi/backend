async function getData() {
  const data = await fetch("/getData");
  console.log("data : ", data);
  const parsed_data = await data.json();
  console.log("parsed data : ", parsed_data);

  let dataContainer = document.getElementById("dataContainer");
  console.log("dataContainer : ", dataContainer);

  let rows = "";

  for (let i = 0; i < parsed_data.length; i++) {
    rows =
      rows +
      `
    <tr>
              <td><input type="text" id='name-${parsed_data[i]._id}' value=${parsed_data[i].name} disabled></td>
              <td><input type="text" id='username-${parsed_data[i]._id}' value=${parsed_data[i].username} disabled></td>
              <td><input type="email" id='email-${parsed_data[i]._id}' value=${parsed_data[i].email} disabled></td>
              <td><input type="password" id='password-${parsed_data[i]._id}' value=${parsed_data[i].password} disabled></td>
              <td><input type="password" id='password1-${parsed_data[i]._id}' value=${parsed_data[i].password1} disabled></td>
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
