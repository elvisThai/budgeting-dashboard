import React from 'react';
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const categories = [
    { name: 'Food & Dining', amount: 450.00, percentage: 30, color: 'analytics-page__dot--blue' },
    { name: 'Transportation', amount: 280.00, percentage: 19, color: 'analytics-page__dot--green' },
    { name: 'Housing', amount: 1200.00, percentage: 38, color: 'analytics-page__dot--purple' },
    { name: 'Entertainment', amount: 150.00, percentage: 10, color: 'analytics-page__dot--yellow' },
    { name: 'Other', amount: 70.00, percentage: 3, color: 'analytics-page__dot--gray' }
  ];

  return (
    <div className="analytics-page">
      <header className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Detailed insights into your spending patterns and trends.</p>
      </header>

      <section className="card analytics-page__period">
        <div className="card__body analytics-page__period-body">
          <h3 className="card__title">Time Period</h3>
          <div className="analytics-page__period-actions">
            <button className="button button--secondary button--small">Week</button>
            <button className="button button--primary button--small">Month</button>
            <button className="button button--secondary button--small">Quarter</button>
            <button className="button button--secondary button--small">Year</button>
          </div>
        </div>
      </section>

      <section className="analytics-page__top-grid">
        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Spending by Category</h3>
            <p className="card__subtitle">This month's breakdown</p>
          </div>
          <div className="card__body">
            <div className="analytics-page__category-list">
              {categories.map((category, index) => (
                <div key={index} className="analytics-page__category-row">
                  <div className="analytics-page__category-name">
                    <div className={`analytics-page__dot ${category.color}`}></div>
                    <span>{category.name}</span>
                  </div>
                  <div className="analytics-page__category-values">
                    <div className="analytics-page__category-amount">${category.amount.toFixed(2)}</div>
                    <div className="analytics-page__category-percent">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Monthly Trend</h3>
            <p className="card__subtitle">Spending over time</p>
          </div>
          <div className="card__body">
            <div className="analytics-page__trend-placeholder">
              <div className="analytics-page__trend-copy">
                <TrendingUp size={48} />
                <p>Chart will be displayed here</p>
                <span>Monthly spending trends</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="analytics-page__bottom-grid">
        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Top Categories</h3>
            <p className="card__subtitle">Highest spending areas</p>
          </div>
          <div className="card__body">
            <div className="analytics-page__top-categories">
              {categories.slice(0, 3).map((category, index) => (
                <div key={index} className="analytics-page__top-category">
                  <div className="analytics-page__top-category-name">
                    <div className="analytics-page__rank">{index + 1}</div>
                    <span>{category.name}</span>
                  </div>
                  <div className="analytics-page__top-category-amount">
                    ${category.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Insights</h3>
            <p className="card__subtitle">Key findings</p>
          </div>
          <div className="card__body">
            <div className="analytics-page__insights">
              <div className="analytics-page__insight analytics-page__insight--success">
                <div className="analytics-page__insight-title">
                  <TrendingUp size={16} />
                  <span>Good Progress</span>
                </div>
                <p>You're spending 15% less than last month</p>
              </div>
              <div className="analytics-page__insight analytics-page__insight--warning">
                <div className="analytics-page__insight-title">
                  <PieChart size={16} />
                  <span>High Spending</span>
                </div>
                <p>Food & Dining is 30% of your budget</p>
              </div>
              <div className="analytics-page__insight analytics-page__insight--primary">
                <div className="analytics-page__insight-title">
                  <BarChart3 size={16} />
                  <span>Trending Up</span>
                </div>
                <p>Transportation costs increased 8%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Budget vs Actual</h3>
            <p className="card__subtitle">This month's performance</p>
          </div>
          <div className="card__body">
            <div className="analytics-page__budget-list">
              <div className="analytics-page__budget-row">
                <span>Food & Dining</span>
                <div className="analytics-page__budget-progress">
                  <div className="analytics-page__budget-track">
                    <div className="analytics-page__budget-fill analytics-page__budget-fill--success" style={{width: '75%'}}></div>
                  </div>
                  <span>75%</span>
                </div>
              </div>
              <div className="analytics-page__budget-row">
                <span>Transportation</span>
                <div className="analytics-page__budget-progress">
                  <div className="analytics-page__budget-track">
                    <div className="analytics-page__budget-fill analytics-page__budget-fill--warning" style={{width: '90%'}}></div>
                  </div>
                  <span>90%</span>
                </div>
              </div>
              <div className="analytics-page__budget-row">
                <span>Entertainment</span>
                <div className="analytics-page__budget-progress">
                  <div className="analytics-page__budget-track">
                    <div className="analytics-page__budget-fill analytics-page__budget-fill--error" style={{width: '110%'}}></div>
                  </div>
                  <span>110%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
