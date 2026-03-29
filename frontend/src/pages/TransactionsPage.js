import React from 'react';
import { Search, Filter, Plus, Download } from 'lucide-react';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const transactions = [
    {
      id: 1,
      description: 'Grocery Store',
      amount: -85.50,
      category: 'Food & Dining',
      date: '2024-01-15',
      type: 'expense',
      account: 'Chase Checking'
    },
    {
      id: 2,
      description: 'Salary Deposit',
      amount: 4200.00,
      category: 'Income',
      date: '2024-01-14',
      type: 'income',
      account: 'Chase Checking'
    },
    {
      id: 3,
      description: 'Gas Station',
      amount: -45.20,
      category: 'Transportation',
      date: '2024-01-13',
      type: 'expense',
      account: 'Chase Credit Card'
    },
    {
      id: 4,
      description: 'Coffee Shop',
      amount: -12.75,
      category: 'Food & Dining',
      date: '2024-01-12',
      type: 'expense',
      account: 'Chase Credit Card'
    },
    {
      id: 5,
      description: 'Rent Payment',
      amount: -1200.00,
      category: 'Housing',
      date: '2024-01-10',
      type: 'expense',
      account: 'Chase Checking'
    }
  ];

  return (
    <div className="transactions-page">
      <header className="page-header">
        <h1 className="page-title">Transactions</h1>
        <p className="page-subtitle">View and manage all your financial transactions.</p>
      </header>

      <section className="card transactions-page__filters">
        <div className="card__body">
          <div className="transactions-page__filters-row">
            <div className="transactions-page__search">
              <div className="form-input-wrap">
                <Search size={20} className="form-input-wrap__icon" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="form-input form-input--with-icon"
                />
              </div>
            </div>
            <div className="transactions-page__filter-actions">
              <button className="button button--secondary">
                <Filter size={16} />
                Filter
              </button>
              <button className="button button--secondary">
                <Download size={16} />
                Export
              </button>
              <button className="button button--primary">
                <Plus size={16} />
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="card">
        <div className="card__header">
          <h3 className="card__title">All Transactions</h3>
          <p className="card__subtitle">{transactions.length} transactions found</p>
        </div>
        <div className="transactions-page__table-wrap">
            <table className="transactions-page__table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Account</th>
                  <th>Date</th>
                  <th className="transactions-page__amount-header">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="transactions-page__description">{transaction.description}</td>
                    <td>
                      <span className="transactions-page__badge">{transaction.category}</span>
                    </td>
                    <td className="transactions-page__muted">{transaction.account}</td>
                    <td className="transactions-page__muted">{transaction.date}</td>
                    <td className={`transactions-page__amount ${transaction.type === 'income' ? 'transactions-page__amount--income' : ''}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
