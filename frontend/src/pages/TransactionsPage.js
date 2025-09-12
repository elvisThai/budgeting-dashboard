import React from 'react';
import { Search, Filter, Plus, Download } from 'lucide-react';

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Transactions</h1>
        <p className="text-gray-600">View and manage all your financial transactions.</p>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="form-input pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary">
                <Filter size={16} />
                Filter
              </button>
              <button className="btn btn-secondary">
                <Download size={16} />
                Export
              </button>
              <button className="btn btn-primary">
                <Plus size={16} />
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Transactions</h3>
          <p className="card-subtitle">{transactions.length} transactions found</p>
        </div>
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.account}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`font-semibold ${
                        transaction.type === 'income' ? 'text-success-600' : 'text-gray-900'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
