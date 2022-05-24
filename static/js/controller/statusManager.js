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
            domManager.addEventListener(
            `.board[data-board-id="${boardId}"] > .board-columns > .board-column > 
            .board-column-title[data-idstatus="${status.id}"]`,
            "dblclick",
            () => $(`#edit-column-modal-${boardId}`).modal("show")
            );
        });

        domManager.addChild(
            `.board[data-board-id="${boardId}"]`,
            htmlFactory(htmlTemplates.colBtn)(boardId)
        );

        // domManager.addEventListener(
        //     `.add-column-btn[data-board-id="${boardId}"]`,
        //     "click",
        //     addColBtnHandler
        // );
    },
    clearColumnsHTML: function (boardId, container) {
        domManager.removeChild(
            `.board[data-board-id="${boardId}"]`,
            `.add-column-btn[data-board-id="${boardId}"]`
        );
        domManager.removeChild(
            `.board[data-board-id="${boardId}"]`,
            `#edit-column-modal-${boardId}`
        );
        buttonManager.removeBtn(boardId);
        container.innerHTML = "";
    },
    loadNewStatus: async function (boardId) {
        const newStatus = await dataHandler.getStatus();
        newStatus.forEach((status) => {
            domManager.addChild(
                `.board[data-board-id="${boardId}"] > .board-columns`,
                htmlFactory(htmlTemplates.colBoard)(status)
            );
            domManager.addEventListener(
            `.board[data-board-id="${boardId}"] > .board-columns > .board-column > 
            .board-column-title[data-idstatus="${status.id}"]`,
            "dblclick",
            () => $(`#edit-column-modal-${boardId}`).modal("show")
            );
        });
    },
    updateStatusTitle: async function(boardId, status) {
        domManager.removeElement(`.board[data-board-id="${boardId}"] > .board-columns > .board-column > 
            .board-column-title[data-idstatus="${status.id}"]`);
        domManager.addChild(
            `.board[data-board-id="${boardId}"] > .board-columns`,
            htmlFactory(htmlTemplates.colBoard)(status)
        );
    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const columnsContainer = domManager.getParent(
        `.board[data-board-id="${boardId}"] > .board-columns`
    );
    domManager.removeChild('#board-modal-div', `#add-column-modal-${boardId}`)
    if (columnsContainer && !!columnsContainer.innerHTML.length) {
        statusManager.clearColumnsHTML(boardId, columnsContainer);
    }

}

// async function addColBtnHandler(clickEvent) {
//     const boardId = clickEvent.target.dataset.boardId;
//     await statusManager.loadNewStatus(boardId);
// }

function editStatusTitle(dblclickEvent) {
    const statusTitle = dblclickEvent.target.dataset.statusId;
}
