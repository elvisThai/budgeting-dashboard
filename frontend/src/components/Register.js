import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ];

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__icon">
            <User size={24} />
          </div>
          <h2 className="auth-card__title">
            Create your account
          </h2>
          <p className="auth-card__subtitle">
            Or{' '}
            <Link to="/login" className="auth-card__link">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__fields">
            <div className="auth-form__row">
              <div className="form-field">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <div className="form-input-wrap">
                  <User className="form-input-wrap__icon" size={20} />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="form-input form-input--with-icon"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="form-input"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
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
                  autoComplete="new-password"
                  required
                  className="form-input form-input--with-icon form-input--with-action"
                  placeholder="Create a password"
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
              
              {formData.password && (
                <div className="password-checklist">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="password-checklist__item">
                      <Check 
                        size={14} 
                        className={req.met ? 'password-checklist__icon password-checklist__icon--met' : 'password-checklist__icon'} 
                      />
                      <span className={req.met ? 'password-checklist__text password-checklist__text--met' : 'password-checklist__text'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-field">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <div className="form-input-wrap">
                <Lock className="form-input-wrap__icon" size={20} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="form-input form-input--with-icon form-input--with-action"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="form-input-wrap__action"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="form-error">Passwords do not match</p>
              )}
            </div>
          </div>

          <label className="checkbox-field">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="checkbox-field__input"
            />
            <span className="checkbox-field__label">
              I agree to the{' '}
              <button type="button" className="button-link">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="button-link">
                Privacy Policy
              </button>
            </span>
          </label>

          <div className="auth-form__submit">
            <button
              type="submit"
              className="button button--primary button--large button--full"
              disabled={!agreedToTerms || formData.password !== formData.confirmPassword}
            >
              Create account
            </button>
          </div>

          <div className="auth-card__footer">
            <p className="auth-card__footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-card__link">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
