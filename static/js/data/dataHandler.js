export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function () {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        return await apiGet("/api/statuses");
    },
    getCardStatus: async function (statusId) {
        return await apiGet(`/api/card_status/${statusId}/`);
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getBoardById: async function (boardId) {
        return await apiGet(`/api/board/${boardId}`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (payload) {
        // creates new board, saves it and calls the callback function with its data
        return await apiPost("/api/new-board", payload);
    },
    createNewCard: async function (payload, cardTitle, boardId, statusId) {
        console.log(payload);
        return await apiPost("/api/new-card", payload);
    },
    updateBoardTitle: async function (payload) {
        return await apiPost(`/api/board/${payload.id}`, payload);
    },

    updateCardTitle: async function (payload) {
        return await apiPost(`/api/card/${payload.id}`, payload);
    },

    updateCardStatus: async function (payload) {
        return await apiPost(
            `/api/update-card/${payload.id}/${payload.status}`,
            payload
        );
    },
    createNewStatus: async function (payload) {
        // creates new status column, saves it and calls the callback function with its data
        return await apiPost("/api/new-status", payload);
    },
    getStatus: async function () {
        return await apiGet("/api/status");
    },
    editStatus: async function (payload) {
        // creates new status column, saves it and calls the callback function with its data
        return await apiPost(`/api/edit-status/${payload.id}/${payload.title}`, payload);
    },

    deleteBoard: async function (boardId) {
        return await apiDelete(`/api/delete-board/${boardId}`)
    },

    deleteStatus: async function (statusId) {
        return await apiDelete(`/api/delete-status/${statusId}`)
    },

    deleteCard: async function (cardId) {
        return await apiDelete(`/api/delete-card/${cardId}`)
    }
};

async function apiGet(url) {
    const request = await fetch(url);
    try {
        return await request.json();
    } catch (error) {
        console.log(error);
    }
}

async function apiPost(url, payload) {
    const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    console.log(payload);
    console.log(request);
    try {
        return await request.json();
    } catch (error) {
        console.error(error);
    }
}

async function apiDelete(url) {
    const request = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    try {
        return await request.json();
    } catch (error) {
        console.log(request);
        console.error(error);
    }
}

async function apiPut(url, data) {
    const request = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    try {
        return await request.json();
    } catch (error) {
        console.error(error);
    }
}

async function apiPatch(url) {
    const request = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });
    try {
        return await request.json();
    } catch (error) {
        console.error(error);
    }
}
