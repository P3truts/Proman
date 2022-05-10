import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let statusManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.colBoard);
            const content = statusBuilder(status);
            domManager.addChild(`.board[data-board-id="${boardId}"] > .board-columns`, content);
            domManager.addEventListener(
                `.board[data-board-id="${boardId}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    unloadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            domManager.removeChild(`.board[data-board-id="${boardId}"] > .board-columns`, '.board-column');
        }
    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const columnsContainer = domManager.getParent(`.board[data-board-id="${boardId}"] > .board-columns`);
    if (columnsContainer.innerHTML.length > 0) {
            statusManager.unloadStatuses(boardId);
    } else {
    }
}