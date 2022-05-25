import { boardsManager } from "./controller/boardsManager.js";
import { buttonManager } from "./controller/buttonManager.js";
import { modalManager } from "./controller/modalManager.js";

async function init() {
    buttonManager.loadNewBoardBtn();
    modalManager.loadNewBordModal();
    await boardsManager.loadBoards();
}

await init();
