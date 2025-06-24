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
import { router } from 'expo-router';
import { Plus, FileText, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, TrendingUp, Calendar, DollarSign, Clock } from 'lucide-react-native';

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
    router.push('/(tabs)/upload');
  };

  const handleViewBill = (billId: number) => {
    router.push('/(tabs)/processing');
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
          <TouchableOpacity style={styles.primaryAction} onPress={handleNewUpload}>
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>Upload New Bill</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentActivity.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityItem}
              onPress={() => handleViewBill(item.id)}
            >
              <View style={styles.activityIcon}>
                <FileText size={20} color="#64748B" />
              </View>
              
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    item.status === 'flagged' ? styles.flaggedBadge : styles.verifiedBadge
                  ]}>
                    {item.status === 'flagged' ? (
                      <AlertTriangle size={12} color="#EF4444" />
                    ) : (
                      <CheckCircle size={12} color="#059669" />
                    )}
                    <Text style={[
                      styles.statusText,
                      item.status === 'flagged' ? styles.flaggedText : styles.verifiedText
                    ]}>
                      {item.status === 'flagged' ? 'Flagged' : 'Verified'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.activityMeta}>
                  <Text style={styles.activityAmount}>{item.amount}</Text>
                  <Text style={styles.activityDate}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  primaryAction: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  activityContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#2563EB',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activityItem: {
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  flaggedText: {
    color: '#EF4444',
  },
  verifiedText: {
    color: '#059669',
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  activityDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
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
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Medium',
  },
});