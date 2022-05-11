import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {statusManager} from "./statusManager.js";
import {buttonManager} from "./buttonManager.js";
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
    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    statusManager.loadStatuses(boardId)
    cardsManager.loadCards(boardId);
}

function createBoard(board, position) {
    const boardBuilder = htmlFactory(htmlTemplates.board);
    const content = boardBuilder(board);
    domManager.addChild("#root", content, position);
    buttonManager.loadEditTitleBoard(board.id)
    modalManager.loadEditBoardTitleModal(board.id)

    domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
    );
}
