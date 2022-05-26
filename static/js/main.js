import { boardsManager } from "./controller/boardsManager.js";
import { buttonManager } from "./controller/buttonManager.js";
import { modalManager } from "./controller/modalManager.js";

async function init() {
    buttonManager.loadNewBoardBtn();
    buttonManager.loadNewPrivateBoardBtn();
    modalManager.loadNewBoardModal();
    modalManager.loadNewPrivateBoardModal();
    await boardsManager.loadBoards();
}

await init();
