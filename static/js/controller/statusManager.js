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
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
}