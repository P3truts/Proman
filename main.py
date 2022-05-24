from flask import Flask, render_template, request
from util import json_response, get_submitted_data
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
def get_statuses():
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
    title = get_submitted_data("title")
    return queries.insert_board(title)


@app.get("/api/board/<board_id>")
def get_board(board_id):
    return queries.get_board_by_id(board_id)


@app.post("/api/board/<board_id>")
def update_board(board_id):
    title = get_submitted_data("title")
    return queries.update_board_title(board_id, title)


@app.post("/api/card/<card_id>")
def update_card(card_id):
    title = get_submitted_data("title")
    return queries.update_card_title(card_id, title)


@app.get("/api/card_status/<status_id>:<card_id>")
def get_card_status(status_id):
    return queries.get_card_status(status_id)


@app.post("/api/update-card/<card_id>/<status_id>")
def update_card_status(card_id, status_id):
    return queries.update_card_status(card_id, status_id)


@app.post("/api/new-card")
def new_card():
    title = get_submitted_data("title")
    board_id = get_submitted_data("board_id")
    order = get_submitted_data("card_order")
    status = get_submitted_data("status_id")
    return queries.insert_card(board_id, status, title, order)


@app.get("/registration")
def registration():
    return render_template("registration.html")


@app.post("/registration")
def register_user():
    user = {
        "username": request.form["user"],
        "password": request.form["password"],
    }
    # try:
    #     if not user["username"] or not user["password"]:
    #         raise ValueError()
    #     user["password"] = password_handling.hash_password(user["password"])
    #     data_manger.insert_user(user)
    #     flash("Successful registration. Log in to continue!")
    #     return redirect(url_for("login"))
    # except ValueError:
    #     flash("Please, fill in both fields")
    #     return render_template("registration.html")
    # except psycopg2.Error as e:
    #     error = e.pgcode
    #     flash("User already registered")
    #     return render_template("registration.html")


@app.post("/api/new-status")
def new_status():
    title = get_submitted_data("title")
    return queries.insert_status(title)


@app.get("/api/status")
@json_response
def get_api_status():
    h = queries.get_status()
    return queries.get_status()


def main():
    app.run(debug=True)


if __name__ == "__main__":
    main()
