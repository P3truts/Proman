import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let statusManager = {
    loadStatuses: async function () {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.board);
            const content = statusBuilder(status);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}