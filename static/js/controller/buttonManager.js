import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {modalManager} from "./modalManager.js";

export let buttonManager = {
    loadNewBoardBtn: function () {
        const config = {
            name: "Add Public Board",
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

    deleteBoardBtn(board) {
        domManager.addEventListener(`#delete-board-button-${board.id}`, "click");
        modalManager.loadBoardDelConfirmModal(board);
    },

    removeBtn(boardId) {
     domManager.removeChild(
         `.board[data-board-id="${boardId}"]`,
         `#add-card-btn-${boardId}`
     );
    },

    loadNewPrivateBoardBtn: function () {
        const config = {
            name: "Add Private Board",
            id: "new-private-board-button",
            class: "btn btn-primary",
            modal: 'data-bs-toggle="modal" data-bs-target="#new-private-board-modal"',
        };
        const content = htmlFactory(htmlTemplates.newBoardBtn)(config);
        let container = domManager.getParent(".user-container");

        if (container) {
            domManager.addChild(".title-container", content);
            domManager.addEventListener("#new-private-board-button", "click");
        }
    },
    deleteStatusBtn(boardId, status) {
        domManager.addEventListener(`#delete-status-button-${status.id}`, "click");
    },
};


