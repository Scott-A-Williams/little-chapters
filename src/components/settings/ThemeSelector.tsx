import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeName } from '../../types/theme';
import { THEME_PALETTES } from '../../themes/palettes';
import { Check } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { themeName, setThemeName } = useTheme();

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
        Family Journal Palette
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {(Object.keys(THEME_PALETTES) as ThemeName[]).map((key) => {
          const item = THEME_PALETTES[key];
          const isSelected = themeName === key;

          return (
            <button
              key={key}
              onClick={() => setThemeName(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-lg)',
                border: isSelected
                  ? '2px solid var(--lc-primary)'
                  : '1px solid var(--lc-border)',
                backgroundColor: isSelected
                  ? 'var(--lc-surface-muted)'
                  : 'var(--lc-surface-card)',
                textAlign: 'left',
                transition: 'all 0.16s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Palette color swatch dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: item.preview.primary,
                      border: '1.5px solid #FFFFFF',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  />
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: item.preview.secondary,
                      border: '1.5px solid #FFFFFF',
                      boxShadow: 'var(--shadow-sm)',
                      marginLeft: '-6px',
                    }}
                  />
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: item.preview.background,
                      border: '1px solid var(--lc-border)',
                      marginLeft: '-6px',
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: 'var(--lc-text-primary)',
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--lc-text-muted)',
                      marginTop: '1px',
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--lc-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
