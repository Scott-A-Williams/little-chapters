import React from 'react';
import { Header } from './Header';
import { BottomNav, NavTab } from './BottomNav';
import { QuickLogModal } from '../moment/QuickLogModal';

interface AppShellProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--lc-background)',
      }}
    >
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto',
          padding: '16px 16px calc(var(--sab) + 84px) 16px',
        }}
      >
        {children}
      </main>

      {/* Global Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* 1-Tap Quick Log Modal */}
      <QuickLogModal />
    </div>
  );
};
