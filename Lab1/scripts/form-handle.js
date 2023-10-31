
let emailElement = document.getElementById("email");
let messageElement = document.getElementById("message");

let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (e) => {
    let email = emailElement.value;
    let message = messageElement.value;

    console.log("Email: ", email);
    console.log("Message: ", message);
    console.log("Valid email: ", validateEmail(email));
    if (checkForJD(message)) {
        console.log("Info: ", "Nieładnie, co by Dis powiedział?");
    }
})


function validateEmail(mail){
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEmail.test(mail);
}

function checkForJD(msg) {
    return msg.includes("JD") || msg.includes("jD") || msg.includes("Jd") || msg.includes("jd");
}
