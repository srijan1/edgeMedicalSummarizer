import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight, Video as LucideIcon } from 'lucide-react-native';

interface SettingItemProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  iconColor?: string;
  onPress?: () => void;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  switchTrackColor?: { false: string; true: string };
  rightText?: string;
  isDestructive?: boolean;
}

export default function SettingItem({
  title,
  description,
  icon: Icon,
  iconColor = '#64748B',
  onPress,
  switchValue,
  onSwitchChange,
  switchTrackColor = { false: '#E2E8F0', true: '#2563EB' },
  rightText,
  isDestructive = false
}: SettingItemProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon size={20} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, isDestructive && { color: '#EF4444' }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {switchValue !== undefined && onSwitchChange ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={switchTrackColor}
          thumbColor={switchValue ? '#FFFFFF' : '#94A3B8'}
        />
      ) : rightText ? (
        <Text style={styles.rightText}>{rightText}</Text>
      ) : (
        <ChevronRight size={20} color="#64748B" />
      )}
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
  },
  rightText: {
    fontSize: 16,
    color: '#64748B',
  },
});