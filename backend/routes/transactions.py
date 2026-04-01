from datetime import datetime

from flask import Blueprint, g, jsonify, request

from models import Account, Transaction, db
from utils.auth_helpers import requireAuth

transactions_bp = Blueprint("transactions", __name__)


def parseDate(value):
    #parse date string from request
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except (TypeError, ValueError):
        return None


def validateTransactionPayload(payload):
    #collect create transaction errors
    errors = {}

    account_id = payload.get("account_id")
    amount = payload.get("amount")
    txn_date = parseDate(payload.get("date"))
    name = (payload.get("name") or "").strip()

    if not account_id:
        errors["account_id"] = "Account id is required."

    if amount in (None, ""):
        errors["amount"] = "Amount is required."
    else:
        try:
            float(amount)
        except (TypeError, ValueError):
            errors["amount"] = "Amount must be a number."

    if not payload.get("date"):
        errors["date"] = "Date is required."
    elif not txn_date:
        errors["date"] = "Date must be in YYYY-MM-DD format."

    if not name:
        errors["name"] = "Name is required."

    return errors


@transactions_bp.get("")
@requireAuth
def getTransactions():
    #start with current user's transactions only
    query = Transaction.query.filter_by(user_id=g.current_user.id)

    date_from = parseDate(request.args.get("date_from"))
    date_to = parseDate(request.args.get("date_to"))
    category = (request.args.get("category") or "").strip()
    account_id = request.args.get("account_id")

    #filter by start date if given
    if request.args.get("date_from") and not date_from:
        return jsonify({"error": "date_from must be in YYYY-MM-DD format."}), 400

    #filter by end date if given
    if request.args.get("date_to") and not date_to:
        return jsonify({"error": "date_to must be in YYYY-MM-DD format."}), 400

    if date_from:
        query = query.filter(Transaction.date >= date_from)

    if date_to:
        query = query.filter(Transaction.date <= date_to)

    if category:
        query = query.filter(Transaction.category == category)

    if account_id:
        try:
            account_id = int(account_id)
        except ValueError:
            return jsonify({"error": "account_id must be a number."}), 400

        query = query.filter(Transaction.account_id == account_id)

    transactions = query.order_by(Transaction.date.desc(), Transaction.id.desc()).all()
    return jsonify({"transactions": [transaction.toDict() for transaction in transactions]}), 200


@transactions_bp.post("")
@requireAuth
def createTransaction():
    #read create payload from request
    payload = request.get_json(silent=True) or {}
    errors = validateTransactionPayload(payload)

    if errors:
        return jsonify({"errors": errors}), 400

    #make sure account belongs to current user
    account = Account.query.filter_by(id=payload["account_id"], user_id=g.current_user.id).first()
    if not account:
        return jsonify({"error": "Account not found."}), 404

    transaction = Transaction(
        user_id=g.current_user.id,
        account_id=account.id,
        date=parseDate(payload["date"]),
        name=payload["name"].strip(),
        amount=float(payload["amount"]),
        category=(payload.get("category") or "").strip() or None,
        merchant_name=(payload.get("merchant_name") or "").strip() or None,
        plaid_transaction_id=None,
    )

    db.session.add(transaction)
    db.session.commit()

    return jsonify({"transaction": transaction.toDict()}), 201


@transactions_bp.get("/<int:transaction_id>")
@requireAuth
def getTransaction(transaction_id):
    #only return a transaction owned by current user
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=g.current_user.id).first()

    if not transaction:
        return jsonify({"error": "Transaction not found."}), 404

    return jsonify({"transaction": transaction.toDict()}), 200
