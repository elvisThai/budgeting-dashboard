from datetime import date, timedelta
import random

from app import app
from models import db, User, Account, Transaction
from utils.auth_helpers import hash_password

with app.app_context():
    # clear old data
    Transaction.query.delete()
    Account.query.delete()
    User.query.delete()
    db.session.commit()

    # create sample user
    user = User(
        email="test@example.com",
        password_hash=hash_password("Password123!")
    )
    db.session.add(user)
    db.session.commit()

    # create sample account
    account = Account(
        user_id=user.id,
        plaid_account_id=None,
        name="Checking Account",
        type="depository",
        mask="1234"
    )
    db.session.add(account)
    db.session.commit()

    categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health"]

    # create 75 sample transactions
    for i in range(75):
        txn = Transaction(
            user_id=user.id,
            account_id=account.id,
            plaid_transaction_id=None,
            date=date.today() - timedelta(days=i),
            name=f"Transaction {i + 1}",
            amount=round(random.uniform(5, 200), 2),
            category=random.choice(categories),
            merchant_name=f"Merchant {i + 1}"
        )
        db.session.add(txn)

    db.session.commit()
    print("Seeded database with 1 user, 1 account, and 75 transactions.")