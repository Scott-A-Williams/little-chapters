import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeName, ThemeMode, ThemeColors } from '../types/theme';
import { THEME_PALETTES, DEFAULT_THEME } from '../themes/palettes';

interface ThemeContextValue {
  themeName: ThemeName;
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  colors: ThemeColors;
  setThemeName: (name: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  availableThemes: typeof THEME_PALETTES;
  // Onboarding "Choose your look" step state
  isLookSetupOpen: boolean;
  hasCompletedLookSetup: boolean;
  openLookSetup: () => void;
  closeLookSetup: () => void;
  completeLookSetup: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'lc_theme_name_v2';
const MODE_STORAGE_KEY = 'lc_theme_mode_v2';
const LOOK_SETUP_COMPLETED_KEY = 'lc_look_setup_completed_v2';

// Normalize older theme names if previously stored
function normalizeThemeName(raw: string | null): ThemeName {
  if (!raw) return DEFAULT_THEME;
  if (raw === 'blue' || raw === 'pink' || raw === 'brown' || raw === 'green') {
    return raw as ThemeName;
  }
  if (raw === 'default' || raw === 'ocean') return 'blue';
  if (raw === 'sage') return 'green';
  if (raw === 'peach') return 'brown';
  if (raw === 'lavender') return 'pink';
  return DEFAULT_THEME;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('lc_theme_name_v1');
      return normalizeThemeName(saved);
    } catch {
      return DEFAULT_THEME;
    }
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = (localStorage.getItem(MODE_STORAGE_KEY) || localStorage.getItem('lc_theme_mode_v1')) as ThemeMode | null;
      return saved && ['light', 'dark', 'system'].includes(saved) ? saved : 'system';
    } catch {
      return 'system';
    }
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Track whether "Choose your look" setup was previously completed/dismissed
  const [hasCompletedLookSetup, setHasCompletedLookSetup] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOOK_SETUP_COMPLETED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isLookSetupOpen, setIsLookSetupOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOOK_SETUP_COMPLETED_KEY) !== 'true';
    } catch {
      return false;
    }
  });

  // Listen to OS dark/light mode preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedMode: 'light' | 'dark' = useMemo(() => {
    if (mode === 'system') {
      return systemPrefersDark ? 'dark' : 'light';
    }
    return mode;
  }, [mode, systemPrefersDark]);

  const palette = THEME_PALETTES[themeName] || THEME_PALETTES[DEFAULT_THEME];
  const colors = resolvedMode === 'dark' ? palette.dark : palette.light;

  // Apply CSS variables and attributes to :root and html element
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', themeName);
    root.setAttribute('data-mode', resolvedMode);

    // Apply global design tokens (Requested in Section 7)
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--surface-elevated', colors.surfaceElevated);
    root.style.setProperty('--surface-subtle', colors.surfaceSubtle);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--border-subtle', colors.borderSubtle);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-soft', colors.accentSoft);
    root.style.setProperty('--accent-strong', colors.accentStrong);
    root.style.setProperty('--button', colors.button);
    root.style.setProperty('--button-text', colors.buttonText);
    root.style.setProperty('--button-hover', colors.buttonHover);
    root.style.setProperty('--highlight', colors.highlight);
    root.style.setProperty('--success', colors.success);
    root.style.setProperty('--warning', colors.warning);
    root.style.setProperty('--danger', colors.danger);
    root.style.setProperty('--ring', colors.ring);

    // Backward-compatibility aliases
    root.style.setProperty('--lc-primary', colors.button);
    root.style.setProperty('--lc-primary-hover', colors.buttonHover);
    root.style.setProperty('--lc-secondary', colors.accent);
    root.style.setProperty('--lc-background', colors.background);
    root.style.setProperty('--lc-surface', colors.surface);
    root.style.setProperty('--lc-surface-card', colors.surfaceElevated);
    root.style.setProperty('--lc-surface-muted', colors.surfaceSubtle);
    root.style.setProperty('--lc-text-primary', colors.textPrimary);
    root.style.setProperty('--lc-text-secondary', colors.textSecondary);
    root.style.setProperty('--lc-text-muted', colors.textMuted);
    root.style.setProperty('--lc-border', colors.border);
    root.style.setProperty('--lc-border-subtle', colors.borderSubtle);
    root.style.setProperty('--lc-accent', colors.highlight);
    root.style.setProperty('--lc-success', colors.success);
    root.style.setProperty('--lc-warning', colors.warning);
    root.style.setProperty('--lc-error', colors.danger);
    root.style.setProperty('--lc-ring', colors.ring);

    // Update meta theme-color for mobile chrome & status bar
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', colors.background);
    }
  }, [themeName, resolvedMode, colors]);

  const setThemeName = (name: ThemeName) => {
    setThemeNameState(name);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, name);
    } catch {
      // storage disabled
    }
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, newMode);
    } catch {
      // storage disabled
    }
  };

  const completeLookSetup = () => {
    setHasCompletedLookSetup(true);
    setIsLookSetupOpen(false);
    try {
      localStorage.setItem(LOOK_SETUP_COMPLETED_KEY, 'true');
    } catch {
      // storage disabled
    }
  };

  const openLookSetup = () => {
    setIsLookSetupOpen(true);
  };

  const closeLookSetup = () => {
    setIsLookSetupOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        mode,
        resolvedMode,
        colors,
        setThemeName,
        setMode,
        availableThemes: THEME_PALETTES,
        isLookSetupOpen,
        hasCompletedLookSetup,
        openLookSetup,
        closeLookSetup,
        completeLookSetup,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
