import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {statusManager} from "./statusManager.js";
import {modalManager} from "./modalManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            createBoard(board)
        }
    },

    loadNewBoard: function(board) {
        createBoard(board, "beforebegin")
        domManager.addClassToParent(`.board[data-board-id="${board.id}"]`, "border-green")
    },

    updateBoard: function (board) {
        // document.querySelector(`.board[data-board-id="${board.id}"] > .board-columns`).parentNode.parentNode.remove()
        domManager.removeBoard(`.board[data-board-id="${board.id}"]`)
        createBoard(board, "beforebegin", true)
        domManager.addClassToParent(`.board[data-board-id="${board.id}"]`, "border-green")
    }
};

function createBoard(board, position, update=false) {
    const boardBuilder = htmlFactory(htmlTemplates.board);
    const content = boardBuilder(board);
    domManager.addChild("#root", content, position);

    if (!update) {
        modalManager.loadEditBoardTitleModal(board.id)
    }

    domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler)

}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const columnsContainer = domManager.getParent(
        `.board[data-board-id="${boardId}"] > .board-columns`
    );
    if (columnsContainer.innerHTML.length > 0) {
    } else {
        statusManager.loadStatuses(boardId);
        cardsManager.loadCards(boardId);
    }
}
