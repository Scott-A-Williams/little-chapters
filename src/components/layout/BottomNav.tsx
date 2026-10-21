import React from 'react';
import { Home, Compass, Clock, Settings, Plus } from 'lucide-react';
import { useMoments } from '../../context/MomentContext';

export type NavTab = 'dashboard' | 'journey' | 'timeline' | 'settings';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { openQuickLog } = useMoments();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        backgroundColor: 'var(--lc-surface)',
        borderTop: '1px solid var(--lc-border-subtle)',
        boxShadow: 'var(--shadow-bottom-nav)',
        paddingBottom: 'calc(var(--sab) + 4px)',
        paddingTop: '6px',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          maxWidth: '560px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Home */}
        <button
          onClick={() => onTabChange('dashboard')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 0',
            color: activeTab === 'dashboard' ? 'var(--lc-primary)' : 'var(--lc-text-muted)',
            fontWeight: activeTab === 'dashboard' ? 700 : 500,
            fontSize: '0.72rem',
            gap: '3px',
            minHeight: '48px',
          }}
        >
          <Home size={21} strokeWidth={activeTab === 'dashboard' ? 2.4 : 1.8} />
          <span>Home</span>
        </button>

        {/* Journey */}
        <button
          onClick={() => onTabChange('journey')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 0',
            color: activeTab === 'journey' ? 'var(--lc-primary)' : 'var(--lc-text-muted)',
            fontWeight: activeTab === 'journey' ? 700 : 500,
            fontSize: '0.72rem',
            gap: '3px',
            minHeight: '48px',
          }}
        >
          <Compass size={21} strokeWidth={activeTab === 'journey' ? 2.4 : 1.8} />
          <span>Journey</span>
        </button>

        {/* Central Prominent Quick Log (+) Button */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            marginTop: '-16px',
          }}
        >
          <button
            onClick={() => openQuickLog()}
            aria-label="Quick Log Moment"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--lc-secondary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(0, 155, 193, 0.38)',
              border: '3px solid var(--lc-surface)',
              transition: 'transform 0.16s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
            onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Plus size={28} strokeWidth={2.8} />
          </button>
        </div>

        {/* Timeline */}
        <button
          onClick={() => onTabChange('timeline')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 0',
            color: activeTab === 'timeline' ? 'var(--lc-primary)' : 'var(--lc-text-muted)',
            fontWeight: activeTab === 'timeline' ? 700 : 500,
            fontSize: '0.72rem',
            gap: '3px',
            minHeight: '48px',
          }}
        >
          <Clock size={21} strokeWidth={activeTab === 'timeline' ? 2.4 : 1.8} />
          <span>Timeline</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => onTabChange('settings')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 0',
            color: activeTab === 'settings' ? 'var(--lc-primary)' : 'var(--lc-text-muted)',
            fontWeight: activeTab === 'settings' ? 700 : 500,
            fontSize: '0.72rem',
            gap: '3px',
            minHeight: '48px',
          }}
        >
          <Settings size={21} strokeWidth={activeTab === 'settings' ? 2.4 : 1.8} />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
};
