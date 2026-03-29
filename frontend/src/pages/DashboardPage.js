import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './DashboardPage.css';

const DashboardPage = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Balance',
      value: '$12,345.67',
      change: '+2.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Monthly Income',
      value: '$4,200.00',
      change: '+5.2%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Monthly Expenses',
      value: '$3,150.00',
      change: '-1.8%',
      changeType: 'negative',
      icon: TrendingDown
    },
    {
      title: 'Savings Rate',
      value: '25%',
      change: '+3.1%',
      changeType: 'positive',
      icon: CreditCard
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      description: 'Grocery Store',
      amount: -85.50,
      category: 'Food & Dining',
      date: '2024-01-15',
      type: 'expense'
    },
    {
      id: 2,
      description: 'Salary Deposit',
      amount: 4200.00,
      category: 'Income',
      date: '2024-01-14',
      type: 'income'
    },
    {
      id: 3,
      description: 'Gas Station',
      amount: -45.20,
      category: 'Transportation',
      date: '2024-01-13',
      type: 'expense'
    },
    {
      id: 4,
      description: 'Coffee Shop',
      amount: -12.75,
      category: 'Food & Dining',
      date: '2024-01-12',
      type: 'expense'
    }
  ];

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's your financial overview.</p>
      </header>

      <section className="dashboard-page__stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <article key={index} className="dashboard-stat">
              <div className="dashboard-stat__top">
                <div className="dashboard-stat__icon">
                  <Icon size={20} />
                </div>
                <div className={`dashboard-stat__change dashboard-stat__change--${stat.changeType}`}>
                  {stat.changeType === 'positive' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="dashboard-stat__value">{stat.value}</div>
              <div className="dashboard-stat__label">{stat.title}</div>
            </article>
          );
        })}
      </section>

      <section className="dashboard-page__main">
        <div className="card dashboard-page__overview">
          <div className="card__header">
            <h3 className="card__title">Spending Overview</h3>
            <p className="card__subtitle">Your spending trends this month</p>
          </div>
          <div className="card__body">
            <div className="dashboard-page__chart-placeholder">
              <div className="dashboard-page__chart-content">
                <TrendingUp size={48} />
                <p>Chart will be displayed here</p>
                <span>Interactive spending trends</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Recent Transactions</h3>
            <p className="card__subtitle">Latest activity</p>
          </div>
          <div className="card__body dashboard-page__transactions-body">
            <div className="dashboard-page__transactions-list">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="dashboard-page__transaction">
                  <div className="dashboard-page__transaction-copy">
                    <div className="dashboard-page__transaction-title">{transaction.description}</div>
                    <div className="dashboard-page__transaction-meta">
                      {transaction.category} • {transaction.date}
                    </div>
                  </div>
                  <div className={`dashboard-page__transaction-amount ${transaction.type === 'income' ? 'dashboard-page__transaction-amount--income' : ''}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card__footer">
            <button className="button button--ghost button--full">View All Transactions</button>
          </div>
        </div>
      </section>

      <section className="dashboard-page__actions card">
        <div className="card__header">
          <h3 className="card__title">Quick Actions</h3>
          <p className="card__subtitle">Common tasks and shortcuts</p>
        </div>
        <div className="card__body">
          <div className="dashboard-page__action-grid">
            <button className="button button--primary">
              <CreditCard size={16} />
              Add Transaction
            </button>
            <button className="button button--secondary">
              <TrendingUp size={16} />
              View Analytics
            </button>
            <button className="button button--secondary">
              <DollarSign size={16} />
              Set Budget
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
