import {UserManager} from "./controller/userManager.js";

function init() {
    UserManager.loadUserRegistrationForm()
    confirmPassword()
}

init()

function confirmPassword() {
    const password = document.querySelector("#password")
    const passwordConfirm = document.querySelector("#password-confirm")
    const result = document.querySelector(("#password-result"))
    const btn = document.querySelector("#password-btn")

    passwordConfirm.addEventListener('keyup',() => {
        if(password.value.length >0) result.innerText = checkPassword(password, passwordConfirm)
        result.innerText === "Matching" ? btn.disabled = false : btn.disabled = true
    })
}


function checkPassword(pass, pass2) {
    return pass.value === pass2.value ? "Matching" : "Passwords Do Not Match"
}