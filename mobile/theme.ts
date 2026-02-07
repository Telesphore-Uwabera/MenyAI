/**
 * Kwiga Rwanda – design tokens (matches web primary green)
 * Primary: HSL 147 65% 47% ≈ #2d8a4e
 */
export const colors = {
  primary: "#2d8a4e",
  primaryForeground: "#ffffff",
  primaryMuted: "#e8f5ec",
  background: "#ffffff",
  foreground: "#333333",
  muted: "#f5f5f5",
  mutedForeground: "#737373",
  border: "#e5e5e5",
  card: "#ffffff",
  warning: "#eab308",
  warningBg: "#fef9c3",
  orange: "#ea580c",
  orangeBg: "#fff7ed",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
} as const;
