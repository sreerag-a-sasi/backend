const strength = {
  1: "Password is very Weak",
  2: "Password is Weak",
  3: "Password is Meduim",
  4: "Password is Strong",
};
 function checkStrength(pass) {
  if (pass.length > 15) {
    const alert = document.getElementsByClassName("pass1");
    alert.textContent = " Password is too lengthy";
  }
  else if (pass.length < 8){
    const warn = document.getElementsByClassName("pass1");
    warn.textContent = " Password is too short";
  }

  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
  if (regex.test(pass)) {
    return console.log(pass + " Password is strong");
  }
  let count = 0;
  let regex1 = /[a-z]/;
  if (regex1.test(pass)) count++;
  let regex2 = /[A-Z]/;
  if (regex2.test(pass)) count++;
  let regex3 = /[\d]/;
  if (regex3.test(pass)) count++;
  let regex4 = /[!@#$%^&*.?]/;
  if (regex4.test(pass)) count++;

  console.log(strength[count]);
  
  const alertDiv = document.getElementById("strength");
  alertDiv.textContent = (strength[count]);
}
document.getElementById("userDataForm").addEventListener("submit", function (event) {
    //event.preventDefault(); // Prevent form submission
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;



    checkStrength(password);
    if (!password) {
      // alert("Please enter a valid password.");
      return; // Stop further processing
    } else {
      if (
        (document.getElementById("password").value!=0) === (document.getElementById("password1").value!=0)
      ) {
        console.log("your password has been confirmed");
        const alertDiv = document.getElementById("verification");
        alertDiv.textContent = "your password has been confirmed" ;
      } else {
        console.log("your password doesnt match, try again");
        const alertDiv = document.getElementById("verification");
        alertDiv.textContent = textContent = "your password doesnt match, try again";
      }
    }
  });
