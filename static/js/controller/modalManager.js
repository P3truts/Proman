import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { dataHandler } from "../data/dataHandler.js";
import { boardsManager } from "./boardsManager.js";
import { cardsManager } from "./cardsManager.js";
import { formManager } from "./formManager.js";

export let modalManager = {
    loadNewBordModal: function () {
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
    loadNewStatusModal: function () {
        const config = {
            id: "new-status-modal",
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
            insertStatus
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
    // }
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

async function insertStatus(event) {
    event.preventDefault();

    const title = event.target.title.value;
    try {
        const newStatus = await dataHandler.createNewStatus({ title: title });
        $("#new-status-modal").modal("hide");
        await statussManager.loadNewStatus(newStatus);
    } catch (error) {
        alert("!We have encountered some error: Retry to create a new board");
    }
}


export function removeModal(cardId) {
    const modal = document.querySelector(`#card_title_${cardId}`)
    const parent = document.querySelector("#board-modal-div")
    parent.removeChild(modal)

}
