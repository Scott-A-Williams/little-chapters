import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../types/theme';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ModeToggle: React.FC = () => {
  const { mode, setMode } = useTheme();

  const options: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light', icon: <Sun size={16} /> },
    { id: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { id: 'system', label: 'System', icon: <Monitor size={16} /> },
  ];

  return (
    <div>
      <div
        style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--lc-text-secondary)',
          marginBottom: '8px',
        }}
      >
        Appearance Mode
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          backgroundColor: 'var(--lc-surface-muted)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
        }}
      >
        {options.map((opt) => {
          const isSelected = mode === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSelected ? 'var(--lc-surface)' : 'transparent',
                color: isSelected ? 'var(--lc-text-primary)' : 'var(--lc-text-secondary)',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.85rem',
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.16s ease',
              }}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
