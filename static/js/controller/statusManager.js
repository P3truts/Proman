import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { buttonManager } from "./buttonManager.js";

export let statusManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        buttonManager.loadAddCardBtn(boardId);

        statuses.forEach((status) => {
            domManager.addChild(
                `.board[data-board-id="${boardId}"] > .board-columns`,
                htmlFactory(htmlTemplates.colBoard)(status)
            );
            domManager.addEventListener(
                `.board-title[data-board-id="${boardId}"]`,
                "click",
                showHideButtonHandler
            );
        });

        domManager.addChild(
            `.board[data-board-id="${boardId}"]`,
            htmlFactory(htmlTemplates.colBtn)(boardId)
        );

        domManager.addEventListener(
            `.add-column-btn[data-board-id="${boardId}"]`,
            "click",
            addColBtnHandler
        );
    },

    clearColumnsHTML: async function (boardId, container) {
        domManager.removeChild(
            `.board[data-board-id="${boardId}"]`,
            `.add-column-btn[data-board-id="${boardId}"]`
        );
        container.innerHTML = "";
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const columnsContainer = domManager.getParent(
        `.board[data-board-id="${boardId}"] > .board-columns`
    );
    if (columnsContainer && !!columnsContainer.innerHTML.length) {
        statusManager.clearColumnsHTML(boardId, columnsContainer);
    }
    buttonManager.removeBtn(boardId)

}

function addColBtnHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
}
