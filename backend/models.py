from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

#shared database object for all models
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    accounts = db.relationship("Account", backref="user", lazy=True, cascade="all, delete-orphan")
    transactions = db.relationship("Transaction", backref="user", lazy=True, cascade="all, delete-orphan")

    #return safe user data for api responses
    def toDict(self):
        return {
            "id": self.id,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

class Account(db.Model):
    __tablename__ = "accounts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    plaid_account_id = db.Column(db.String(255), unique=True, nullable=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    mask = db.Column(db.String(20), nullable=True)
    transactions = db.relationship("Transaction", backref="account", lazy=True, cascade="all, delete-orphan")

    #return account data for api responses
    def toDict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plaid_account_id": self.plaid_account_id,
            "name": self.name,
            "type": self.type,
            "mask": self.mask,
        }

class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"), nullable=False)
    plaid_transaction_id = db.Column(db.String(255), unique=True, nullable=True)
    date = db.Column(db.Date, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(255), nullable=True)
    merchant_name = db.Column(db.String(255), nullable=True)

    #return transaction data for api responses
    def toDict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "account_id": self.account_id,
            "plaid_transaction_id": self.plaid_transaction_id,
            "date": self.date.isoformat() if self.date else None,
            "name": self.name,
            "amount": self.amount,
            "category": self.category,
            "merchant_name": self.merchant_name,
            "account": self.account.toDict() if self.account else None,
        }
