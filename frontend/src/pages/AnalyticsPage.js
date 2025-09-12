import React from 'react';
import { TrendingUp, PieChart, BarChart3, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  const categories = [
    { name: 'Food & Dining', amount: 450.00, percentage: 30, color: 'bg-blue-500' },
    { name: 'Transportation', amount: 280.00, percentage: 19, color: 'bg-green-500' },
    { name: 'Housing', amount: 1200.00, percentage: 38, color: 'bg-purple-500' },
    { name: 'Entertainment', amount: 150.00, percentage: 10, color: 'bg-yellow-500' },
    { name: 'Other', amount: 70.00, percentage: 3, color: 'bg-gray-500' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-600">Detailed insights into your spending patterns and trends.</p>
      </div>

      {/* Time Period Selector */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title">Time Period</h3>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Week</button>
              <button className="btn btn-primary btn-sm">Month</button>
              <button className="btn btn-secondary btn-sm">Quarter</button>
              <button className="btn btn-secondary btn-sm">Year</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Spending by Category */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Spending by Category</h3>
            <p className="card-subtitle">This month's breakdown</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${category.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Trend</h3>
            <p className="card-subtitle">Spending over time</p>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <TrendingUp size={48} />
                </div>
                <p className="text-gray-500">Chart will be displayed here</p>
                <p className="text-sm text-gray-400">Monthly spending trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Categories */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top Categories</h3>
            <p className="card-subtitle">Highest spending areas</p>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {categories.slice(0, 3).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-600">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${category.amount.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending Insights */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Insights</h3>
            <p className="card-subtitle">Key findings</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="p-3 bg-success-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-success-600" />
                  <span className="text-sm font-medium text-success-800">Good Progress</span>
                </div>
                <p className="text-sm text-success-700">You're spending 15% less than last month</p>
              </div>
              <div className="p-3 bg-warning-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <PieChart size={16} className="text-warning-600" />
                  <span className="text-sm font-medium text-warning-800">High Spending</span>
                </div>
                <p className="text-sm text-warning-700">Food & Dining is 30% of your budget</p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-800">Trending Up</span>
                </div>
                <p className="text-sm text-primary-700">Transportation costs increased 8%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget vs Actual */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Budget vs Actual</h3>
            <p className="card-subtitle">This month's performance</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Food & Dining</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-success-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Transportation</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-warning-500 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">90%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Entertainment</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-error-500 h-2 rounded-full" style={{width: '110%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">110%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
