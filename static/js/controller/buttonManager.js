import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let buttonManager = {
    loadNewBoardBtn: function () {
        const btnBuilder = htmlFactory(htmlTemplates.newBoardBtn);
        const content = btnBuilder();
        domManager.addChild(".title-container",content);
        domManager.addEventListener(
                "#new-board-button",
                "click",
        );
    },
};

