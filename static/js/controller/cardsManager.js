import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import {modalManager} from "./modalManager.js";

let dragItem = null;

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        console.log(cards)
        for (let card of cards) {
            createCard(card, boardId)
        }
        initDragEvents()

    },

    updateTitleCard: function (card,boardId) {
        domManager.removeCard(`.card[data-card-id="${card.id}"`)
        createCard(card, boardId)
        document.querySelector(`.card[data-card-id="${card.id}"`).classList.add("border-green")
        initDragEvents()
    },

    newCard(card, boardId) {
        createCard(card, boardId)
        const newCard = document.querySelector(`.card[data-card-id="${card.id}"`)
        newCard.classList.add("border-green")
        initDragEvents()

    }
};


async function initDragEvents() {
        const cards2 = document.querySelectorAll(".card");
        const columnsTitle = document.querySelectorAll(".board-column-title");
        const columnsContent = document.querySelectorAll(".board-column-content");
        cards2.forEach((card) => {
            card.addEventListener("dragstart", dragStart);
            card.addEventListener("dragend", dragEnd);
        });
        columnsContent.forEach(column => {
            column.addEventListener("dragover", dragOver);
            column.addEventListener("dragenter", dragEnter);
            column.addEventListener("dragleave", dragLeave);
            column.addEventListener("drop", dragDrop);
        });
}

function deleteButtonHandler(clickEvent) {}

function dragStart() {
    console.log("drag started");
    dragItem = this;
    setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
    console.log("drag ended");
    this.className = "item";
    dragItem = null;
}

function dragOver(e) {
    e.preventDefault();
    console.log("drag over");
}

function dragEnter() {
    console.log("drag entered");
}

function dragLeave() {
    console.log("drag left");
}

async function dragDrop() {
    console.log("drag dropped");
    this.append(dragItem);
    console.log(this)
    this.getAttribute("board-id-status");
    const statusId = this.dataset.idstatus
    const cardStatus = dragItem.dataset.cardstatus
    const cardId = dragItem.dataset.cardId
    let cardCheck = checkCardStatus(statusId, cardStatus)
    if (!cardCheck) {
        await dataHandler.updateCardStatus({id: cardId, status: statusId})
    }
}

function createCard(card, boardId) {
        const cardBuilder = htmlFactory(htmlTemplates.card);
        const content = cardBuilder(card);
        let statusId = card.status_id
        let columnContent = document.querySelectorAll(".board-column-content")
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
                    function (){
                        $(`#card_title_${card.id}`).modal('show')
            }
        );



}


function checkCardStatus(statusId, cardStatus) {
    if (statusId === cardStatus) {
        return true;
    } else {
        return false;
    }
}