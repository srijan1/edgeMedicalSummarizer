import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import LoginScreen from './index';
import TabNavigator from '@/components/navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // CRITICAL: This hook MUST remain - required for framework functionality
  useFrameworkReady();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load fonts
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        {!isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <TabNavigator onLogout={handleLogout} />
        )}
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});