// src/components/common/DatePickerInput.tsx

import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '../../constants/theme';
import { format } from 'date-fns';

interface DatePickerInputProps {
  label?: string;
  value: Date | undefined;
  onDateChange: (date: Date) => void;
  error?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onDateChange,
  error,
  placeholder = 'Select date',
  minimumDate,
  maximumDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setIsOpen(false);
    onDateChange(selectedDate);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const formatDisplayDate = (date: Date | undefined) => {
    if (!date) return placeholder;
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[styles.inputContainer, error && styles.inputError]}
      >
        <View style={styles.contentContainer}>
          <Icon
            name="calendar-today"
            size={20}
            color={value ? colors.primary : colors.textTertiary}
            style={styles.icon}
          />
          <Text style={[styles.dateText, !value && styles.placeholderText]}>
            {formatDisplayDate(value)}
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color={colors.textTertiary} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <DatePicker
        modal
        open={isOpen}
        date={value || new Date()}
        mode="date"
        title="Select Expiration Date"
        confirmText="Confirm"
        cancelText="Cancel"
        minimumDate={minimumDate || new Date()}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        theme="light"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md + 2, // Match Input component height
    minHeight: 52,
  },
  inputError: {
    borderColor: colors.error,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: spacing.sm,
  },
  dateText: {
    fontSize: typography.base,
    color: colors.text,
    flex: 1,
  },
  placeholderText: {
    color: colors.textTertiary,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default DatePickerInput;
