import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { NavTabs } from '@/components/layout/NavTabs';
import { DashboardPage } from './DashboardPage';
import { ResearchPage } from './ResearchPage';
import { ScreenerPage } from './ScreenerPage';
import { HoldingsPage } from './HoldingsPage';
import { RiskPage } from './RiskPage';
import { AllocatorPage } from './AllocatorPage';
import { ResearchDeskPage } from './ResearchDeskPage';
import { DB } from '@/data/stocks';

const Index = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dash');

  const handleOpenStock = (sym: string) => {
    if (sym) setActiveTab('analyse');
  };

  const handleScreenerSelect = (sym: string) => {
    setActiveTab('analyse');
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundImage: 'radial-gradient(hsl(var(--brand)/0.035) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      <Header onSignOut={signOut} userName={userName} />
      <NavTabs active={activeTab} onChange={setActiveTab} />
      <div className="flex-1 overflow-hidden flex">
        {activeTab === 'dash' && <DashboardPage onOpenStock={handleOpenStock} />}
        {activeTab === 'analyse' && <ResearchPage />}
        {activeTab === 'screener' && <ScreenerPage onSelectStock={handleScreenerSelect} />}
        {activeTab === 'portfolio' && <HoldingsPage />}
        {activeTab === 'risk' && <RiskPage />}
        {activeTab === 'allocator' && <AllocatorPage />}
        {activeTab === 'advisor' && <ResearchDeskPage />}
      </div>
    </div>
  );
};

export default Index;
