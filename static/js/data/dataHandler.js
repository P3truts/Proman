export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function () {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        return await apiGet("/api/statuses")
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getBoardById: async function (boardId) {
        return await apiGet(`/api/board/${boardId}`)
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (payload) {
        // creates new board, saves it and calls the callback function with its data
        return await apiPost("/api/new-board",payload)
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    updateBoardTitle: async function (payload) {
        return await apiPost(`/api/board/${payload.id}`,payload)
    },

    updateCardTitle: async function (payload) {
        return await apiPost(`/api/card/${payload.id}`,payload)
    }
};

async function apiGet(url) {
    try {
        let response = await fetch(url)
        return await response.json();
    } catch(error) {
        console.log(error)
    }
}

async function apiPost(url, payload) {
       const request = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        try {
            return await request.json();
        } catch (error) {
            console.error(error);
        }
}

async function apiDelete(url) {}

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

async function apiPatch(url) {}
