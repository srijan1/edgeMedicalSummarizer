import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
// import { router } from 'expo-router';
import { Plus, FileText, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, TrendingUp, Calendar, DollarSign, Clock } from 'lucide-react-native';
import StatCard from '@/components/ui/StatCard';
import ActivityItem from '@/components/ui/ActivityItem';
import SectionHeader from '@/components/layout/SectionHeader';
import ActionButton from '@/components/ui/ActionButton';

const stats = [
  { label: 'Total Bills', value: '24', icon: FileText, color: '#2563EB' },
  { label: 'Flagged Issues', value: '3', icon: AlertTriangle, color: '#EF4444' },
  { label: 'Verified Bills', value: '21', icon: CheckCircle, color: '#059669' },
  { label: 'Savings Found', value: '$1,247', icon: DollarSign, color: '#7C3AED' },
];

const recentActivity = [
  {
    id: 1,
    type: 'processed',
    title: 'Hospital Bill - Emergency Visit',
    amount: '$2,340.00',
    date: '2 hours ago',
    status: 'flagged',
  },
  {
    id: 2,
    type: 'processed',
    title: 'Pharmacy - Prescription Refill',
    amount: '$89.50',
    date: '1 day ago',
    status: 'verified',
  },
  {
    id: 3,
    type: 'processed',
    title: 'Clinic Visit - Annual Checkup',
    amount: '$450.00',
    date: '3 days ago',
    status: 'verified',
  },
];

export default function DashboardScreen() {
  const handleNewUpload = () => {
    // router.push('/(tabs)/upload');
    console.log('Navigate to upload - Expo router commented out');
  };

  const handleViewBill = (billId: number) => {
    // router.push('/(tabs)/processing');
    console.log('Navigate to processing - Expo router commented out');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome to Med Bill Tracker!</Text>
            <Text style={styles.dateText}>Today, {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</Text>
          </View>

          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Emily Carter</Text>
              <Text style={styles.userRole}>Patient</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <ActionButton
            title="Upload New Bill"
            onPress={handleNewUpload}
            icon={Plus}
            variant="primary"
          />
        </View>

        {/* Statistics Grid */}
        <View style={styles.statsContainer}>
          <SectionHeader title="Overview" />
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <SectionHeader
            title="Recent Activity"
            actionText="View All"
            onActionPress={() => console.log('View all pressed')}
          />

          {recentActivity.map((item) => (
            <ActivityItem
              key={item.id}
              id={item.id}
              title={item.title}
              amount={item.amount}
              date={item.date}
              status={item.status as 'flagged' | 'verified'}
              onPress={handleViewBill}
            />
          ))}
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>
            Our support team is here to help you understand your medical bills and identify potential issues.
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#64748B',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#64748B',
  },
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  supportSection: {
    backgroundColor: '#FFFFFF',
    margin: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});