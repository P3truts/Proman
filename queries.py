import data_manager


def get_board_by_id(board_id):
    return data_manager.execute_select(
        """
        select * from boards b
        where b.id = %(board_id)s
        ;
        """,
        {"board_id": board_id},
        fetchall=False,
    )


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """,
        {"status_id": status_id},
    )

    return status


def get_boards():
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """,
        {"board_id": board_id},
    )

    return matching_cards


def get_statuses():
    statuses = data_manager.execute_select(
        """
        select * from statuses
        ;
        """
    )
    return statuses


def insert_board(title):
    return data_manager.execute_select(
        """
        insert  into boards(title)
        values(%(title)s)
        returning id, title
        ;
        """,
        {"title": title},
        fetchall=False,
    )


def update_board_title(id, title):
    return data_manager.execute_select(
        """
        update boards
        set title = %(title)s
        where id = %(id)s
        returning id, title
        """
        , {"id": id, "title": title},
        fetchall=False
    )


def insert_card(board_id, status_id, title, card_order):
    return data_manager.execute_select(
        """
        insert  into cards(board_id, status_id, title, card_order)
        values(%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)
        returning id, title
        ;
        """,
        {"board_id": board_id, "status_id": status_id, "title": title, "card_order": card_order},
        fetchall=False,
    )


def update_card_title(id,title):
    return data_manager.execute_select(
        """
        update cards
        set title = %(title)s
        where id = %(id)s
        returning id, board_id, status_id, card_order, title
        """
        , {"id": id, "title": title},
        fetchall=False
    )


def update_card_status(status_id, card_id):
    return data_manager.execute_select(
        """
        update cards
        set status_id = %(status_id)s
        where id = %(card_id)s
        """,
        {"status_id": status_id, "card_id": card_id},
        fetchall=False
    )
