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
        borderRadius: 'var(--radius-lg)',
        border: isSelected
          ? `1.5px solid ${c.accent}`
          : '1px solid var(--border)',
        backgroundColor: isSelected
          ? 'var(--surface-elevated)'
          : 'var(--surface)',
        padding: '16px',
        cursor: 'pointer',
        boxShadow: isSelected
          ? '0 3px 12px rgba(0, 0, 0, 0.22)'
          : 'var(--shadow-sm)',
        transition: 'border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        textAlign: 'left',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.02rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {palette.name}
            </span>
            {isDefault && (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-subtle)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                Default
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginTop: '1px',
            }}
          >
            {palette.subtitle}
          </div>
        </div>

        {/* Selected Checkmark Badge */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: isSelected ? c.accent : 'var(--surface-subtle)',
            color: isSelected ? c.buttonText : 'var(--text-muted)',
            border: isSelected ? 'none' : '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.18s ease',
            flexShrink: 0,
          }}
        >
          {isSelected && <Check size={14} strokeWidth={2.6} />}
        </div>
      </div>

      {/* Realistic Mini Journal Page Mockup */}
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          backgroundColor: c.background,
          border: `1px solid ${c.border}`,
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Mini Journal Header */}
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
                backgroundColor: c.accentSoft,
                color: c.accent,
                fontSize: '0.65rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              M
            </div>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 500,
                color: c.textPrimary,
                fontFamily: 'var(--font-heading)',
              }}
            >
              Maya's Little Chapter
            </span>
          </div>
          <Sparkles size={11} color={c.accent} />
        </div>

        {/* Mini Journal Entry Card */}
        <div
          style={{
            backgroundColor: c.surfaceElevated,
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${c.border}`,
            padding: '8px 10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '3px',
            }}
          >
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 600,
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: c.accentSoft,
                color: c.accent,
              }}
            >
              Milestone
            </span>
            <span style={{ fontSize: '0.62rem', color: c.textMuted }}>Today at 10:15 AM</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: c.textPrimary,
              lineHeight: 1.3,
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
              lineHeight: 1.35,
            }}
          >
            Lit up with joy during her morning lullaby...
          </div>
        </div>

        {/* Action Button & Subtle Swatch */}
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
              backgroundColor: c.button,
              color: c.buttonText,
              borderRadius: 'var(--radius-sm)',
              padding: '5px 10px',
              fontSize: '0.68rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Heart size={9} />
            <span>+ Capture Moment</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '0.62rem', color: c.textMuted }}>Palette:</span>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: c.accent,
              }}
              title="Accent"
            />
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: c.surfaceElevated,
                border: `1px solid ${c.border}`,
              }}
              title="Surface"
            />
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: c.background,
                border: `1px solid ${c.border}`,
              }}
              title="Background"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {palette.description}
      </p>
    </div>
  );
};
