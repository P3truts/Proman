import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";

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
        domManager.addEventListener(`#edit-board-button-${board.id}`, "click",
            async ()=>await deleteBoard(board.id))
    },

    removeBtn(boardId) {
     domManager.removeChild(
         `.board[data-board-id="${boardId}"]`,
         `#add-card-btn-${boardId}`
     );
    }
};


async function deleteBoard(boardId) {
    await dataHandler.deleteBoard(boardId)
    domManager.removeBoard(`.board[data-board-id="${boardId}"]`);
}


