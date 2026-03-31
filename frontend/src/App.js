import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ConnectBankPage from './pages/ConnectBankPage';
import Login from './components/Login';
import Register from './components/Register';
import { clearStoredToken, getCurrentUser, getStoredToken } from './services/authApi';

function App() {
  //track saved token and current logged in user
  const [authState, setAuthState] = useState({
    token: getStoredToken(),
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setAuthState({ token: null, user: null, isLoading: false });
      return;
    }

    const loadUser = async () => {
      try {
        //try to restore session after refresh
        const data = await getCurrentUser(token);
        setAuthState({ token, user: data.user, isLoading: false });
      } catch (error) {
        //clear bad token if session no longer works
        clearStoredToken();
        setAuthState({ token: null, user: null, isLoading: false });
      }
    };

    loadUser();
  }, []);

  const handleAuthSuccess = ({ token, user }) => {
    //save auth state after login or register
    setAuthState({ token, user, isLoading: false });
  };

  const handleLogout = () => {
    //clear auth state on logout
    clearStoredToken();
    setAuthState({ token: null, user: null, isLoading: false });
  };

  return (
    <Router>
      <div className="app-shell">
        <Navigation user={authState.user} onLogout={handleLogout} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/connect-bank" element={<ConnectBankPage />} />
            <Route
              path="/login"
              element={<Login onAuthSuccess={handleAuthSuccess} isLoggedIn={Boolean(authState.user)} />}
            />
            <Route
              path="/register"
              element={<Register onAuthSuccess={handleAuthSuccess} isLoggedIn={Boolean(authState.user)} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
