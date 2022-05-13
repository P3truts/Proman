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

    loadAddCardBtn: function (boardId) {
        const config ={
            id: `add-card-btn-${boardId}`,
            class: "add-card-btn btn btn-success",
            parent: `.board[data-board-id="${boardId}"]`,
            modal: `data-bs-toggle=modal data-bs-target= #add-card-modal-${boardId}`,
            name: "Add card"
        }
        const btnBuilder = htmlFactory(htmlTemplates.newBoardBtn);
        const content = btnBuilder(config);
        domManager.addChild(config.parent, content);
        domManager.addEventListener(`#${config.id}`, "click")
    }
};

// <button type="button" id="add-card-btn-${board.id}" className="add-card-btn btn btn-success"
//         data-bs-toggle="modal" data-bs-target="#add-card-modal-${board.id}">
//     Add Card
// </button>