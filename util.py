from functools import wraps
from flask import jsonify, request
import password_handling
import queries


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """

    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function


def get_submitted_data(key):
    return request.json.get(key) if request.is_json else request.form.get(key)


def get_verified_user(user):
    user_db = queries.get_user(user["username"])
    if user_db:
        if password_handling.verify_password(user["password"], user_db["password"]):
            return user_db
    else:
        return False


def get_logged_user(session, user):
    return session[user] if user in session else None
