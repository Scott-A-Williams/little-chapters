import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_PALETTES, DEFAULT_THEME } from '../../themes/palettes';
import { ThemeName } from '../../types/theme';
import { ThemeVisualCard } from '../settings/ThemeVisualCard';
import { ModeToggle } from '../settings/ModeToggle';
import { Button } from '../common/Button';
import { Sparkles, X, Check } from 'lucide-react';
import { useMoments } from '../../context/MomentContext';

export const ChooseLookModal: React.FC = () => {
  const {
    isLookSetupOpen,
    closeLookSetup,
    completeLookSetup,
    themeName,
    setThemeName,
    resolvedMode,
  } = useTheme();

  const { showFeedback } = useMoments();

  if (!isLookSetupOpen) return null;

  const handleSelect = (key: ThemeName) => {
    setThemeName(key);
  };

  const handleSaveAndContinue = () => {
    completeLookSetup();
    showFeedback(`Personalised look saved: ${THEME_PALETTES[themeName]?.name}`);
  };

  const handleKeepDefault = () => {
    setThemeName(DEFAULT_THEME);
    completeLookSetup();
    showFeedback(`Continuing with ${THEME_PALETTES[DEFAULT_THEME]?.name}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(16, 38, 59, 0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          backgroundColor: 'var(--lc-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 40px rgba(16, 38, 59, 0.16)',
          border: '1px solid var(--lc-border)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10,
        }}
        className="animate-scale-in"
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--lc-border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--lc-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '4px',
              }}
            >
              <Sparkles size={13} color="var(--lc-secondary)" />
              Personalise Your Experience
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--lc-text-primary)',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Choose your look
            </h2>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--lc-text-secondary)',
                marginTop: '4px',
                lineHeight: 1.4,
              }}
            >
              Select a calm palette for your family journal. Preview updates live as you tap.
            </p>
          </div>

          <button
            onClick={closeLookSetup}
            aria-label="Close"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--lc-surface-muted)',
              color: 'var(--lc-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {/* Appearance Mode Preview Switcher */}
          <div>
            <ModeToggle />
          </div>

          {/* Theme Visual Preview Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--lc-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Colour Palette</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--lc-text-muted)' }}>
                Tap card to preview live
              </span>
            </div>

            {(Object.keys(THEME_PALETTES) as ThemeName[]).map((key) => {
              const pal = THEME_PALETTES[key];
              const isSelected = themeName === key;

              return (
                <ThemeVisualCard
                  key={key}
                  palette={pal}
                  isSelected={isSelected}
                  onSelect={() => handleSelect(key)}
                  isDefault={key === DEFAULT_THEME}
                  mode={resolvedMode}
                />
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 24px calc(var(--sab) + 16px) 24px',
            borderTop: '1px solid var(--lc-border-subtle)',
            backgroundColor: 'var(--lc-surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={<Check size={18} />}
            onClick={handleSaveAndContinue}
          >
            Save & Continue with {THEME_PALETTES[themeName]?.name.split('—')[0]}
          </Button>

          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={handleKeepDefault}
            style={{ color: 'var(--lc-text-muted)' }}
          >
            Keep Default (Blue — Calm)
          </Button>
        </div>
      </div>
    </div>
  );
};
