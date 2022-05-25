import {formManager} from "./formManager.js";

export const UserManager = {
    loadUserRegistrationForm() {
        const config = {
            formId: "registration-form",
            formApi: "/registration",
            confirmPassword: true
        }
        formManager.userPassword(config,"#registration-container")
    },

    loadUserLoginForm() {
        const config = {
            formId: "login-form",
            formApi: "/login",
        }
        formManager.userPassword(config,"#login-container")
    }
}