import {boardsManager} from "./controller/boardsManager.js";
import {buttonManager} from "./controller/buttonManager.js";
import {modalManager} from "./controller/modalManager.js";

function init() {
    buttonManager.loadEditTitleBoard()
    buttonManager.loadNewBoardBtn()
    modalManager.loadModal()
    boardsManager.loadBoards();
}

init();
