from flask import Flask, render_template, url_for, request
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


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


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
