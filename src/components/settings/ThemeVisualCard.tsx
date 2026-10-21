import React from 'react';
import { PaletteDefinition } from '../../types/theme';
import { Check, Sparkles, Heart } from 'lucide-react';

interface ThemeVisualCardProps {
  palette: PaletteDefinition;
  isSelected: boolean;
  onSelect: () => void;
  isDefault?: boolean;
  mode: 'light' | 'dark';
}

export const ThemeVisualCard: React.FC<ThemeVisualCardProps> = ({
  palette,
  isSelected,
  onSelect,
  isDefault = false,
  mode,
}) => {
  const c = mode === 'dark' ? palette.dark : palette.light;

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        borderRadius: 'var(--radius-xl)',
        border: isSelected
          ? `2.5px solid var(--lc-primary)`
          : '1.5px solid var(--lc-border)',
        backgroundColor: 'var(--lc-surface-card)',
        padding: '16px',
        cursor: 'pointer',
        boxShadow: isSelected
          ? '0 6px 20px rgba(16, 38, 59, 0.12), 0 0 0 3px var(--lc-ring)'
          : 'var(--shadow-sm)',
        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        textAlign: 'left',
      }}
      className="lc-theme-card"
    >
      {/* Top Title Bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--lc-text-primary)',
              }}
            >
              {palette.name}
            </span>
            {isDefault && (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--lc-surface-muted)',
                  color: 'var(--lc-text-secondary)',
                  border: '1px solid var(--lc-border)',
                }}
              >
                Default
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--lc-text-secondary)',
              marginTop: '1px',
            }}
          >
            {palette.subtitle}
          </div>
        </div>

        {/* Selected Checkmark Badge */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: isSelected ? 'var(--lc-primary)' : 'var(--lc-surface-muted)',
            color: isSelected ? '#FFFFFF' : 'var(--lc-text-muted)',
            border: isSelected ? 'none' : '1px solid var(--lc-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.18s ease',
            flexShrink: 0,
          }}
        >
          {isSelected && <Check size={16} strokeWidth={3} />}
        </div>
      </div>

      {/* Realistic Mini Interface Mockup */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          backgroundColor: c.background,
          border: `1px solid ${c.border}`,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Mini App Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '6px',
            borderBottom: `1px solid ${c.borderSubtle}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: c.primary,
                color: '#FFFFFF',
                fontSize: '0.62rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              M
            </div>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: c.textPrimary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Maya's Chapter
            </span>
          </div>
          <Sparkles size={11} color={c.secondary} />
        </div>

        {/* Mini Journal Card */}
        <div
          style={{
            backgroundColor: c.surfaceCard,
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${c.border}`,
            padding: '8px 10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: `color-mix(in srgb, ${c.secondary} 15%, ${c.surface})`,
                color: c.secondary,
              }}
            >
              Milestone
            </span>
            <span style={{ fontSize: '0.62rem', color: c.textMuted }}>Today</span>
          </div>

          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: c.textPrimary,
              lineHeight: 1.25,
            }}
          >
            First big smile at Grandma!
          </div>

          <div
            style={{
              fontSize: '0.68rem',
              color: c.textSecondary,
              marginTop: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Lit up with joy during the bedtime song...
          </div>
        </div>

        {/* Mini Action Button & Rhythm Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            paddingTop: '2px',
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: c.primary,
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              padding: '5px 8px',
              fontSize: '0.68rem',
              fontWeight: 600,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <Heart size={9} />
            <span>+ Capture Moment</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: c.primary,
              }}
              title="Primary"
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: c.secondary,
              }}
              title="Secondary Accent"
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: c.accent,
              }}
              title="Highlight Accent"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.8rem',
          color: 'var(--lc-text-secondary)',
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {palette.description}
      </p>
    </div>
  );
};
