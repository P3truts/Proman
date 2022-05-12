import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {boardsManager} from "./boardsManager.js";
import {cardsManager} from "./cardsManager.js";

export let modalManager = {
    loadNewBordModal: function () {
        const config = {
            id: "new-board-modal",
            title: "ADD BOARD",
            formApi: "/api/new-board",
            formId: "form-new-board",
            parent: "#board-modal-div"
        }
        createModal(config)
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
        createModal(config)
        domManager.addEventListener(`#${config.formId}`, "submit", async (event)=>{
            await editBoardTitle(event,config, boardId)
        })

    },

    editCardTitle: function(cardId, boardId) {
        const config = {
            id: `card_title_${cardId}`,
            title: "Rename Card",
            formApi: `/api/card/${cardId}`,
            parent: "#board-modal-div",
            formId: `form-edit-card-title-${cardId}`,
        }
        createModal(config)
        domManager.addEventListener(`#${config.formId}`, "submit",async(event)=>{
            await editCardTitle(event, boardId, config, cardId)
        })

    }
}

function createModal(config) {
    const modalBuilder = htmlFactory(htmlTemplates.modal);
    const content = modalBuilder(config);
    domManager.addChild(config.parent, content);
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

async function editBoardTitle(event, config, boardId) {
            event.preventDefault()
            const title = event.target.title.value
            try {
                const editedBoard = await dataHandler.updateBoardTitle({id: boardId, title: title})
                $(`#${config.id}`).modal('hide')
                await boardsManager.updateBoard(editedBoard)
            } catch (error) {
                alert('Operation was not successful! Please try again')
            }

}


async function editCardTitle(event, boardId, config, cardId) {
                event.preventDefault()
            const title = event.target.title.value
            try {
                const editedCard = await dataHandler.updateCardTitle({id: cardId, title: title})
                $(`#${config.id}`).modal('hide')
                await cardsManager.updateTitleCard(editedCard, boardId)
            } catch (error) {
                alert(error)
            }

}

