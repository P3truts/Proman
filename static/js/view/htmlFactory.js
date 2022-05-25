const upper = (text) =>
    text
        .split(" ")
        .map((word) => (word[0]) ? (word[0].toUpperCase() + word.slice(1)) : (word.slice(1)))
        .join(" ");

export const htmlTemplates = {
    board: 1,
    card: 2,
    colBoard: 3,
    newBoardBtn: 4,
    modal: 5,
    colBtn: 6,
    oneInputForm: 7,
    InputWithCheckButtons: 8,
    userPasswordForm: 9,
};

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.colBoard]: colBoardBuilder,
    [htmlTemplates.newBoardBtn]: newBtnBuilder,
    [htmlTemplates.modal]: newBoardModalBuilder,
    [htmlTemplates.colBtn]: colBtnBuilder,
    [htmlTemplates.oneInputForm]: oneInputForm,
    [htmlTemplates.InputWithCheckButtons]: InputWithCheckButtons,
    [htmlTemplates.userPasswordForm]: userPasswordForm,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => "";
}

function boardBuilder(board) {
    return `
<div class="board-container mb-5">
    <section class="board" data-board-id="${board.id}">
        <div contenteditable="true" class="board board-title" data-board-id="${board.id}">
            ${board.title}
        </div>
        <button
            type="button"
            id="edit-board-button-${board.id}"
            class="edit-board-button"
            data-bs-toggle="modal"
            data-bs-target="#edit-title-board-modal-${board.id}"
        >
            <img src="./static/assets/edit-btn.png" alt="edit btn" />
        </button>
        <button
            class="toggle-board-button btn btn-success"
            data-board-id="${board.id}"
        >
            Show Cards
        </button>
        <div class="board-columns"></div>
    </section>
</div>
    `;
}

function cardBuilder(card) {
    return `
<div
    class="card"
    data-card-id="${card.id}"
    draggable="true"
    data-cardstatus="${card.status_id}"
>
    ${card.title}
</div>
`;
}

function colBoardBuilder(status) {
    return `
<div class="board-column">
    <div contenteditable="true" class="board-column-title" data-idstatus="${status.id}">
        ${upper(status.title)}
    </div>
    <div class="board-column-content" data-idstatus="${status.id}"></div>
</div>
`;
}

function newBtnBuilder(config) {
    return `
<button
    type="button"
    id="${config.id}"
    class="${config.class}"
    ${JSON.stringify(config.modal) ? config.modal : null}
>
    ${ config.name ? config.name : `<img src="${config.src}" alt="edit btn" />` }
</button>
    `;
}

function newBoardModalBuilder(config) {
    return `
<div
    class="modal fade"
    id="${config.id}"
    tabindex="-1"
    aria-labelledby="modal-${config.id}-title"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-${config.id}-title">
                    ${config.title}
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body" id="modal-body-${config.id}"></div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</div>

    `;
}

function colBtnBuilder(boardId) {
    return `
<button
    id="add-column-btn-${boardId}"
    class="add-column-btn btn btn-success"
    data-board-id="${boardId}"
    data-bs-toggle="modal"
    data-bs-target="#add-column-modal-${boardId}"
>
    Add Column
</button>

    `;
}

function oneInputForm(config) {
    return `
<form id="${config.formId}" action="${config.formApi}" method="post">
    <div class="mb-3">
        <label for="title" class="col-form-label">${config.label}</label>
        <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            maxlength="15"
            required
        />
    </div>
    <button type="submit" class="btn btn-primary">Save changes</button>
</form>

    `;
}

function InputWithCheckButtons(config) {
    return `
<form id="${config.formId}" action="${config.formApi}" method="post">
    <div class="mb-3">
        <label for="title" class="col-form-label">${ config.label }</label>
        <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            maxlength="15"
            required
        />
    </div>
    ${ config.statuses.map(createRadioBnt).join("") }
    <button type="submit" class="btn btn-primary">Save changes</button>
</form>
`;
}

function userPasswordForm(config) {
    return `
    <form id="${config.formId}" action="${config.formApi}" method="post">
      <div class="mb-3">
        <label for="user" class="form-label">Username</label>
        <input type="text" class="form-control" id="user" name="user" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" required>
      </div>
      ${config.confirmPassword ? `
        <div class="mb-3">
        <label for="password-confirm" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="password-confirm" name="password-confirm" required>
      </div>
      <div id="password-result"></div>
      ` : ""}
     <button id="password-btn" type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;
}

function createRadioBnt(status, index) {
    return `
<div class="form-check">
    <input
        class="form-check-input"
        type="radio"
        name="status"
        id="status-${status}-${ index + 1 }-radio-btn"
        value="${ index + 1 }"
        required
    />
    <label class="form-check-label" for="status-${status}-${ index + 1 }-radio-btn">
        ${status.title}
    </label>
</div>

    `;
}
