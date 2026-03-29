import React from 'react';
import { Link as LinkIcon, Shield, CreditCard, CheckCircle } from 'lucide-react';
import './ConnectBankPage.css';

const ConnectBankPage = () => {
  const connectedBanks = [
    {
      name: 'Chase Bank',
      accountType: 'Checking',
      last4: '1234',
      balance: '$12,345.67',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      name: 'Chase Bank',
      accountType: 'Credit Card',
      last4: '5678',
      balance: '-$2,150.00',
      status: 'connected',
      lastSync: '2 minutes ago'
    }
  ];

  return (
    <div className="connect-bank-page">
      <header className="page-header">
        <h1 className="page-title">Connect Your Bank</h1>
        <p className="page-subtitle">Securely connect your bank accounts to automatically track transactions.</p>
      </header>

      <section className="card connect-bank-page__security">
        <div className="card__body connect-bank-page__security-body">
          <Shield size={24} className="connect-bank-page__security-icon" />
          <div>
            <h3 className="connect-bank-page__security-title">Bank-Level Security</h3>
            <p className="connect-bank-page__security-text">
              Your financial data is protected with 256-bit encryption and we never store your banking credentials.
              We use Plaid, the same technology trusted by major financial institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="connect-bank-page__grid">
        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Connected Accounts</h3>
            <p className="card__subtitle">{connectedBanks.length} accounts connected</p>
          </div>
          <div className="card__body">
            {connectedBanks.length > 0 ? (
              <div className="connect-bank-page__accounts">
                {connectedBanks.map((bank, index) => (
                  <div key={index} className="connect-bank-page__account">
                    <div className="connect-bank-page__account-main">
                      <div className="connect-bank-page__account-icon">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <div className="connect-bank-page__account-name">{bank.name}</div>
                        <div className="connect-bank-page__account-meta">
                          {bank.accountType} •••• {bank.last4}
                        </div>
                      </div>
                    </div>
                    <div className="connect-bank-page__account-side">
                      <div className="connect-bank-page__account-balance">{bank.balance}</div>
                      <div className="connect-bank-page__status">
                        <CheckCircle size={14} />
                        {bank.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state__icon">
                  <CreditCard size={48} />
                </div>
                <div className="empty-state__title">No accounts connected</div>
                <div className="empty-state__description">Connect your first bank account to get started</div>
              </div>
            )}
          </div>
        </div>

        <div className="connect-bank-page__stack">
          <div className="card">
            <div className="card__header">
              <h3 className="card__title">Connect New Account</h3>
              <p className="card__subtitle">Add another bank account</p>
            </div>
            <div className="card__body">
              <div className="connect-bank-page__options">
                <div className="connect-bank-page__option connect-bank-page__option--primary">
                  <LinkIcon size={32} className="connect-bank-page__option-icon" />
                  <h4>Connect with Plaid</h4>
                  <p>Securely connect your bank account in seconds</p>
                  <button className="button button--primary">Connect Account</button>
                </div>

                <div className="connect-bank-page__divider">or</div>

                <div className="connect-bank-page__option">
                  <CreditCard size={24} className="connect-bank-page__option-icon" />
                  <h4>Manual Entry</h4>
                  <p>Add transactions manually</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <h3 className="card__title">Why Connect Your Bank?</h3>
            </div>
            <div className="card__body">
              <div className="connect-bank-page__benefits">
                <div className="connect-bank-page__benefit">
                  <CheckCircle size={16} />
                  <div>
                    <div className="connect-bank-page__benefit-title">Automatic Transaction Import</div>
                    <div className="connect-bank-page__benefit-text">No more manual entry of transactions</div>
                  </div>
                </div>
                <div className="connect-bank-page__benefit">
                  <CheckCircle size={16} />
                  <div>
                    <div className="connect-bank-page__benefit-title">Real-time Balance Updates</div>
                    <div className="connect-bank-page__benefit-text">Always see your current account balance</div>
                  </div>
                </div>
                <div className="connect-bank-page__benefit">
                  <CheckCircle size={16} />
                  <div>
                    <div className="connect-bank-page__benefit-title">Smart Categorization</div>
                    <div className="connect-bank-page__benefit-text">Transactions are automatically categorized</div>
                  </div>
                </div>
                <div className="connect-bank-page__benefit">
                  <CheckCircle size={16} />
                  <div>
                    <div className="connect-bank-page__benefit-title">Enhanced Analytics</div>
                    <div className="connect-bank-page__benefit-text">Better insights with complete transaction history</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card connect-bank-page__faq">
        <div className="card__header">
          <h3 className="card__title">Frequently Asked Questions</h3>
        </div>
        <div className="card__body">
          <div className="connect-bank-page__faq-list">
            <div>
              <h4>Is my data secure?</h4>
              <p>Yes, we use bank-level security with 256-bit encryption. We never store your banking credentials and use Plaid, which is trusted by major financial institutions.</p>
            </div>
            <div>
              <h4>Which banks are supported?</h4>
              <p>We support over 11,000 financial institutions in the US, including all major banks like Chase, Bank of America, Wells Fargo, and many credit unions.</p>
            </div>
            <div>
              <h4>Can I disconnect my account?</h4>
              <p>Yes, you can disconnect your account at any time from the settings page. This will stop automatic transaction imports but won't delete your existing data.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectBankPage;
