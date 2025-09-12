import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, BarChart3, CreditCard, Link as LinkIcon, LogIn, UserPlus } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <Wallet size={24} />
          BudgetTracker
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/transactions" 
              className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link 
              to="/analytics" 
              className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link 
              to="/connect-bank" 
              className={`nav-link ${isActive('/connect-bank') ? 'active' : ''}`}
            >
              Connect Bank
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-ghost btn-sm">
            <LogIn size={16} />
            Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            <UserPlus size={16} />
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
