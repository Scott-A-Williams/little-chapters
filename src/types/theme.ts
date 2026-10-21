export type ThemeName = 'blue' | 'pink' | 'green' | 'brown';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Global Design Tokens
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  button: string;
  buttonText: string;
  buttonHover: string;
  highlight: string;
  success: string;
  warning: string;
  danger: string;
  ring: string;

  // Backward-compatibility aliases for existing components
  primary: string;
  primaryHover: string;
  secondary: string;
  surfaceCard: string;
  surfaceMuted: string;
  error: string;
}

export interface PaletteDefinition {
  id: ThemeName;
  name: string;
  subtitle: string;
  description: string;
  preview: {
    accent: string;
    accentSoft: string;
    background: string;
    surface: string;
    textPrimary: string;
  };
  light: ThemeColors;
  dark: ThemeColors;
}
