import {formManager} from "./formManager.js";

export const UserManager = {
    loadUserRegistrationForm() {
        const config = {
            formId: "registration-form",
            formApi: "/registration",
        }
        formManager.userPassword(config,"#registration-container")
    }
}