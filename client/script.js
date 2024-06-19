async function getData() {
    const data = await fetch('/getData');
    console. log("data : ", data) ;
    const parsed_data = await data.json();
    console. log("parsed data : ", parsed_data);
    
    let dataContainer = document. getElementById('dataContainer');
    console. log("dataContainer : ", dataContainer);
    
    let rows = '';
    
    for(let i=0; i<parsed_data.length; i++) {
    rows = rows + `
    <tr>
    <td>${parsed_data[i].name}</td>
    <td>${parsed_data[i].username}</td>
    td>${parsed_data[i].email}</td>
    <td>${parsed_data[i].password}</td>
    <td>${parsed_data[i].password1}</td>
    </tr>
        `
    }
    console.log("rows : ", rows)
    dataContainer.innerHTML = rows;
}