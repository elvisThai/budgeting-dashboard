def validate_register_payload(payload):
    errors = {}

    email = (payload.get("email") or "").strip()
    password = payload.get("password") or ""

    if not email:
        errors["email"] = "Email is required."
    elif "@" not in email or "." not in email.split("@")[-1]:
        errors["email"] = "Email must be valid."

    if not password:
        errors["password"] = "Password is required."
    elif len(password) < 8:
        errors["password"] = "Password must be at least 8 characters."

    return errors


def validate_login_payload(payload):
    errors = {}

    if not (payload.get("email") or "").strip():
        errors["email"] = "Email is required."

    if not payload.get("password"):
        errors["password"] = "Password is required."

    return errors
