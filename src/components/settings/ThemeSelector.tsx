import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_PALETTES, DEFAULT_THEME } from '../../themes/palettes';
import { ThemeName } from '../../types/theme';
import { ThemeVisualCard } from './ThemeVisualCard';

export const ThemeSelector: React.FC = () => {
  const { themeName, setThemeName, resolvedMode } = useTheme();

  return (
    <div>
      <div
        style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--lc-text-secondary)',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Family Journal Palette</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--lc-text-muted)' }}>
          Tap to switch live
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(Object.keys(THEME_PALETTES) as ThemeName[]).map((key) => {
          const item = THEME_PALETTES[key];
          const isSelected = themeName === key;

          return (
            <ThemeVisualCard
              key={key}
              palette={item}
              isSelected={isSelected}
              onSelect={() => setThemeName(key)}
              isDefault={key === DEFAULT_THEME}
              mode={resolvedMode}
            />
          );
        })}
      </div>
    </div>
  );
};
