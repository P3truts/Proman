from functools import wraps
from flask import jsonify, request


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