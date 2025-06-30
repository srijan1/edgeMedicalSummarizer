/**
 * Medical-grade color palette for HIPAA-compliant healthcare app
 * Ensures high contrast ratios for accessibility compliance
 */

export const Colors = {
  // Primary Healthcare Blues
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE', 
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#2563EB', // Main brand color
    600: '#1D4ED8',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#1E293B',
  },

  // Medical Success Green
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#059669', // Medical green
    600: '#047857',
    700: '#065F46',
    800: '#064E3B',
    900: '#022C22',
  },

  // Medical Warning/Alert
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Medical Error Red
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Neutral Healthcare Grays
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Semantic Colors
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  
  // Status Colors
  status: {
    verified: '#059669',
    flagged: '#EF4444',
    pending: '#F59E0B',
    processing: '#2563EB',
  },

  // HIPAA Compliance Indicators
  security: {
    encrypted: '#059669',
    local: '#2563EB', 
    secure: '#7C3AED',
  },
} as const;

export type ColorName = keyof typeof Colors;
export type ColorShade = keyof typeof Colors.primary;