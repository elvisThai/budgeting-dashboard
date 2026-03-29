import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LogIn, UserPlus } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__brand">
          <Wallet size={24} />
          BudgetTracker
        </Link>
        
        <ul className="navigation__links">
          <li className="navigation__item">
            <Link 
              to="/" 
              className={`navigation__link ${isActive('/') ? 'navigation__link--active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="navigation__item">
            <Link 
              to="/transactions" 
              className={`navigation__link ${isActive('/transactions') ? 'navigation__link--active' : ''}`}
            >
              Transactions
            </Link>
          </li>
          <li className="navigation__item">
            <Link 
              to="/analytics" 
              className={`navigation__link ${isActive('/analytics') ? 'navigation__link--active' : ''}`}
            >
              Analytics
            </Link>
          </li>
          <li className="navigation__item">
            <Link 
              to="/connect-bank" 
              className={`navigation__link ${isActive('/connect-bank') ? 'navigation__link--active' : ''}`}
            >
              Connect Bank
            </Link>
          </li>
        </ul>

        <div className="navigation__actions">
          <Link to="/login" className="button button--ghost button--small">
            <LogIn size={16} />
            Login
          </Link>
          <Link to="/register" className="button button--primary button--small">
            <UserPlus size={16} />
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
