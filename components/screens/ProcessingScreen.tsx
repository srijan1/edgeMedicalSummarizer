import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Eye, Flag, Download, FileText, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';
import { TabType } from '../navigation/TabNavigator';
import ChatScreen from './ChatScreen';

const PROCESSING_STEPS = [
  'Initializing secure scan...',
  'Extracting text from document...',
  'Identifying medical codes...',
  'Analyzing billing accuracy...',
  'Generating report...',
];

const MOCK_EXTRACTED_DATA = [
  {
    id: 1,
    code: 'CPT 99213',
    description: 'Office visit, established patient, 15 minutes',
    amount: '$150.00',
    status: 'verified' as const,
    explanation: 'Standard office visit charge for established patients. This is a common and appropriate charge for a routine follow-up appointment.',
  },
  {
    id: 2,
    code: 'CPT 85025',
    description: 'Complete blood count with differential',
    amount: '$45.00',
    status: 'verified' as const,
    explanation: 'Laboratory test to evaluate overall health and detect various disorders including anemia and infection.',
  },
  {
    id: 3,
    code: 'CPT 36415',
    description: 'Blood draw/venipuncture',
    amount: '$25.00',
    status: 'flagged' as const,
    explanation: 'This charge seems high for a simple blood draw. Typical range is $15-20. Consider requesting an itemized breakdown.',
  },
  {
    id: 4,
    code: 'ICD-10 Z00.00',
    description: 'General adult medical examination',
    amount: '$75.00',
    status: 'verified' as const,
    explanation: 'Routine health examination code. This charge is appropriate for preventive care visits.',
  },
];


interface ProcessingScreenProps {
  uploadData?: any;
  image: string;
  onNavigate: (tab: TabType, data?: any) => void;
}

export default function ProcessingScreen({ uploadData, image, onNavigate }: ProcessingScreenProps) {

  const [isProcessing, setIsProcessing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Simulate processing steps
    const processSteps = async () => {
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      setIsProcessing(false);
      setShowResults(true);
    };

    if (uploadData) {
      processSteps();
    } else {
      // If no upload data, show results directly (for navigation from dashboard)
      setIsProcessing(false);
      setShowResults(true);
    }
  }, [uploadData]);

  const handleFlagIssue = (itemId: number) => {
    console.log('Flagging issue for item:', itemId);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };

  const handleGenerateDispute = () => {
    console.log('Generating dispute letter...');
  };

  if (isProcessing) {
    return (
      <View style={styles.container}>
        <View style={styles.processingContainer}>
          <View style={styles.processingHeader}>
            <Image
              source={{ uri: uploadData?.image || 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2' }}
              style={styles.documentThumbnail}
            />
            <Text style={styles.processingTitle}>Processing Your Bill</Text>
            <Text style={styles.processingSubtitle}>
              Scanning your bill securely on this device...
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentStep + 1) / PROCESSING_STEPS.length) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(((currentStep + 1) / PROCESSING_STEPS.length) * 100)}% Complete
            </Text>
          </View>

          <View style={styles.stepsContainer}>
            {PROCESSING_STEPS.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[
                  styles.stepIndicator,
                  index <= currentStep ? styles.stepActive : styles.stepInactive
                ]}>
                  {index < currentStep ? (
                    <CheckCircle size={16} color="#FFFFFF" />
                  ) : index === currentStep ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <View style={styles.stepDot} />
                  )}
                </View>
                <Text style={[
                  styles.stepText,
                  index <= currentStep ? styles.stepTextActive : styles.stepTextInactive
                ]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.securityNotice}>
            <Text style={styles.securityText}>
              🔒 All processing happens locally. Your medical data remains private and secure.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ChatScreen data={uploadData} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  processingHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  documentThumbnail: {
    width: 120,
    height: 80,
    borderRadius: 12,
    marginBottom: 20,
  },
  processingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  processingSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  stepsContainer: {
    marginBottom: 40,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepActive: {
    backgroundColor: '#2563EB',
  },
  stepInactive: {
    backgroundColor: '#E2E8F0',
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94A3B8',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
  },
  stepTextActive: {
    color: '#1E293B',
  },
  stepTextInactive: {
    color: '#94A3B8',
  },
  securityNotice: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  securityText: {
    fontSize: 14,
    color: '#047857',
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  summaryContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  summaryStats: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  splitContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  documentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  documentPreview: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  documentImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  documentOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  dataSection: {},
  dataItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 8,
  },
  statusBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flaggedBadge: {
    backgroundColor: '#FEF2F2',
  },
  verifiedBadge: {
    backgroundColor: '#F0FDF4',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  explanationContainer: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  flagButtonText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  primaryAction: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  secondaryActionText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});