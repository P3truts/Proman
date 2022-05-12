from flask import Flask, render_template, url_for, request
from util import json_response
import mimetypes
import queries

mimetypes.add_type("application/javascript", ".js")
app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template("index.html")


@app.get("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.get("/api/statuses")
@json_response
def get_api():
    return queries.get_statuses()


@app.get("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.post("/api/new-board")
def new_board():
    title = request.json.get("title") if request.is_json else request.form.get("title")
    return queries.insert_board(title)


@app.get("/api/board/<board_id>")
def get_board(board_id):
    return queries.get_board_by_id(board_id)


@app.post("/api/board/<board_id>")
def update_board(board_id):
    title = request.json.get("title") if request.is_json else request.form.get("title")
    return queries.update_board_title(board_id, title)


@app.post("/api/card/<card_id>")
def update_card(card_id):
    title = request.json.get("title")
        # if request.is_json else request.form.get("title")
    return queries.update_card_title(card_id, title)


@app.get("/api/card_status/<status_id>")
def get_card_status(status_id):
    return queries.get_card_status(status_id)


@app.post("/api/update-card/<card_id>")
def update_card_status(card_id, status_id):
    print(card_id)
    print(status_id)
    return queries.update_card_status(card_id, status_id)



def main():
    app.run(debug=True)


if __name__ == "__main__":
    main()
