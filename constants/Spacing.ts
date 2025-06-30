/**
 * 8px spacing system for consistent layouts
 * Based on Material Design and iOS Human Interface Guidelines
 */

export const Spacing = {
  // Base unit (8px)
  unit: 8,
  
  // Common spacings
  xs: 4,   // 0.5x
  sm: 8,   // 1x
  md: 16,  // 2x  
  lg: 24,  // 3x
  xl: 32,  // 4x
  xxl: 48, // 6x
  
  // Component-specific
  container: 24,
  section: 32,
  card: 16,
  button: 16,
  
  // Screen edges
  screen: {
    horizontal: 24,
    vertical: 16,
  },
  
  // Touch targets (minimum 44pt for accessibility)
  touchTarget: 44,
  
  // Safe areas
  statusBar: 44,
  tabBar: 88,
} as const;

export type SpacingKey = keyof typeof Spacing;