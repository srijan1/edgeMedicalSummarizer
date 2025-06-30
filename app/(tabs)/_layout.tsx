// import { Tabs } from 'expo-router';
// import { Platform } from 'react-native';
// import { Upload, Search, ChartBar as BarChart3, User, Chrome as Home } from 'lucide-react-native';

import React from 'react';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tab Layout - Expo code commented out</Text>
    </View>
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarActiveTintColor: '#2563EB',
    //     tabBarInactiveTintColor: '#64748B',
    //     tabBarStyle: {
    //       backgroundColor: '#FFFFFF',
    //       borderTopColor: '#E2E8F0',
    //       borderTopWidth: 1,
    //       height: Platform.OS === 'ios' ? 88 : 64,
    //       paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    //       paddingTop: 8,
    //       shadowColor: '#000',
    //       shadowOffset: { width: 0, height: -2 },
    //       shadowOpacity: 0.1,
    //       shadowRadius: 8,
    //       elevation: 8,
    //     },
    //     tabBarLabelStyle: {
    //       fontSize: 12,
    //       fontFamily: 'Inter-Medium',
    //       marginTop: Platform.OS === 'android' ? 4 : 0,
    //     },
    //     tabBarIconStyle: {
    //       marginTop: Platform.OS === 'android' ? 4 : 0,
    //     },
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Dashboard',
    //       tabBarIcon: ({ size, color }) => (
    //         <Home size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="upload"
    //     options={{
    //       title: 'Upload',
    //       tabBarIcon: ({ size, color }) => (
    //         <Upload size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="processing"
    //     options={{
    //       title: 'Review',
    //       tabBarIcon: ({ size, color }) => (
    //         <Search size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="analytics"
    //     options={{
    //       title: 'Analytics',
    //       tabBarIcon: ({ size, color }) => (
    //         <BarChart3 size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: 'Profile',
    //       tabBarIcon: ({ size, color }) => (
    //         <User size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}