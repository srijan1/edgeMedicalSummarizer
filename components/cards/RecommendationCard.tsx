import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface RecommendationCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  iconColor: string;
  onPress?: () => void;
}

export default function RecommendationCard({
  title,
  description,
  icon: Icon,
  iconColor,
  onPress
}: RecommendationCardProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      <Icon size={24} color={iconColor} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
});