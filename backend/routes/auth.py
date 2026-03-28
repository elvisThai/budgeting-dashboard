from flask import Blueprint, g, jsonify, request

from models import User, db
from utils.auth_helpers import generate_token, hash_password, require_auth, verify_password
from utils.validators import validate_login_payload, validate_register_payload

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    payload = request.get_json(silent=True) or {}
    errors = validate_register_payload(payload)

    if errors:
        return jsonify({"errors": errors}), 400

    email = payload["email"].strip().lower()

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered."}), 409

    user = User(email=email, password_hash=hash_password(payload["password"]))
    db.session.add(user)
    db.session.commit()

    token = generate_token(user.id)
    return jsonify({"token": token, "user": user.to_dict()}), 201


@auth_bp.post("/login")
def login():
    payload = request.get_json(silent=True) or {}
    errors = validate_login_payload(payload)

    if errors:
        return jsonify({"errors": errors}), 400

    email = payload["email"].strip().lower()
    user = User.query.filter_by(email=email).first()

    if not user or not verify_password(payload["password"], user.password_hash):
        return jsonify({"error": "Invalid email or password."}), 401

    token = generate_token(user.id)
    return jsonify({"token": token, "user": user.to_dict()}), 200


@auth_bp.get("/me")
@require_auth
def me():
    return jsonify({"user": g.current_user.to_dict()}), 200
