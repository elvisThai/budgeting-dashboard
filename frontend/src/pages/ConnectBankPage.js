import React from 'react';
import { Link as LinkIcon, Shield, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect Your Bank</h1>
        <p className="text-gray-600">Securely connect your bank accounts to automatically track transactions.</p>
      </div>

      {/* Security Notice */}
      <div className="card mb-8 bg-primary-50 border-primary-200">
        <div className="card-body">
          <div className="flex items-start gap-3">
            <Shield size={24} className="text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Bank-Level Security</h3>
              <p className="text-primary-700 text-sm">
                Your financial data is protected with 256-bit encryption and we never store your banking credentials. 
                We use Plaid, the same technology trusted by major financial institutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connected Accounts */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Connected Accounts</h3>
              <p className="card-subtitle">{connectedBanks.length} accounts connected</p>
            </div>
            <div className="card-body">
              {connectedBanks.length > 0 ? (
                <div className="space-y-4">
                  {connectedBanks.map((bank, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <CreditCard size={20} className="text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{bank.name}</div>
                          <div className="text-sm text-gray-500">
                            {bank.accountType} •••• {bank.last4}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{bank.balance}</div>
                        <div className="flex items-center gap-1 text-sm text-success-600">
                          <CheckCircle size={14} />
                          {bank.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <CreditCard size={48} />
                  </div>
                  <div className="empty-state-title">No accounts connected</div>
                  <div className="empty-state-description">
                    Connect your first bank account to get started
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Connect New Account */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Connect New Account</h3>
              <p className="card-subtitle">Add another bank account</p>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary-400 transition-colors cursor-pointer">
                  <LinkIcon size={32} className="mx-auto text-gray-400 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Connect with Plaid</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Securely connect your bank account in seconds
                  </p>
                  <button className="btn btn-primary">
                    Connect Account
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  or
                </div>

                <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-gray-300 transition-colors cursor-pointer">
                  <CreditCard size={24} className="mx-auto text-gray-400 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">Manual Entry</h4>
                  <p className="text-sm text-gray-500">
                    Add transactions manually
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="card mt-6">
            <div className="card-header">
              <h3 className="card-title">Why Connect Your Bank?</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-success-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Automatic Transaction Import</div>
                    <div className="text-sm text-gray-500">No more manual entry of transactions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-success-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Real-time Balance Updates</div>
                    <div className="text-sm text-gray-500">Always see your current account balance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-success-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Smart Categorization</div>
                    <div className="text-sm text-gray-500">Transactions are automatically categorized</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-success-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Enhanced Analytics</div>
                    <div className="text-sm text-gray-500">Better insights with complete transaction history</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Frequently Asked Questions</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Is my data secure?</h4>
                <p className="text-sm text-gray-600">
                  Yes, we use bank-level security with 256-bit encryption. We never store your banking credentials 
                  and use Plaid, which is trusted by major financial institutions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Which banks are supported?</h4>
                <p className="text-sm text-gray-600">
                  We support over 11,000 financial institutions in the US, including all major banks like Chase, 
                  Bank of America, Wells Fargo, and many credit unions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Can I disconnect my account?</h4>
                <p className="text-sm text-gray-600">
                  Yes, you can disconnect your account at any time from the settings page. This will stop 
                  automatic transaction imports but won't delete your existing data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectBankPage;
