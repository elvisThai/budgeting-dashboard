import React, { createContext, useContext, useState } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = {
    transactions,
    setTransactions,
    loading,
    setLoading
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
