import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface InputGroupProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: typeof LucideIcon;
  isRequired?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  editable?: boolean;
}

export default function InputGroup({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  isRequired = false,
  error,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
}: InputGroupProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {isRequired && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={[styles.input, !Icon && styles.inputNoIcon]}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
        {Icon && <Icon size={20} color="#64748B" />}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
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
  inputError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1E293B',
  },
  inputNoIcon: {
    paddingRight: 0,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});