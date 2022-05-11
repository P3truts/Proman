import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {boardsManager} from "./boardsManager.js";

export let modalManager = {
    loadModal: function () {
        const modalBuilder = htmlFactory(htmlTemplates.modal);
        const content = modalBuilder("/api/new-board");
        domManager.addChild("#board-modal-div", content);
        domManager.addEventListener("#form-new-board", "submit", insertBoard)
        },
}

async function insertBoard(event) {
        event.preventDefault()

        const title = event.target.title.value
        const newBoard = await dataHandler.createNewBoard({title: title})
        boardsManager.loadBoard(newBoard)
}