/**
 * Medical-grade typography system
 * High readability for healthcare professionals and patients
 */

export const Typography = {
  // Font families
  fonts: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium', 
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },

  // Font sizes (responsive scaling)
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },

  // Line heights (optimized for readability)
  lineHeights: {
    tight: 1.2,    // Headings
    normal: 1.5,   // Body text
    relaxed: 1.75, // Long-form content
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },

  // Semantic text styles
  styles: {
    // Headings
    h1: {
      fontFamily: 'Inter-Bold',
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: 'Inter-Bold', 
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: -0.5,
    },
    h3: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 24,
      lineHeight: 32,
    },
    h4: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 20,
      lineHeight: 28,
    },
    
    // Body text
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      lineHeight: 24,
    },
    
    // Small text
    caption: {
      fontFamily: 'Inter-Regular', 
      fontSize: 12,
      lineHeight: 16,
    },
    captionMedium: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      lineHeight: 16,
    },
    
    // Button text
    button: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      lineHeight: 24,
    },
    buttonSmall: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
      lineHeight: 20,
    },
  },
} as const;

export type TypographyStyle = keyof typeof Typography.styles;