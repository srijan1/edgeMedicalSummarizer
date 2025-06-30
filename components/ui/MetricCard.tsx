import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface MetricCardProps {
  value: string;
  label: string;
  change: string;
  icon: typeof LucideIcon;
  trendIcon: typeof LucideIcon;
  iconColor: string;
  trendColor: string;
  onPress?: () => void;
}

export default function MetricCard({
  value,
  label,
  change,
  icon: Icon,
  trendIcon: TrendIcon,
  iconColor,
  trendColor,
  onPress
}: MetricCardProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Icon size={24} color={iconColor} />
        <TrendIcon size={16} color={trendColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.change, { color: trendColor }]}>{change}</Text>
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  change: {
    fontSize: 11,
    fontWeight: '500',
  },
});