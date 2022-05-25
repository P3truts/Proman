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
        createBoard(board, "beforebegin", true);
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
    editableTitleDiv(board)
    domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
    );
}

function editableTitleDiv(board) {
     const titleDivValue = document.querySelector(`.board-title[data-board-id="${board.id}"]`).innerText
    domManager.addEventListener(`.board-title[data-board-id="${board.id}"]`, 'keyup',
        (event)=> getBoardTitle(event, board.id, titleDivValue))
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
        modalManager.loadEditStatusModal(boardId);
    }
}

async function getBoardTitle(event, boardId, titleDivValue) {
    if(event.key === "Enter") {
        event.preventDefault()
        await editBoardTitle(event, boardId)

    } else if (event.key === "Escape") {
        event.currentTarget.innerText =titleDivValue
    }
}

async function editBoardTitle(event, boardId) {
    event.preventDefault();
    const title = event.currentTarget.innerText;
    try {
        const editedBoard = await dataHandler.updateBoardTitle({
            id: boardId,
            title: title,
        });
        await boardsManager.updateBoard(editedBoard);
    } catch (error) {
        alert("Operation was not successful! Please try again");
    }
}