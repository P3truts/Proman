import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let buttonManager = {
    loadNewBoardBtn: function () {
    const config ={
        name: "Add Board",
        id: "new-board-button",
        class: "btn btn-primary",
        modal: "data-bs-toggle=\"modal\" data-bs-target=\"#new-board-modal\""
    }
    const btnBuilder = htmlFactory(htmlTemplates.newBoardBtn);
    const content = btnBuilder(config);
    domManager.addChild(".title-container",content);
    domManager.addEventListener(
            "#new-board-button",
            "click",
    );
},

    loadEditTitleBoard: function (boardId) {
        const config ={
            id: `edit-board-button-${boardId}`,
            class: "edit-board-button",
            src : "./static/assets/edit-btn.png",
            parent: `.board[data-board-id="${boardId}"]`
        }
        const btnBuilder = htmlFactory(htmlTemplates.newBoardBtn);
        const content = btnBuilder(config);
        domManager.addChild(config.parent, content);
        domManager.addEventListener(`#${config.id}`, "click", test)
    }
};

function test() {
    console.log('salam')
}