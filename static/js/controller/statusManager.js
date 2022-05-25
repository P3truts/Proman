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
            addEditEvent(boardId, status);
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
            addEditEvent(boardId, status);
        });
    },
    // updateStatusTitle: async function(boardId, status) {
    //     domManager.removeElement(`.board[data-board-id="${boardId}"] > .board-columns > .board-column >
    //         .board-column-title[data-idstatus="${status.id}"]`);
    //     domManager.addChild(
    //         `.board[data-board-id="${boardId}"] > .board-columns`,
    //         htmlFactory(htmlTemplates.colBoard)(status)
    //     );
    // }
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


function addEditEvent(boardId, status) {
        // domManager.addEventListener(
        // `.board[data-board-id="${boardId}"] > .board-columns > .board-column >
        // .board-column-title[data-idstatus="${status.id}"]`,
        // "dblclick",
        // () => $(`#edit-column-modal-${boardId}`).modal("show")
        // );
        // domManager.addEventListener(`.board-column-title[data-idstatus="${status.id}"]`,
        //     'input', async function() {
        //         await dataHandler.editStatus({ id: status.id, title: this.innerHTML });
        //         console.log(this.innerHTML);
        //     }
        // );
        const title = domManager.getParent(`.board-column-title[data-idstatus="${status.id}"]`).innerText;
        domManager.addEventListener(`.board-column-title[data-idstatus="${status.id}"]`,
            'keydown', async function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    let statusId = (status.id).toString();
                    let statusTitle = this.innerText;
                    await dataHandler.editStatus({id: statusId, title: statusTitle });
                    alert(`The new status title: "${this.innerText}" has been saved!`);
                } else if (event.key === "Escape") {
                    this.innerText = title;
                    alert(`No changes have been saved!`);
                }
            }
        );
}

