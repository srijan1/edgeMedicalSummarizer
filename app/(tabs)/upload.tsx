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
} from 'react-native';
// import { router } from 'expo-router';
// import * as ImagePicker from 'expo-image-picker';
import { FileText, Calendar, MapPin, Star } from 'lucide-react-native';
import UploadZone from '@/components/forms/UploadZone';
import InputGroup from '@/components/forms/InputGroup';
import SecurityNotice from '@/components/ui/SecurityNotice';
import ActionButton from '@/components/ui/ActionButton';
import SectionHeader from '@/components/layout/SectionHeader';

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
    // const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    // if (permissionResult.granted === false) {
    //   Alert.alert('Permission Required', 'Permission to access camera roll is required!');
    //   return;
    // }

    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   setSelectedImage(result.assets[0].uri);
    // }

    // Expo ImagePicker commented out - simulate image selection
    console.log('Image picker would open here - Expo code commented out');
    setSelectedImage('https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2');
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
    // router.push('/(tabs)/processing');
    console.log('Navigate to processing - Expo router commented out');
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
            <SectionHeader title="Document Upload" />
            <UploadZone
              selectedImage={selectedImage}
              onImagePick={pickImage}
              onImageRemove={removeImage}
            />
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <SectionHeader title="Bill Information" />

            {/* Bill Type */}
            <View style={styles.dropdownGroup}>
              <Text style={styles.dropdownLabel}>Bill Type *</Text>
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
            <InputGroup
              label="Due Date"
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="MM/DD/YYYY"
              icon={Calendar}
            />

            {/* Location */}
            <InputGroup
              label="Where is the bill from?"
              value={location}
              onChangeText={setLocation}
              placeholder="Healthcare provider or facility"
              icon={MapPin}
            />

            {/* Service Rating */}
            <View style={styles.ratingGroup}>
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
          <ActionButton
            title="Proceed to Analysis"
            onPress={handleProceed}
            disabled={!selectedImage || !billType}
            variant="primary"
          />

          {/* Security Notice */}
          <SecurityNotice
            message="🔒 Your document is processed locally on this device. No data is transmitted to external servers."
            variant="success"
          />
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
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
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
  formSection: {
    marginBottom: 32,
  },
  dropdownGroup: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
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
    color: '#1E293B',
  },
  ratingGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
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
    fontWeight: '500',
    color: '#EF4444',
  },
});