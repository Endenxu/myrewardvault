// src/components/giftcard/GiftCardForm.tsx

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useGiftCards } from '../../hooks/useGiftCards';
import Input from '../common/Input';
import DatePickerInput from '../common/DatePickerInput';
import { GiftCardFormData, ValidationError } from '../../types';
import { ValidationUtils } from '../../utils/validation';
import { spacing } from '../../constants/theme';
import Button from '../common/Button';

interface GiftCardFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Partial<GiftCardFormData>;
  isEditing?: boolean;
  cardId?: string;
}

const GiftCardForm: React.FC<GiftCardFormProps> = ({
  onSuccess,
  onCancel,
  initialData,
  isEditing = false,
  cardId,
}) => {
  const { addCard, updateCard, loading } = useGiftCards();

  // Form state
  const [formData, setFormData] = useState<GiftCardFormData>({
    brand: initialData?.brand || '',
    amount: initialData?.amount || '',
    expirationDate: initialData?.expirationDate || '',
  });

  // Validation state
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Date picker state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData?.expirationDate
      ? new Date(initialData.expirationDate)
      : undefined,
  );

  const handleInputChange = useCallback(
    (field: keyof GiftCardFormData, value: string) => {
      let processedValue = value;

      // Format specific fields
      if (field === 'brand') {
        processedValue = ValidationUtils.sanitizeInput(value);
      } else if (field === 'amount') {
        processedValue = ValidationUtils.formatCurrency(value);
      }

      setFormData(prev => ({
        ...prev,
        [field]: processedValue,
      }));

      // Clear field error when user starts typing
      if (errors.length > 0) {
        setErrors(prev => prev.filter(error => error.field !== field));
      }
    },
    [errors],
  );

  const handleInputBlur = useCallback(
    (field: keyof GiftCardFormData) => {
      setTouched(prev => ({ ...prev, [field]: true }));

      // Format brand name on blur
      if (field === 'brand' && formData.brand) {
        const formatted = ValidationUtils.formatBrandName(formData.brand);
        setFormData(prev => ({ ...prev, brand: formatted }));
      }
    },
    [formData.brand],
  );

  const handleBrandSuggestionSelect = useCallback(
    (brand: string) => {
      setFormData(prev => ({ ...prev, brand }));

      // Clear brand error when suggestion is selected
      if (errors.length > 0) {
        setErrors(prev => prev.filter(error => error.field !== 'brand'));
      }
    },
    [errors],
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setFormData(prev => ({
        ...prev,
        expirationDate: date.toISOString().split('T')[0],
      }));

      // Clear date error
      if (errors.length > 0) {
        setErrors(prev =>
          prev.filter(error => error.field !== 'expirationDate'),
        );
      }
    },
    [errors],
  );

  const validateAndSubmit = useCallback(async () => {
    // Validate form
    const validation = ValidationUtils.validateGiftCardForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({ brand: true, amount: true, expirationDate: true });

      // Show first error in alert
      const firstError = validation.errors[0];
      Alert.alert('Validation Error', firstError.message);
      return;
    }

    try {
      let success = false;

      if (isEditing && cardId) {
        success = await updateCard(cardId, formData);
      } else {
        success = await addCard(formData);
      }

      if (success) {
        Alert.alert(
          'Success',
          `Gift card ${isEditing ? 'updated' : 'added'} successfully!`,
          [{ text: 'OK', onPress: onSuccess }],
        );
      } else {
        Alert.alert(
          'Error',
          `Failed to ${isEditing ? 'update' : 'add'} gift card`,
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  }, [formData, addCard, updateCard, isEditing, cardId, onSuccess]);

  const getFieldError = useCallback(
    (field: string) => {
      if (!touched[field]) return undefined;
      return ValidationUtils.getErrorForField(errors, field);
    },
    [errors, touched],
  );

  const isFormValid = () => {
    return (
      formData.brand.trim() &&
      formData.amount.trim() &&
      formData.expirationDate.trim() &&
      ValidationUtils.isValidAmount(formData.amount)
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >
      <View style={styles.formContainer}>
        <Input
          label="Brand Name"
          placeholder="Select or type a brand name"
          value={formData.brand}
          onChangeText={text => handleInputChange('brand', text)}
          onBlur={() => handleInputBlur('brand')}
          error={getFieldError('brand')}
          autoCapitalize="words"
          maxLength={50}
          showSuggestions={true}
          onSuggestionSelect={handleBrandSuggestionSelect}
        />

        <Input
          label="Amount"
          placeholder="0.00"
          value={formData.amount}
          onChangeText={text => handleInputChange('amount', text)}
          onBlur={() => handleInputBlur('amount')}
          error={getFieldError('amount')}
          keyboardType="decimal-pad"
          maxLength={10}
          leftIcon={<Text style={styles.currencySymbol}>$</Text>}
        />

        <DatePickerInput
          label="Expiration Date"
          value={selectedDate}
          onDateChange={handleDateChange}
          error={getFieldError('expirationDate')}
          placeholder="Select expiration date"
          minimumDate={new Date()}
          maximumDate={(() => {
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() + 10);
            return maxDate;
          })()}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isEditing ? 'Update Card' : 'Add Card'}
            onPress={validateAndSubmit}
            loading={loading}
            disabled={!isFormValid() || loading}
            size="large"
            style={styles.submitButton}
          />

          <Button
            title="Cancel"
            onPress={onCancel}
            variant="secondary"
            disabled={loading}
            size="large"
            style={styles.cancelButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: spacing.lg,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  submitButton: {
    marginBottom: spacing.sm,
  },
  cancelButton: {
    marginBottom: spacing.lg,
  },
});

export default GiftCardForm;
