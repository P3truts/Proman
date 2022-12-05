import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export const formManager = {
    oneInputModal(config, parent=null) {
        createForm(config, "oneInputForm", parent);
    },

    newCardForm(config, parent=null) {
        createForm(config, "InputWithCheckButtons", parent);
    },

    userPassword(config, parent=null) {
        createForm(config, 'userPasswordForm', parent)
    },

    delModal(config, parent=null) {
        createForm(config, "delForm", parent);
    },
};

function createForm(config, type, parent=null) {
    if (!parent) parent=`#modal-body-${config.id}`
    domManager.addChild(
        parent,
        htmlFactory(htmlTemplates[type])(config)
    );
}
