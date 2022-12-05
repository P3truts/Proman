import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { dataHandler } from "../data/dataHandler.js";
import { boardsManager } from "./boardsManager.js";
import { cardsManager } from "./cardsManager.js";
import { formManager } from "./formManager.js";
import {statusManager} from "./statusManager.js";

export let modalManager = {
    loadNewBoardModal: function () {
        const config = {
            id: "new-board-modal",
            title: "ADD BOARD",
            formApi: "/api/new-board",
            formId: "form-new-board",
            parent: "#board-modal-div",
            label: "Board Title",
        };

        createModal(config);
        formManager.oneInputModal(config);
        domManager.addEventListener(`#${config.formId}`, "submit", insertBoard);
    },

    loadEditBoardTitleModal: function (boardId) {
        const config = {
            id: `edit-title-board-modal-${boardId}`,
            title: "EDIT TITLE",
            formApi: `/api/board/${boardId}`,
            parent: "#board-modal-div",
            formId: `form-edit-title-${boardId}`,
            label: "Board Title",
        };
        createModal(config);
        formManager.oneInputModal(config);

        domManager.addEventListener(
            `#${config.formId}`,
            "submit",
            async (event) => {
                await editBoardTitle(event, config, boardId);
            }
        );
    },

    loadNewCardModal: async (boardId) => {
        const config = {
            id: `add-card-modal-${boardId}`,
            title: "ADD Card",
            formApi: "/api/new-card",
            formId: `form-new-card-${boardId}`,
            parent: "#board-modal-div",
            label: "Card Title",
        };
        config.statuses = await dataHandler.getStatuses();
        createModal(config);
        await formManager.newCardForm(config);
        domManager.addEventListener(
            `#${config.formId}`,
            "submit",
            async (event) => {
                await insertCard(event, config, boardId);
            }
        );
    },

    editCardTitle: function (cardId, boardId) {
        const config = {
            id: `card_title_${cardId}`,
            title: "Rename Card",
            formApi: `/api/card/${cardId}`,
            parent: "#board-modal-div",
            formId: `form-edit-card-title-${cardId}`,
            label: "Card Title",
        };
        createModal(config);
        formManager.oneInputModal(config);

        domManager.addEventListener(
            `#${config.formId}`,
            "submit",
            async (event) => {
                await editCardTitle(event, boardId, config, cardId);
            }
        );
    },
    loadNewStatusModal: function (boardId) {
        const config = {
            id: `add-column-modal-${boardId}`,
            title: "Add Column",
            formApi: "/api/new-status",
            formId: "form-new-status",
            parent: "#board-modal-div",
            label: "Status Title",
        };

        createModal(config);
        formManager.oneInputModal(config);
        domManager.addEventListener(
            `#${config.formId}`,
            "submit",
            async(event) => {
                await insertStatus(event, boardId)
            }
        );
    },

    loadEditStatusModal: function (boardId) {
        const config = {
            id: `edit-column-modal-${boardId}`,
            title: "Edit Column",
            formApi: "/api/edit-status",
            formId: "form-edit-status",
            parent: "#board-modal-div",
            label: "Edit Status Title",
        };

        createModal(config);
        formManager.oneInputModal(config);
        domManager.addEventListener(
            `#${config.formId}`,
            "submit",
            async(event) => {
                await insertStatus(event, boardId)
            }
        );
    },

    // loadUserRegistrationModal: function() {
    //       const config = {
    //         id: "user-registration-modal",
    //         title: "Registration",
    //         formApi: "/api/new-status",
    //         formId: "form-user-registration",
    //         parent: "#board-modal-div",
    //         label: "Status Title",
    //     };
    //       createModal(config);
    // },

    loadNewPrivateBoardModal: function () {
        const config = {
            id: "new-private-board-modal",
            title: "ADD PRIVATE BOARD",
            formApi: "/api/new-board",
            formId: "form-new-private-board",
            parent: "#board-modal-div",
            label: "Board Title",
        };

        createModal(config);
        formManager.oneInputModal(config);
        domManager.addEventListener(`#${config.formId}`, "submit", insertBoard);
    },
    loadBoardDelConfirmModal: function (board) {
        const config = {
            id: `board-del-confirm-modal-${board.id}`,
            title: "DELETION CONFIRMATION",
            formApi: `/api/delete-board/${board.id}`,
            formId: `form-delete-board-${board.id}`,
            parent: "#board-modal-div",
            label: `Are you sure you want to delete this board: ${board.title}?`,
        };

        createModal(config);
        formManager.delModal(config);
        domManager.addEventListener(`#${config.formId}`, "submit",
        async (event)=>await deleteBoard(event, board.id));
    },

    loadStatusDelConfirmModal: function (boardId, status) {
        const config = {
            id: `status-del-confirm-modal-${status.id}`,
            title: "DELETION CONFIRMATION",
            formApi: `/api/delete-status/${status.id}`,
            formId: `form-delete-status-${status.id}`,
            parent: "#board-modal-div",
            label: `Are you sure you want to delete this status: ${status.title}?`,
        };

        const statusDelModal = domManager.getParent(`#form-delete-status-${status.id}`);
        createModal(config);
        if (!statusDelModal) {
            formManager.delModal(config);
            domManager.addEventListener(`#${config.formId}`, "submit",
                async (event) => await deleteStatus(event, boardId, status.id));
        }
    },


};

function createModal(config) {
    domManager.addChild(
        config.parent,
        htmlFactory(htmlTemplates.modal)(config)
    );
}

async function insertBoard(event) {
    event.preventDefault();

    const title = event.target.title.value;
    try {
        const newBoard = await dataHandler.createNewBoard({ title: title });
        $("#new-board-modal").modal("hide");
        $("#new-private-board-modal").modal("hide");
        await boardsManager.loadNewBoard(newBoard);
    } catch (error) {
        alert("!We have encountered some error: Retry to create a new board");
    }
}

async function editBoardTitle(event, config, boardId) {
    event.preventDefault();
    const title = event.target.title.value;
    try {
        const editedBoard = await dataHandler.updateBoardTitle({
            id: boardId,
            title: title,
        });
        $(`#${config.id}`).modal("hide");
        await boardsManager.updateBoard(editedBoard);
    } catch (error) {
        alert("Operation was not successful! Please try again");
    }
}

async function editCardTitle(event, boardId, config, cardId) {
    event.preventDefault();
    const title = event.target.title.value;

    try {
        const editedCard = await dataHandler.updateCardTitle({
            id: cardId,
            title: title,
        });
        $(`#${config.id}`).modal("hide");
        await cardsManager.updateTitleCard(editedCard, boardId);
    } catch (error) {
        alert(error);
    }
}

async function insertCard(event, config, boardId) {
    event.preventDefault();
    const title = event.target.title.value;
    const status = event.target.status.value;
    const payload = {
        board_id: boardId,
        status_id: +status,
        title: title,
        card_order: 1,
    };
    try {
        const newCard = await dataHandler.createNewCard(payload);
        $(`#${config.id}`).modal("hide");
        cardsManager.newCard(newCard, boardId);
    } catch (error) {
        alert(error);
    }
}

async function insertStatus(event, boardId) {
    event.preventDefault();

    const title = event.target.title.value;
    try {
        await dataHandler.createNewStatus({ title: title.trim() });
        $(`#add-column-modal-${boardId}`).modal("hide");
        await statusManager.loadNewStatus(boardId);
    } catch (error) {
        alert("!We have encountered some error: Retry to create a new status column");
        console.log(error);
    }
}


export function removeModal(cardId) {
    const modal = document.querySelector(`#card_title_${cardId}`)
    const parent = document.querySelector("#board-modal-div")
    parent.removeChild(modal)

}

async function deleteBoard(event, boardId) {
    event.preventDefault();
    $(`#board-del-confirm-modal-${boardId}`).modal("hide");
    domManager.removeBoard(`.board[data-board-id="${boardId}"]`)
    await dataHandler.deleteBoard(boardId)
    domManager.removeChild("#board-modal-div", `#board-del-confirm-modal-${boardId}`);
}

async function deleteStatus(event, boardId, statusId) {
    event.preventDefault();
    $(`#status-del-confirm-modal-${statusId}`).modal("hide");
    await dataHandler.deleteStatus(statusId)
    domManager.removeChild(`.board[data-board-id="${boardId}"] > .board-columns`,`.board-column[data-idstatus="${statusId}"]`)
    domManager.removeChild("#board-modal-div", `#status-del-confirm-modal-${statusId}`);
}