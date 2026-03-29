import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <div className={`stat-change ${stat.changeType}`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.title}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Overview */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Spending Overview</h3>
              <p className="card-subtitle">Your spending trends this month</p>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <TrendingUp size={48} />
                  </div>
                  <p className="text-gray-500">Chart will be displayed here</p>
                  <p className="text-sm text-gray-400">Interactive spending trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Transactions</h3>
              <p className="card-subtitle">Latest activity</p>
            </div>
            <div className="card-body p-0">
              <div className="space-y-0">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.category} • {transaction.date}
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'income' ? 'text-success-600' : 'text-gray-900'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-ghost w-full">
                View All Transactions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
            <p className="card-subtitle">Common tasks and shortcuts</p>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn btn-primary">
                <CreditCard size={16} />
                Add Transaction
              </button>
              <button className="btn btn-secondary">
                <TrendingUp size={16} />
                View Analytics
              </button>
              <button className="btn btn-secondary">
                <DollarSign size={16} />
                Set Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
