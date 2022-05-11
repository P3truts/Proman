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
        try {
            const newBoard = await dataHandler.createNewBoard({title: title})
            $('#new-board-modal').modal('hide')
            await boardsManager.loadBoard(newBoard)
        } catch (error) {
            alert('!We have encountered some error: Retry to create a new board')
        }


}