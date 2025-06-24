import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { User, Settings, Shield, Bell, Lock, Download, Trash2, LogOut, ChevronRight, CreditCard as Edit } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoAnalysisEnabled, setAutoAnalysisEnabled] = useState(false);
  const [secureProcessingEnabled, setSecureProcessingEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out? All local data will be cleared.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            router.replace('/');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            console.log('Account deletion requested');
          }
        }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your analysis history and preferences will be exported as a secure file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => {
            // Handle data export
            console.log('Data export requested');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Emily Carter</Text>
          <Text style={styles.userEmail}>emily.carter@email.com</Text>
          <Text style={styles.memberSince}>Member since March 2024</Text>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <User size={20} color="#64748B" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Personal Information</Text>
              <Text style={styles.settingDescription}>Update your profile details</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Lock size={20} color="#64748B" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Change Password</Text>
              <Text style={styles.settingDescription}>Update your login credentials</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Shield size={20} color="#059669" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Local Processing</Text>
              <Text style={styles.settingDescription}>All data processed on device</Text>
            </View>
            <Switch
              value={secureProcessingEnabled}
              onValueChange={setSecureProcessingEnabled}
              trackColor={{ false: '#E2E8F0', true: '#059669' }}
              thumbColor={secureProcessingEnabled ? '#FFFFFF' : '#94A3B8'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Settings size={20} color="#64748B" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Session Timeout</Text>
              <Text style={styles.settingDescription}>30 minutes (HIPAA compliant)</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Lock size={20} color="#64748B" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Data Retention</Text>
              <Text style={styles.settingDescription}>Manage stored bill data</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Bell size={20} color="#64748B" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Bill analysis alerts</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#94A3B8'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Settings size={20} color="#64748B" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Auto Analysis</Text>
              <Text style={styles.settingDescription}>Process bills automatically</Text>
            </View>
            <Switch
              value={autoAnalysisEnabled}
              onValueChange={setAutoAnalysisEnabled}
              trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
              thumbColor={autoAnalysisEnabled ? '#FFFFFF' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
            <View style={styles.settingIcon}>
              <Download size={20} color="#2563EB" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Export Data</Text>
              <Text style={styles.settingDescription}>Download your analysis history</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleDeleteAccount}>
            <View style={styles.settingIcon}>
              <Trash2 size={20} color="#EF4444" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: '#EF4444' }]}>Delete Account</Text>
              <Text style={styles.settingDescription}>Permanently remove all data</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Privacy Policy</Text>
            <TouchableOpacity>
              <Text style={styles.infoLink}>View Policy</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Terms of Service</Text>
            <TouchableOpacity>
              <Text style={styles.infoLink}>View Terms</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* HIPAA Notice */}
        <View style={styles.hipaaNotice}>
          <Shield size={24} color="#059669" />
          <View style={styles.hipaaContent}>
            <Text style={styles.hipaaTitle}>HIPAA Compliant</Text>
            <Text style={styles.hipaaDescription}>
              This app follows HIPAA guidelines for protecting your health information. All processing is done locally on your device.
            </Text>
          </View>
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
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563EB',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  infoLink: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  hipaaNotice: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    margin: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  hipaaContent: {
    flex: 1,
    marginLeft: 16,
  },
  hipaaTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#065F46',
    marginBottom: 8,
  },
  hipaaDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#047857',
    lineHeight: 20,
  },
});