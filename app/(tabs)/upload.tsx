import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Upload, Image as ImageIcon, FileText, Calendar, MapPin, Star, X, CircleCheck as CheckCircle } from 'lucide-react-native';

const billTypes = [
  { label: 'Hospital', value: 'hospital' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Pharmacy', value: 'pharmacy' },
  { label: 'Specialist', value: 'specialist' },
  { label: 'Lab/Imaging', value: 'lab' },
];

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [billType, setBillType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleProceed = () => {
    if (!selectedImage) {
      Alert.alert('Missing Information', 'Please upload a bill to proceed.');
      return;
    }

    if (!billType) {
      Alert.alert('Missing Information', 'Please select a bill type.');
      return;
    }

    // Navigate to processing screen
    router.push('/(tabs)/processing');
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)}
        style={styles.starButton}
      >
        <Star
          size={24}
          color={index < rating ? '#F59E0B' : '#D1D5DB'}
          fill={index < rating ? '#F59E0B' : 'transparent'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upload Medical Bill</Text>
          <Text style={styles.subtitle}>
            Upload your bill and provide details for accurate analysis
          </Text>
        </View>

        <View style={styles.content}>
          {/* Upload Section */}
          <View style={styles.uploadSection}>
            <Text style={styles.sectionTitle}>Document Upload</Text>
            
            {!selectedImage ? (
              <TouchableOpacity style={styles.uploadZone} onPress={pickImage}>
                <Upload size={48} color="#64748B" />
                <Text style={styles.uploadTitle}>Drag and drop your bill here</Text>
                <Text style={styles.uploadSubtitle}>or</Text>
                <View style={styles.uploadButton}>
                  <ImageIcon size={20} color="#2563EB" />
                  <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
                </View>
                <Text style={styles.formatText}>Supports PDF, JPG, PNG (max 16MB)</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.imagePreview}>
                <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                  <X size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.previewOverlay}>
                  <CheckCircle size={24} color="#059669" />
                  <Text style={styles.previewText}>Bill uploaded successfully</Text>
                </View>
              </View>
            )}
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Bill Information</Text>

            {/* Bill Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bill Type *</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={[styles.dropdownText, billType ? styles.selectedText : null]}>
                  {billType ? billTypes.find(type => type.value === billType)?.label : 'Select bill type'}
                </Text>
                <FileText size={20} color="#64748B" />
              </TouchableOpacity>
              
              {showDropdown && (
                <View style={styles.dropdownMenu}>
                  {billTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setBillType(type.value);
                        setShowDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{type.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Due Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Due Date</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#94A3B8"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
                <Calendar size={20} color="#64748B" />
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Where is the bill from?</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Healthcare provider or facility"
                  placeholderTextColor="#94A3B8"
                  value={location}
                  onChangeText={setLocation}
                />
                <MapPin size={20} color="#64748B" />
              </View>
            </View>

            {/* Service Rating */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Quality Rating</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars()}
                </View>
                {rating > 0 && rating < 3 && (
                  <Text style={styles.ratingNote}>Needs improvement</Text>
                )}
              </View>
            </View>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity 
            style={[styles.proceedButton, (!selectedImage || !billType) && styles.disabledButton]}
            onPress={handleProceed}
            disabled={!selectedImage || !billType}
          >
            <Text style={styles.proceedButtonText}>Proceed to Analysis</Text>
          </TouchableOpacity>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Text style={styles.securityText}>
              🔒 Your document is processed locally on this device. No data is transmitted to external servers.
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
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  uploadSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  uploadZone: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  formatText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  imagePreview: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EF4444',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 48,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  selectedText: {
    color: '#1E293B',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginRight: 4,
  },
  ratingNote: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  proceedButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-Regular',
    color: '#047857',
    textAlign: 'center',
    lineHeight: 20,
  },
});