import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";
import { statusManager } from "./statusManager.js";
import { modalManager } from "./modalManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        boards.forEach((board) => createBoard(board));
    },

    loadNewBoard: function (board) {
        createBoard(board, "beforebegin");
        domManager.addClassToParent(
            `.board[data-board-id="${board.id}"]`,
            "border-green"
        );
    },

    updateBoard: function (board) {
        domManager.removeBoard(`.board[data-board-id="${board.id}"]`);
        createBoard(board, "beforeend", true);
        domManager.addClassToParent(
            `.board[data-board-id="${board.id}"]`,
            "border-green"
        );
    },
};

async function createBoard(board, position, update = false) {
    // const boardBuilder = htmlFactory(htmlTemplates.board);
    // const content = boardBuilder(board);
    //  shorter alternative below
    const content = htmlFactory(htmlTemplates.board)(board);
    domManager.addChild("#root", content, position);
    await modalManager.loadNewCardModal(board.id);
    if (!update) {
        modalManager.loadEditBoardTitleModal(board.id);
    }

    domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
    );
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const columnsContainer = domManager.getParent(
        `.board[data-board-id="${boardId}"] > .board-columns`
    );
    if (!columnsContainer.innerHTML.length) {
        statusManager.loadStatuses(boardId);
        cardsManager.loadCards(boardId);
        modalManager.loadNewStatusModal(boardId);
    }
}
