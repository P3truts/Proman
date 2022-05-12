import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export const formManager = {
    oneInputModal(config) {
        const formBuilder = htmlFactory(htmlTemplates.oneInputForm);
        const content = formBuilder(config);
        domManager.addChild(`#modal-body-${config.id}`, content);
    }
}