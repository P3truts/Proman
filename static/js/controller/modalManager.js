import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {boardsManager} from "./boardsManager.js";

export let modalManager = {
    loadNewBordModal: function () {
        const config = {
            id: "new-board-modal",
            title: "ADD BOARD",
            formApi: "/api/new-board",
            formId: "form-new-board",
        }

        const modalBuilder = htmlFactory(htmlTemplates.modal);
        const content = modalBuilder(config);
        domManager.addChild("#board-modal-div", content);
        domManager.addEventListener(`#${config.formId}`, "submit", insertBoard)
        },

    loadEditBoardTitleModal: function (boardId) {
        const config = {
            id: `edit-title-board-modal-${boardId}`,
            title: "EDIT TITLE",
            formApi: `/api/board/${boardId}`,
            parent: "#board-modal-div",
            formId: `form-edit-title-${boardId}`,
        }
        const modalBuilder = htmlFactory(htmlTemplates.modal);
        const content = modalBuilder(config);
        domManager.addChild(config.parent, content);
        domManager.addEventListener(`#${config.formId}`, "submit", async (event)=>{
            event.preventDefault()
            const title = event.target.title.value
            try {
                const editedBoard = await dataHandler.updateBoardTitle({id: boardId, title: title})
                $(`#${config.id}`).modal('hide')
                await boardsManager.updateBoard(editedBoard)
            } catch (error) {
                alert('Operation was not successful! Please try again')
            }
        })

    }
}

async function insertBoard(event) {
        event.preventDefault()

        const title = event.target.title.value
        try {
            const newBoard = await dataHandler.createNewBoard({title: title})
            $('#new-board-modal').modal('hide')
            await boardsManager.loadNewBoard(newBoard)
        } catch (error) {
            alert('!We have encountered some error: Retry to create a new board')
        }

}

