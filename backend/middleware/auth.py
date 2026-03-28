from flask import g, request

from utils.auth_helpers import get_user_from_request


def load_current_user():
    g.current_user = None

    if request.method == "OPTIONS":
        return

    g.current_user = get_user_from_request()