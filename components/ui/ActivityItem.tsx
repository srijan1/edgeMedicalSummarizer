import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

interface ActivityItemProps {
  id: number;
  title: string;
  amount: string;
  date: string;
  status: 'flagged' | 'verified';
  onPress: (id: number) => void;
}

export default function ActivityItem({ id, title, amount, date, status, onPress }: ActivityItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.icon}>
        <FileText size={20} color="#64748B" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={[
            styles.statusBadge,
            status === 'flagged' ? styles.flaggedBadge : styles.verifiedBadge
          ]}>
            {status === 'flagged' ? (
              <AlertTriangle size={12} color="#EF4444" />
            ) : (
              <CheckCircle size={12} color="#059669" />
            )}
            <Text style={[
              styles.statusText,
              status === 'flagged' ? styles.flaggedText : styles.verifiedText
            ]}>
              {status === 'flagged' ? 'Flagged' : 'Verified'}
            </Text>
          </View>
        </View>
        
        <View style={styles.meta}>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  flaggedBadge: {
    backgroundColor: '#FEF2F2',
  },
  verifiedBadge: {
    backgroundColor: '#F0FDF4',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  flaggedText: {
    color: '#EF4444',
  },
  verifiedText: {
    color: '#059669',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
});