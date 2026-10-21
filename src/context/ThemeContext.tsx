import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeName, ThemeMode, ThemeColors } from '../types/theme';
import { THEME_PALETTES } from '../themes/palettes';

interface ThemeContextValue {
  themeName: ThemeName;
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  colors: ThemeColors;
  setThemeName: (name: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  availableThemes: typeof THEME_PALETTES;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'lc_theme_name_v1';
const MODE_STORAGE_KEY = 'lc_theme_mode_v1';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
      return saved && THEME_PALETTES[saved] ? saved : 'default';
    } catch {
      return 'default';
    }
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode | null;
      return saved && ['light', 'dark', 'system'].includes(saved) ? saved : 'system';
    } catch {
      return 'system';
    }
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen to OS dark/light changes
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

  const palette = THEME_PALETTES[themeName] || THEME_PALETTES.default;
  const colors = resolvedMode === 'dark' ? palette.dark : palette.light;

  // Apply CSS variables to :root and html element
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', themeName);
    root.setAttribute('data-mode', resolvedMode);

    // Apply design tokens
    root.style.setProperty('--lc-primary', colors.primary);
    root.style.setProperty('--lc-primary-hover', colors.primaryHover);
    root.style.setProperty('--lc-secondary', colors.secondary);
    root.style.setProperty('--lc-background', colors.background);
    root.style.setProperty('--lc-surface', colors.surface);
    root.style.setProperty('--lc-surface-card', colors.surfaceCard);
    root.style.setProperty('--lc-surface-muted', colors.surfaceMuted);
    root.style.setProperty('--lc-text-primary', colors.textPrimary);
    root.style.setProperty('--lc-text-secondary', colors.textSecondary);
    root.style.setProperty('--lc-text-muted', colors.textMuted);
    root.style.setProperty('--lc-border', colors.border);
    root.style.setProperty('--lc-border-subtle', colors.borderSubtle);
    root.style.setProperty('--lc-accent', colors.accent);
    root.style.setProperty('--lc-success', colors.success);
    root.style.setProperty('--lc-warning', colors.warning);
    root.style.setProperty('--lc-error', colors.error);
    root.style.setProperty('--lc-ring', colors.ring);

    // Update meta theme-color for browser chrome / status bar
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', colors.primary);
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
