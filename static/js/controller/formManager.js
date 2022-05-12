import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export const formManager = {
    oneInputModal(config) {
        createForm(config, "oneInputForm")
    },

    newCardForm(config) {
        createForm(config, "InputWithCheckButtons")
    }
}


function createForm(config, type) {
    const formBuilder = htmlFactory(htmlTemplates[type]);
    const content = formBuilder(config);
    domManager.addChild(`#modal-body-${config.id}`, content);
}