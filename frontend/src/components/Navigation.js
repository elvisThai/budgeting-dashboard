import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LogIn, UserPlus, LogOut } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    //highlight current page in nav
    return location.pathname === path;
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <Wallet size={24} />
          BudgetTracker
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/transactions" 
              className={`nav-link ${isActive('/transactions') ? 'nav-link--active' : ''}`}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link 
              to="/analytics" 
              className={`nav-link ${isActive('/analytics') ? 'nav-link--active' : ''}`}
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link 
              to="/connect-bank" 
              className={`nav-link ${isActive('/connect-bank') ? 'nav-link--active' : ''}`}
            >
              Connect Bank
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">{user.email}</span>
              <button type="button" className="button button--ghost button--small" onClick={onLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button button--ghost button--small">
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/register" className="button button--primary button--small">
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
