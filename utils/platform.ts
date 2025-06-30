import { Platform } from 'react-native';

/**
 * Platform-specific utilities for web compatibility
 */

export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMobile = isIOS || isAndroid;

/**
 * Provides haptic feedback on mobile platforms
 * Falls back to no-op on web
 */
export const hapticFeedback = {
  light: () => {
    if (isMobile) {
      // Would use Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      // Currently disabled for web compatibility
    }
  },
  medium: () => {
    if (isMobile) {
      // Would use Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
    }
  },
  heavy: () => {
    if (isMobile) {
      // Would use Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
  },
};

/**
 * Platform-specific shadow styles
 */
export const shadows = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    },
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
  }),
};

/**
 * Safe area helpers
 */
export const safeArea = {
  top: Platform.select({
    ios: 44,
    android: 24,
    web: 0,
  }),
  bottom: Platform.select({
    ios: 34,
    android: 0,
    web: 0,
  }),
};