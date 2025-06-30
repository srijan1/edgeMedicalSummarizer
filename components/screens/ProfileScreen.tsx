import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { User, Settings, Shield, Bell, Lock, Download, Trash2, LogOut, CreditCard as Edit } from 'lucide-react-native';
import SettingItem from '@/components/ui/SettingItem';
import SecurityNotice from '@/components/ui/SecurityNotice';
import ActionButton from '@/components/ui/ActionButton';
import SectionHeader from '@/components/layout/SectionHeader';
import { TabType } from '../navigation/TabNavigator';

interface ProfileScreenProps {
  onLogout: () => void;
  onNavigate: (tab: TabType, data?: any) => void;
}

export default function ProfileScreen({ onLogout, onNavigate }: ProfileScreenProps) {
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
          onPress: onLogout
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
            console.log('Data export requested');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        <SectionHeader title="Account Settings" />

        <SettingItem
          title="Personal Information"
          description="Update your profile details"
          icon={User}
          onPress={() => console.log('Personal info pressed')}
        />

        <SettingItem
          title="Change Password"
          description="Update your login credentials"
          icon={Lock}
          onPress={() => console.log('Change password pressed')}
        />
      </View>

      {/* Privacy & Security */}
      <View style={styles.section}>
        <SectionHeader title="Privacy & Security" />

        <SettingItem
          title="Local Processing"
          description="All data processed on device"
          icon={Shield}
          iconColor="#059669"
          switchValue={secureProcessingEnabled}
          onSwitchChange={setSecureProcessingEnabled}
          switchTrackColor={{ false: '#E2E8F0', true: '#059669' }}
        />

        <SettingItem
          title="Session Timeout"
          description="30 minutes (HIPAA compliant)"
          icon={Settings}
          onPress={() => console.log('Session timeout pressed')}
        />

        <SettingItem
          title="Data Retention"
          description="Manage stored bill data"
          icon={Lock}
          onPress={() => console.log('Data retention pressed')}
        />
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <SectionHeader title="Preferences" />

        <SettingItem
          title="Notifications"
          description="Bill analysis alerts"
          icon={Bell}
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />

        <SettingItem
          title="Auto Analysis"
          description="Process bills automatically"
          icon={Settings}
          switchValue={autoAnalysisEnabled}
          onSwitchChange={setAutoAnalysisEnabled}
        />
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <SectionHeader title="Data Management" />

        <SettingItem
          title="Export Data"
          description="Download your analysis history"
          icon={Download}
          iconColor="#2563EB"
          onPress={handleExportData}
        />

        <SettingItem
          title="Delete Account"
          description="Permanently remove all data"
          icon={Trash2}
          iconColor="#EF4444"
          isDestructive={true}
          onPress={handleDeleteAccount}
        />
      </View>

      {/* App Information */}
      <View style={styles.section}>
        <SectionHeader title="App Information" />

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
        <ActionButton
          title="Logout"
          onPress={handleLogout}
          icon={LogOut}
          variant="destructive"
        />
      </View>

      {/* HIPAA Notice */}
      <View style={styles.hipaaContainer}>
        <SecurityNotice
          title="HIPAA Compliant"
          message="This app follows HIPAA guidelines for protecting your health information. All processing is done locally on your device."
          variant="success"
        />
      </View>
    </ScrollView>
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
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: '#94A3B8',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 24,
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
    fontWeight: '500',
    color: '#1E293B',
  },
  infoValue: {
    fontSize: 16,
    color: '#64748B',
  },
  infoLink: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563EB',
  },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  hipaaContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});