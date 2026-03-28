from datetime import datetime, timedelta, timezone
from functools import wraps

import bcrypt
import jwt
from flask import current_app, g, jsonify, request

from models import User


def hashPassword(password):
    #turn plain text into a bcrypt hash
    password_bytes = password.encode("utf-8")
    return bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")


def verifyPassword(password, password_hash):
    #compare login password against saved hash
    password_bytes = password.encode("utf-8")
    hash_bytes = password_hash.encode("utf-8")
    return bcrypt.checkpw(password_bytes, hash_bytes)


def generateToken(user_id):
    #create jwt with issue time and expiry
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(hours=current_app.config["JWT_EXPIRATION_HOURS"]),
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")


def decodeToken(token):
    return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])


def getBearerToken():
    #pull token from authorization header
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    return auth_header.split(" ", 1)[1].strip()


def getUserFromRequest():
    #look up the current user from the jwt
    token = getBearerToken()
    if not token:
        return None

    try:
        payload = decodeToken(token)
    except jwt.InvalidTokenError:
        return None

    user_id = payload.get("sub")
    if not user_id:
        return None

    return User.query.get(int(user_id))


def requireAuth(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        #block routes when no user is attached to the request
        if g.get("current_user") is None:
            return jsonify({"error": "Authentication required."}), 401
        return fn(*args, **kwargs)

    return wrapper
