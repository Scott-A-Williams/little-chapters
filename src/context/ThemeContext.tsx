import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    try {
      const saved =
        localStorage.getItem(THEME_STORAGE_KEY) ||
        localStorage.getItem('lc_theme_name_v1');

      return normalizeThemeName(saved);
    } catch {
      return DEFAULT_THEME;
    }
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = (
        localStorage.getItem(MODE_STORAGE_KEY) ||
        localStorage.getItem('lc_theme_mode_v1')
      ) as ThemeMode | null;

      return saved && ['light', 'dark', 'system'].includes(saved)
        ? saved
        : 'system';
    } catch {
      return 'system';
    }
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [hasCompletedLookSetup, setHasCompletedLookSetup] =
    useState<boolean>(() => {
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (event: MediaQueryListEvent) => {
      setSystemPrefersDark(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  const resolvedMode: 'light' | 'dark' = useMemo(() => {
    if (mode === 'system') {
      return systemPrefersDark ? 'dark' : 'light';
    }

    return mode;
  }, [mode, systemPrefersDark]);

  const palette =
    THEME_PALETTES[themeName] || THEME_PALETTES[DEFAULT_THEME];

  const colors =
    resolvedMode === 'dark' ? palette.dark : palette.light;

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', themeName);
    root.setAttribute('data-mode', resolvedMode);

    const variables: Record<string, string> = {
      '--background': colors.background,
      '--surface': colors.surface,
      '--surface-elevated': colors.surfaceElevated,
      '--surface-subtle': colors.surfaceSubtle,

      '--text-primary': colors.textPrimary,
      '--text-secondary': colors.textSecondary,
      '--text-muted': colors.textMuted,

      '--border': colors.border,
      '--border-subtle': colors.borderSubtle,

      '--accent': colors.accent,
      '--accent-soft': colors.accentSoft,
      '--accent-strong': colors.accentStrong,

      '--button': colors.button,
      '--button-text': colors.buttonText,
      '--button-hover': colors.buttonHover,

      '--highlight': colors.highlight,

      '--success': colors.success,
      '--warning': colors.warning,
      '--danger': colors.danger,
      '--ring': colors.ring,
    };

    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Legacy aliases retained for components that have not yet
    // been migrated to the main token system.
    const aliases: Record<string, string> = {
      '--lc-primary': colors.button,
      '--lc-primary-hover': colors.buttonHover,
      '--lc-secondary': colors.accent,

      '--lc-background': colors.background,
      '--lc-surface': colors.surface,
      '--lc-surface-card': colors.surfaceElevated,
      '--lc-surface-muted': colors.surfaceSubtle,

      '--lc-text-primary': colors.textPrimary,
      '--lc-text-secondary': colors.textSecondary,
      '--lc-text-muted': colors.textMuted,

      '--lc-border': colors.border,
      '--lc-border-subtle': colors.borderSubtle,

      '--lc-accent': colors.highlight,

      '--lc-success': colors.success,
      '--lc-warning': colors.warning,
      '--lc-error': colors.danger,
      '--lc-ring': colors.ring,
    };

    Object.entries(aliases).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    const metaTheme = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (metaTheme) {
      metaTheme.setAttribute('content', colors.background);
    }
  }, [themeName, resolvedMode, colors]);

  const setThemeName = (name: ThemeName) => {
    setThemeNameState(name);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, name);
    } catch {
      // Storage may be unavailable.
    }
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);

    try {
      localStorage.setItem(MODE_STORAGE_KEY, newMode);
    } catch {
      // Storage may be unavailable.
    }
  };

  const completeLookSetup = () => {
    setHasCompletedLookSetup(true);
    setIsLookSetupOpen(false);

    try {
      localStorage.setItem(LOOK_SETUP_COMPLETED_KEY, 'true');
    } catch {
      // Storage may be unavailable.
    }
  };

  const openLookSetup = () => {
    setIsLookSetupOpen(true);
  };

  const closeLookSetup = () => {
    setIsLookSetupOpen(false);
  };

  const value = {
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
  };

  return (
    <ThemeContext.Provider value={value}>
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
