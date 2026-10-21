import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChildProvider } from './context/ChildContext';
import { MomentProvider } from './context/MomentContext';
import { AppShell } from './components/layout/AppShell';
import { NavTab } from './components/layout/BottomNav';
import { DashboardView } from './views/DashboardView';
import { JourneyView } from './views/JourneyView';
import { TimelineView } from './views/TimelineView';
import { SettingsView } from './views/SettingsView';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

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
