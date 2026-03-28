from flask import Blueprint, g, jsonify, request

from models import User, db
from utils.auth_helpers import generateToken, hashPassword, requireAuth, verifyPassword
from utils.validators import validateLoginPayload, validateRegisterPayload

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    #read request body safely
    payload = request.get_json(silent=True) or {}
    errors = validateRegisterPayload(payload)

    if errors:
        return jsonify({"errors": errors}), 400

    #normalize email so duplicates are easier to catch
    email = payload["email"].strip().lower()

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered."}), 409

    #save user with hashed password
    user = User(email=email, password_hash=hashPassword(payload["password"]))
    db.session.add(user)
    db.session.commit()

    #return token right after signup
    token = generateToken(user.id)
    return jsonify({"token": token, "user": user.toDict()}), 201


@auth_bp.post("/login")
def login():
    #read login info from json
    payload = request.get_json(silent=True) or {}
    errors = validateLoginPayload(payload)

    if errors:
        return jsonify({"errors": errors}), 400

    #find user by normalized email
    email = payload["email"].strip().lower()
    user = User.query.filter_by(email=email).first()

    #reject invalid credentials
    if not user or not verifyPassword(payload["password"], user.password_hash):
        return jsonify({"error": "Invalid email or password."}), 401

    #send back a fresh jwt for future requests
    token = generateToken(user.id)
    return jsonify({"token": token, "user": user.toDict()}), 200


@auth_bp.get("/me")
@requireAuth
def me():
    #return the logged in user from middleware
    return jsonify({"user": g.current_user.toDict()}), 200
