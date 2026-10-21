export type ThemeName = 'default' | 'sage' | 'peach' | 'lavender' | 'ocean';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceCard: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  ring: string;
}

export interface PaletteDefinition {
  id: ThemeName;
  name: string;
  description: string;
  preview: {
    primary: string;
    secondary: string;
    background: string;
  };
  light: ThemeColors;
  dark: ThemeColors;
}
