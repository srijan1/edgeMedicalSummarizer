import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialIcons name="medical-services" size={48} color="#2563eb" />
          <Text style={styles.title}>Edge Medical Summarizer</Text>
          <Text style={styles.subtitle}>AI-Powered Medical Document Processing</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.featureCard}>
            <MaterialIcons name="camera-alt" size={32} color="#059669" />
            <Text style={styles.featureTitle}>OCR Processing</Text>
            <Text style={styles.featureDescription}>
              Extract text from medical images using advanced OCR technology
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialIcons name="code" size={32} color="#dc2626" />
            <Text style={styles.featureTitle}>Code Recognition</Text>
            <Text style={styles.featureDescription}>
              Identify and structure medical codes from processed text
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialIcons name="summarize" size={32} color="#7c3aed" />
            <Text style={styles.featureTitle}>AI Summarization</Text>
            <Text style={styles.featureDescription}>
              Generate concise medical summaries using Phi3 SLM model
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialIcons name="chat" size={32} color="#ea580c" />
            <Text style={styles.featureTitle}>Conversational AI</Text>
            <Text style={styles.featureDescription}>
              Interactive medical consultation with memory management
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ready to revolutionize medical document processing
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});