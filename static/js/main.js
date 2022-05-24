import { boardsManager } from "./controller/boardsManager.js";
import { buttonManager } from "./controller/buttonManager.js";
import { modalManager } from "./controller/modalManager.js";

function init() {
    buttonManager.loadUserRegistration()
    buttonManager.loadNewBoardBtn();
    modalManager.loadNewBordModal();
    boardsManager.loadBoards();
}

init();
