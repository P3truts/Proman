import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export let buttonManager = {
    loadNewBoardBtn: function () {
        const config = {
            name: "Add Board",
            id: "new-board-button",
            class: "btn btn-primary",
            modal: 'data-bs-toggle="modal" data-bs-target="#new-board-modal"',
        };
        const content = htmlFactory(htmlTemplates.newBoardBtn)(config);
        domManager.addChild(".title-container", content);
        domManager.addEventListener("#new-board-button", "click");
    },

    loadAddCardBtn: function (boardId) {
        const config = {
            id: `add-card-btn-${boardId}`,
            class: "add-card-btn btn btn-success",
            parent: `.board[data-board-id="${boardId}"]`,
            modal: `data-bs-toggle=modal data-bs-target=#add-card-modal-${boardId}`,
            name: "Add card",
        };
        const content = htmlFactory(htmlTemplates.newBoardBtn)(config);
        domManager.addChild(config.parent, content);
        domManager.addEventListener(`#${config.id}`, "click");
    },

    loadUserRegistration: function (){
        const config = {
            id: "registration-btn",
            class: "btn btn-success",
            parent: "#navbarToggler",
            modal:"",
            name: "Registration"
        }
        const content = htmlFactory(htmlTemplates.newBoardBtn)(config);
        domManager.addChild(config.parent, content);
    },

    removeBtn(boardId) {
     domManager.removeChild(
         `.board[data-board-id="${boardId}"]`,
         `#add-card-btn-${boardId}`
     );
    }
};


