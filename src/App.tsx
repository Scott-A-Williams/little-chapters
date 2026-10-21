import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChildProvider, useChild } from './context/ChildContext';
import { MomentProvider } from './context/MomentContext';
import { AppShell } from './components/layout/AppShell';
import { NavTab } from './components/layout/BottomNav';
import { DashboardView } from './views/DashboardView';
import { JourneyView } from './views/JourneyView';
import { TimelineView } from './views/TimelineView';
import { SettingsView } from './views/SettingsView';
import { ChildSetup } from './components/onboarding/ChildSetup';

const AppContent: React.FC = () => {
  const { children, loading } = useChild();

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Wait for the child data to load before deciding
  // whether to show onboarding or the main application.
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--lc-background)',
          color: 'var(--lc-text-muted)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Loading…
      </div>
    );
  }

  // New user: no children exist yet.
  // Show the child setup screen instead of the dashboard.
  if (children.length === 0) {
    return <ChildSetup />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;

      case 'journey':
        return <JourneyView />;

      case 'timeline':
        return <TimelineView />;

      case 'settings':
        return <SettingsView />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveView()}
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ChildProvider>
        <MomentProvider>
          <AppContent />
        </MomentProvider>
      </ChildProvider>
    </ThemeProvider>
  );
};

export default App;
