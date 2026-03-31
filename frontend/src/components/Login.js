import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import { loginUser } from '../services/authApi';

const Login = ({ onAuthSuccess, isLoggedIn }) => {
  //store login form values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //clear old error when user edits fields
    setError('');
  }, [formData.email, formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //start login request
    setIsSubmitting(true);
    setError('');

    try {
      const data = await loginUser(formData);
      //save user in app state and go home
      onAuthSuccess(data);
      navigate('/');
    } catch (requestError) {
      //show backend login error
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn) {
    //skip login page if already signed in
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-head">
          <div className="auth-icon">
            <Lock size={24} />
          </div>
          <h2 className="auth-title">
            Sign in to your account
          </h2>
          <p className="auth-subtitle">
            Or{' '}
            <Link to="/register" className="auth-link">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__fields">
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="form-input-wrap">
                <Mail className="form-input-wrap__icon" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input form-input--with-icon"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-field">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="form-input-wrap">
                <Lock className="form-input-wrap__icon" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="form-input form-input--with-icon form-input--with-action"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="form-input-wrap__action"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <div className="auth-form__options">
            <label className="checkbox-field">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox-field__input"
              />
              <span className="checkbox-field__label">
                Remember me
              </span>
            </label>

            <div>
              <button type="button" className="button-link">
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="auth-form__submit">
            <button
              type="submit"
              className="button button--primary button--large button--full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="auth-foot">
            <p className="auth-text">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
