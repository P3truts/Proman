import data_manager


def get_board_by_id(board_id):
    return data_manager.execute_select(
        "SELECT * FROM boards b WHERE b.id = %(board_id)s;",
        {"board_id": board_id},
        fetchall=False,
    )


def get_card_status(status_id):
    return data_manager.execute_select(
        "SELECT * FROM statuses s WHERE s.id = %(status_id)s;",
        {"status_id": status_id},
    )


def get_boards(user_id):
    if user_id:
        return data_manager.execute_select("""
        SELECT * FROM boards 
        WHERE user_id='0' OR user_id=%(user_id)s ORDER BY id ASC;
        """, {'user_id': user_id})
    else:
        return data_manager.execute_select("SELECT * FROM boards WHERE user_id='0' ORDER BY id ASC;")


def get_cards_for_board(board_id):
    return data_manager.execute_select(
        "SELECT * FROM cards WHERE cards.board_id = %(board_id)s;",
        {"board_id": board_id},
    )


def get_statuses():
    return data_manager.execute_select("SELECT * FROM statuses ORDER BY id ASC;")


def insert_board(title, user_id):
    return data_manager.execute_select(
        "INSERT INTO boards (title, user_id) VALUES (%(title)s, %(user_id)s) RETURNING id, title, user_id;",
        {"title": title, "user_id": user_id},
        fetchall=False,
    )


def update_board_title(id, title):
    return data_manager.execute_select(
        """
            UPDATE boards
            SET title = %(title)s
            WHERE id = %(id)s
            RETURNING id, title;
        """,
        {
            "id": id,
            "title": title,
        },
        fetchall=False,
    )


def insert_card(board_id, status_id, title, card_order):
    return data_manager.execute_select(
        """
            INSERT INTO cards(board_id, status_id, title, card_order)
            VALUES (%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)
            RETURNING id, board_id, status_id, title, card_order;
        """,
        {
            "board_id": board_id,
            "status_id": status_id,
            "title": title,
            "card_order": card_order,
        },
        fetchall=False,
    )


def update_card_title(id, title):
    return data_manager.execute_select(
        """
            UPDATE cards
            SET title = %(title)s
            WHERE id = %(id)s
            RETURNING id, board_id, status_id, card_order, title;
        """,
        {
            "id": id,
            "title": title,
        },
        fetchall=False,
    )


def update_card_status(id, status_id):
    return data_manager.execute_select(
        """
            UPDATE cards
            SET status_id = %(status_id)s
            WHERE id = %(id)s
            RETURNING status_id, id;
        """,
        {
            "status_id": status_id,
            "id": id,
        },
        fetchall=False,
    )


def insert_status(title):
    return data_manager.execute_select(
        "INSERT INTO statuses (title) VALUES (%(title)s) RETURNING id, title;",
        {"title": title},
        fetchall=False,
    )


def get_status():
    return data_manager.execute_select("SELECT * FROM statuses ORDER BY id DESC LIMIT 1;")


def insert_user(user):
    return data_manager.execute_select(
        "INSERT INTO users (username, password) VALUES(%(username)s, %(password)s)",
        {"username": user["username"], "password": user["password"]},
        fetchall=False
    )


def get_user(user):
    return data_manager.execute_select(
        "SELECT * FROM users WHERE username=%(username)s",
        {"username": user},
        fetchall=False
    )


def update_status(status_id, status_title):
    return data_manager.execute_select("""
        UPDATE statuses
        SET title = %(status_title)s
        WHERE id = %(status_id)s;
        """,
       {"status_id": status_id, "status_title": status_title},
       fetchall=False,
       )


def delete_board(board_id):
    return data_manager.execute_select("""
        DELETE FROM cards
        WHERE board_id=%(board_id)s;
        
        DELETE FROM  boards
        WHERE id=%(board_id)s;
    """,
        {"board_id": board_id},
        fetchall=False)


def delete_status(status_id):
    return data_manager.execute_select("""
        DELETE FROM cards
        WHERE status_id=%(status_id)s;

        DELETE FROM  statuses
        WHERE id=%(status_id)s;
    """,
       {"status_id": status_id},
       fetchall=False)


