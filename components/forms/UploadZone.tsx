import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Upload, Image as ImageIcon, X, CircleCheck as CheckCircle } from 'lucide-react-native';

interface UploadZoneProps {
  selectedImage: string | null;
  onImagePick: () => void;
  onImageRemove: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  formatText?: string;
}

export default function UploadZone({
  selectedImage,
  onImagePick,
  onImageRemove,
  title = "Drag and drop your bill here",
  subtitle = "or",
  buttonText = "Upload from Gallery",
  formatText = "Supports PDF, JPG, PNG (max 16MB)"
}: UploadZoneProps) {
  if (selectedImage) {
    return (
      <View style={styles.imagePreview}>
        <Image
          source={{ uri: selectedImage }}
          style={styles.previewImage}
          onError={(error) => {
            console.log('Image load error:', error);
            // Handle image load error gracefully
          }}
        />
        <TouchableOpacity style={styles.removeButton} onPress={onImageRemove}>
          <X size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.previewOverlay}>
          <CheckCircle size={24} color="#059669" />
          <Text style={styles.previewText}>Bill uploaded successfully</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.uploadZone} onPress={onImagePick}>
      <Upload size={48} color="#64748B" />
      <Text style={styles.uploadTitle}>{title}</Text>
      <Text style={styles.uploadSubtitle}>{subtitle}</Text>
      <View style={styles.uploadButton}>
        <ImageIcon size={20} color="#2563EB" />
        <Text style={styles.uploadButtonText}>{buttonText}</Text>
      </View>
      <Text style={styles.formatText}>{formatText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: '500',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
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
    fontWeight: '500',
    marginLeft: 8,
  },
  formatText: {
    fontSize: 12,
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
    fontWeight: '500',
    marginLeft: 8,
  },
});