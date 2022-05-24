import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { modalManager, removeModal } from "./modalManager.js";

let dragItem = null;

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        cards.forEach((card) => createCard(card, boardId));
        initDragEvents();
    },

    updateTitleCard: function (card, boardId) {
        removeModal(card.id)
        domManager.removeCard(`.card[data-card-id="${card.id}"]`);
        createCard(card, boardId);
        document
            .querySelector(`.card[data-card-id="${card.id}"]`)
            .classList.add("border-green");
        initDragEvents();
    },

    newCard(card, boardId) {
        createCard(card, boardId);
        const newCard = document.querySelector(
            `.card[data-card-id="${card.id}"]`
        );
        newCard.classList.add("border-green");
        initDragEvents();
    },
};

function initDragEvents() {
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);
    });
    document.querySelectorAll(".board-column-content").forEach((column) => {
        column.addEventListener("dragover", dragOver);
        column.addEventListener("dragenter", dragEnter);
        column.addEventListener("dragleave", dragLeave);
        column.addEventListener("drop", dragDrop);
    });
}

function deleteButtonHandler(clickEvent) {}

function dragStart() {
    dragItem = this;
    setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
    this.className = "card";
    dragItem = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter() {}

function dragLeave() {}

async function dragDrop() {
    this.append(dragItem);
    this.getAttribute("board-id-status");
    const statusId = this.dataset.idstatus;
    const cardStatus = dragItem.dataset.cardstatus;
    const cardId = dragItem.dataset.cardId;
    let cardCheck = checkCardStatus(statusId, cardStatus);
    if (!cardCheck) {
        await dataHandler.updateCardStatus({ id: cardId, status: statusId });
    }
}

function createCard(card, boardId) {
    const cardBuilder = htmlFactory(htmlTemplates.card);
    const content = cardBuilder(card);
    let statusId = card.status_id;
    domManager.addChild(
        `.board[data-board-id="${boardId}"] > .board-columns > .board-column > .board-column-content[data-idstatus="${statusId}"]`,
        content
    );
    modalManager.editCardTitle(card.id, boardId);

    domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "click",
        deleteButtonHandler
    );

    domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "dblclick",
        () => $(`#card_title_${card.id}`).modal("show")
    );
}

function checkCardStatus(statusId, cardStatus) {
    return statusId === cardStatus;
}

