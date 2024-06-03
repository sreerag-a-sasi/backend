
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmail(email) {
    return emailPattern.test(email);
}

const userDataForm = document.getElementById("userDataForm");
userDataForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const emailInput = document.getElementById("email");
    const email = emailInput.value;

    const alertDiv = document.getElementById("alert");
    if (isValidEmail(email)) {
        alertDiv.textContent = "Your email has been verified!";
    } else {
        alertDiv.textContent = "Your email is not verified!";
    }
});