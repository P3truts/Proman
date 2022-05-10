import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";

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
        await dataHandler.createNewBoard({title: title})
        console.log('s-a trimis raspunsul')
        // await dataHandler.getBoards()

}