export const htmlTemplates = {
    board: 1,
    card: 2,
    colBoard: 3,
    newBoardBtn: 4,
    modal:5,
    colBtn: 6
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.colBoard]: colBoardBuilder,
    [htmlTemplates.newBoardBtn]: newBoardBtn,
    [htmlTemplates.modal]: newBoardModalBuilder,
    [htmlTemplates.colBtn]: colBtnBuilder,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container mb-5">
                <div class="board board-title" data-board-id=${board.id}>${board.title}
                    <div class="board-columns" data-board-id=${board.id}></div>
                </div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" draggable="true" data-card-id="${card.id}">${card.title}</div>`;
}


function colBoardBuilder(status) {
    return `
        <div class="board-column">
            <div class="board-column-title">${status.title[0].toUpperCase() + status.title.substring(1)}</div>
                <div class="board-column-content"></div>
            </div>
        </div>
`
}

function newBoardBtn(config) {
    return `
        <button type="button" id=${config.id} class="${config.class}"
            ${JSON.stringify(config.modal) ? config.modal : null}
        >
<!--        data-bs-toggle="modal" data-bs-target="#new-board-modal">-->
            ${config.name ? config.name : `<img src="${config.src}" alt="edit btn">`}
        </button>
    `
}

function newBoardModalBuilder(formApi) {
    return `
        <div class="modal fade" id="new-board-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Board</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="form-new-board" action=${formApi} method="post">
                  <div class="mb-3">
                    <label for="title" class="col-form-label">Board Title</label>
                    <input type="text" class="form-control" id="title" name="title" required>
                  </div>
                  <button type="submit" class="btn btn-primary">Save changes</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    `
}

function colBtnBuilder(board) {
    return `
                <button class="add-column-button" data-board-id="${board}">Add Column</button>
    `
}

