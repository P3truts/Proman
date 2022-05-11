import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let statusManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.colBoard);
            const content = statusBuilder(status);
            domManager.addChild(`.board[data-board-id="${boardId}"] > .board-columns[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.board-title[data-board-id="${boardId}"]`,
                "click",
                showHideButtonHandler
            );
        }
        const columnButton = htmlFactory(htmlTemplates.colBtn);
        const colBtn = columnButton(boardId);
        domManager.addChild(`.board[data-board-id="${boardId}"]`, colBtn);
        domManager.addEventListener(
            `.add-column-button[data-board-id="${boardId}"]`,
            "click",
            addColBtnHandler
        );
    },
    unloadStatuses: async function (boardId) {
        domManager.removeChild(`.board[data-board-id="${boardId}"]`,`.add-column-button[data-board-id="${boardId}"]`);
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            domManager.removeChild(`.board[data-board-id="${boardId}"] > .board-columns[data-board-id="${boardId}"]`, '.board-column');
        }

    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId);
    const columnsContainer = domManager.getParent(`.board[data-board-id="${boardId}"] > .board-columns[data-board-id="${boardId}"]`);
    console.log(columnsContainer)
    if (columnsContainer.innerHTML.length > 0) {
            statusManager.unloadStatuses(boardId);
            columnsContainer.innerHTML = "";
    } else {
    }
}

function addColBtnHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const statusBuilder = htmlFactory(htmlTemplates.colBoard);
    const content = statusBuilder(status);
}