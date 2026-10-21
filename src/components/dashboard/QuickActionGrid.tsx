import React from 'react';
import { useMoments } from '../../context/MomentContext';
import { MomentCategory } from '../../types/moment';
import { Milk, Moon, Baby, Award, Camera, Droplets } from 'lucide-react';

export const QuickActionGrid: React.FC = () => {
  const { openQuickLog } = useMoments();

  const actions: {
    category: MomentCategory;
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  }[] = [
    {
      category: 'feeding',
      label: 'Feed',
      icon: <Milk size={20} />,
      color: 'var(--lc-secondary)',
      bg: 'color-mix(in srgb, var(--lc-secondary) 15%, transparent)',
    },
    {
      category: 'sleep',
      label: 'Sleep',
      icon: <Moon size={20} />,
      color: 'var(--lc-primary)',
      bg: 'color-mix(in srgb, var(--lc-primary) 12%, transparent)',
    },
    {
      category: 'nappy_toileting',
      label: 'Nappy',
      icon: <Baby size={20} />,
      color: 'var(--lc-success)',
      bg: 'color-mix(in srgb, var(--lc-success) 14%, transparent)',
    },
    {
      category: 'milestone',
      label: 'Milestone',
      icon: <Award size={20} />,
      color: 'var(--lc-accent)',
      bg: 'color-mix(in srgb, var(--lc-accent) 18%, transparent)',
    },
    {
      category: 'photo',
      label: 'Photo',
      icon: <Camera size={20} />,
      color: 'var(--lc-primary)',
      bg: 'color-mix(in srgb, var(--lc-primary) 12%, transparent)',
    },
    {
      category: 'bath',
      label: 'Bath',
      icon: <Droplets size={20} />,
      color: 'var(--lc-secondary)',
      bg: 'color-mix(in srgb, var(--lc-secondary) 15%, transparent)',
    },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--lc-text-primary)',
          }}
        >
          Quick Log
        </h3>
        <span style={{ fontSize: '0.78rem', color: 'var(--lc-text-muted)' }}>
          One tap to start
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
      >
        {actions.map((act) => (
          <button
            key={act.category}
            onClick={() => openQuickLog(act.category)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 8px',
              backgroundColor: 'var(--lc-surface-card)',
              border: '1px solid var(--lc-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              minHeight: '68px',
              transition: 'transform 0.15s ease, border-color 0.15s ease',
              gap: '6px',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
            onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: act.bg,
                color: act.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {act.icon}
            </div>
            <span
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--lc-text-primary)',
              }}
            >
              {act.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
