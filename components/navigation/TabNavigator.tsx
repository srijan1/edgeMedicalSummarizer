import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Upload, Search, MessageCircleIcon, ChartBar as BarChart3, User, Chrome as Home } from 'lucide-react-native';
import DashboardScreen from '@/components/screens/DashboardScreen';
import UploadScreen from '@/components/screens/UploadScreen';
import ProcessingScreen from '@/components/screens/ProcessingScreen';
import AnalyticsScreen from '@/components/screens/AnalyticsScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
interface TabNavigatorProps {
  onLogout: () => void;
}

export type TabType = 'dashboard' | 'upload' | 'processing' | 'analytics' | 'profile';

const tabs = [
  { id: 'dashboard', title: 'Dashboard', icon: Home },
  { id: 'upload', title: 'Upload', icon: Upload },
  { id: 'processing', title: 'Ask', icon: MessageCircleIcon },
  { id: 'analytics', title: 'Analytics', icon: BarChart3 },
  { id: 'profile', title: 'Profile', icon: User },
];
export default function TabNavigator({ onLogout }: TabNavigatorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [uploadData, setUploadData] = useState<any>(null);
  const { bottom, top } = useSafeAreaInsets();

  // Calculate just the visual tab bar height that needs keyboard clearance
  const tabBarHeight = useMemo(() => {
    if (Platform.OS === 'ios') {
      // For iOS: base tab height + minimal padding
      return 60 + bottom;
    } else {
      // For Android: proportional to screen size + safe area
      return bottom;
    }
  }, [bottom, height]);

  const navigateToTab = (tab: TabType, data?: any) => {
    setActiveTab(tab);
    if (data) {
      setUploadData(data);
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigateToTab} />;
      case 'upload':
        return <UploadScreen onNavigate={navigateToTab} />;
      case 'processing':
        return <ProcessingScreen uploadData={uploadData} onNavigate={navigateToTab} tabBarHeight={tabBarHeight} />;
      case 'analytics':
        return <AnalyticsScreen onNavigate={navigateToTab} />;
      case 'profile':
        return <ProfileScreen onLogout={onLogout} onNavigate={navigateToTab} />;
      default:
        return <DashboardScreen onNavigate={navigateToTab} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top }]}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={[styles.tabBar, { paddingBottom: bottom, height: Platform.OS === 'ios' ? 88 : bottom ? height * 0.125 : height * 0.1, }]}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => navigateToTab(tab.id as TabType)}
            >
              <Icon
                size={24}
                color={isActive ? '#2563EB' : '#64748B'}
              />
              <Text style={[
                styles.tabLabel,
                { color: isActive ? '#2563EB' : '#64748B' }
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    width: width,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E2E8F0',
    borderTopWidth: 1,

    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingHorizontal: 16,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});