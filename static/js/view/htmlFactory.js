export const htmlTemplates = {
    board: 1,
    card: 2,
    colBoard: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.colBoard]: colBoardBuilder
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
                <div class="board" data-board-id=${board.id}>${board.title}
                    <div class="board-columns"></div>
                </div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
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

