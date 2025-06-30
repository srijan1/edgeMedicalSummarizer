import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  icon?: typeof LucideIcon;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function ActionButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  disabled = false,
  loading = false,
  fullWidth = true,
}: ActionButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#94A3B8' : '#2563EB',
          textColor: '#FFFFFF',
          borderColor: 'transparent',
          shadowColor: disabled ? 'transparent' : '#2563EB',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? '#F1F5F9' : '#059669',
          textColor: '#FFFFFF',
          borderColor: 'transparent',
          shadowColor: disabled ? 'transparent' : '#059669',
        };
      case 'outline':
        return {
          backgroundColor: '#FFFFFF',
          textColor: disabled ? '#94A3B8' : '#2563EB',
          borderColor: disabled ? '#E2E8F0' : '#2563EB',
          shadowColor: 'transparent',
        };
      case 'destructive':
        return {
          backgroundColor: '#FFFFFF',
          textColor: disabled ? '#94A3B8' : '#EF4444',
          borderColor: disabled ? '#E2E8F0' : '#EF4444',
          shadowColor: 'transparent',
        };
      default:
        return {
          backgroundColor: '#2563EB',
          textColor: '#FFFFFF',
          borderColor: 'transparent',
          shadowColor: '#2563EB',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: 12, fontSize: 14 };
      case 'large':
        return { padding: 20, fontSize: 18 };
      default:
        return { padding: 16, fontSize: 16 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          padding: sizeStyles.padding,
        },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        variantStyles.shadowColor !== 'transparent' && !disabled && {
          shadowColor: variantStyles.shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.textColor} size="small" />
      ) : (
        <>
          {Icon && <Icon size={20} color={variantStyles.textColor} style={styles.icon} />}
          <Text
            style={[
              styles.text,
              {
                color: variantStyles.textColor,
                fontSize: sizeStyles.fontSize,
              },
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: '600',
  },
});