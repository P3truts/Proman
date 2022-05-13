import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export const formManager = {
    oneInputModal(config) {
        createForm(config, "oneInputForm");
    },

    newCardForm(config) {
        createForm(config, "InputWithCheckButtons");
    },
};

function createForm(config, type) {
    domManager.addChild(
        `#modal-body-${config.id}`,
        htmlFactory(htmlTemplates[type])(config)
    );
}
