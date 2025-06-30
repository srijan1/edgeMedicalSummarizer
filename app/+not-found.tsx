import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <React.Fragment>
      {/* <Stack.Screen options={{ title: 'Oops!' }} /> */}
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <TouchableOpacity style={styles.link} onPress={() => console.log('Go to home - Expo router commented out')}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});