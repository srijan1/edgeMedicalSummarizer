import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield } from 'lucide-react-native';

interface SecurityNoticeProps {
  title?: string;
  message: string;
  variant?: 'success' | 'info' | 'warning';
}

export default function SecurityNotice({ 
  title, 
  message, 
  variant = 'success' 
}: SecurityNoticeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: { backgroundColor: '#F0FDF4', borderColor: '#D1FAE5' },
          icon: '#059669',
          title: '#065F46',
          text: '#047857',
        };
      case 'info':
        return {
          container: { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' },
          icon: '#2563EB',
          title: '#1E40AF',
          text: '#1D4ED8',
        };
      case 'warning':
        return {
          container: { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' },
          icon: '#F59E0B',
          title: '#92400E',
          text: '#D97706',
        };
      default:
        return {
          container: { backgroundColor: '#F0FDF4', borderColor: '#D1FAE5' },
          icon: '#059669',
          title: '#065F46',
          text: '#047857',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.container, variantStyles.container]}>
      <Shield size={24} color={variantStyles.icon} />
      <View style={styles.content}>
        {title && (
          <Text style={[styles.title, { color: variantStyles.title }]}>{title}</Text>
        )}
        <Text style={[styles.message, { color: variantStyles.text }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    lineHeight: 16,
  },
});