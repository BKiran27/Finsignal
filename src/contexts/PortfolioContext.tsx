import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Holding {
  sym: string;
  qty: number;
  avg: number;
  sec: string;
}

interface PortfolioContextType {
  portfolio: Holding[];
  addPosition: (h: Holding) => void;
  removePosition: (index: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Holding[]>(() => {
    try { return JSON.parse(localStorage.getItem('fs_p') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('fs_p', JSON.stringify(portfolio));
  }, [portfolio]);

  const addPosition = (h: Holding) => setPortfolio(prev => [...prev, h]);
  const removePosition = (i: number) => setPortfolio(prev => prev.filter((_, idx) => idx !== i));

  return (
    <PortfolioContext.Provider value={{ portfolio, addPosition, removePosition }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
