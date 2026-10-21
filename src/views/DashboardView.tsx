import React from 'react';
import { useChild } from '../context/ChildContext';
import { TodaySummary } from '../components/dashboard/TodaySummary';
import { MemoryPromptCard } from '../components/dashboard/MemoryPromptCard';
import { QuickActionGrid } from '../components/dashboard/QuickActionGrid';
import { RecentMomentsList } from '../components/dashboard/RecentMomentsList';

export const DashboardView: React.FC = () => {
  const { activeChild } = useChild();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="animate-fade-in">
      {/* Editorial Welcome Header */}
      <div style={{ marginBottom: '18px' }}>
        <span
          style={{
            fontSize: '0.84rem',
            fontWeight: 500,
            color: 'var(--accent)',
            letterSpacing: '0.01em',
          }}
        >
          {getGreeting()}
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.28,
            letterSpacing: '-0.015em',
            marginTop: '2px',
          }}
        >
          {activeChild ? `${activeChild.name}'s Little Chapter` : 'Family Journal'}
        </h1>
      </div>

      {/* Today's Rhythm Summary */}
      <TodaySummary />

      {/* Memory Prompt Inspiration */}
      <MemoryPromptCard />

      {/* 1-Tap Quick Action Grid */}
      <QuickActionGrid />

      {/* Recent Moments */}
      <RecentMomentsList />
    </div>
  );
};
