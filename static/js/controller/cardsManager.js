import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import {modalManager} from "./modalManager.js";

let dragItem = null;

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            modalManager.editCardTitle(card.id);

            domManager.addChild(
                `.board[data-board-id="${boardId}"] > .board-columns > .board-column > .board-column-content`,
                content
            );
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
            // card.addEventListener("dbclick", (event)=>{
            //     console.log("test")
            //     $(`#card_title_${card.id}`).modal('show')
            // })
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "dblclick",
                function (){
                    console.log("rename card")
                    $(`#card_title_${card.id}`).modal('show')
                }
            );
        }

        const cards2 = document.querySelectorAll(".card");
        const columns = document.querySelectorAll(".board-column-content");
        cards2.forEach((card) => {
            card.addEventListener("dragstart", dragStart);
            card.addEventListener("dragend", dragEnd);
        });
        columns.forEach((column) => {
            column.addEventListener("dragover", dragOver);
            column.addEventListener("dragenter", dragEnter);
            column.addEventListener("dragleave", dragLeave);
            column.addEventListener("drop", dragDrop);
        });
    },
};

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

function dragDrop() {
    console.log("drag dropped");
    this.append(dragItem);
}

function doubleclick(){
    console.log("doubleclick")
    $(`#card_title_${cardId}`).modal('show')
}

function editTitile(){

}