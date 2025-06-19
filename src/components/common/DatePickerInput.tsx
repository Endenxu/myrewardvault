// src/components/common/DatePickerInput.tsx

import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { CalendarIcon, ChevronRightIcon } from './CustomIcons';
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
  placeholder = 'Select expiration date',
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
    return format(date, 'EEEE, MMMM dd, yyyy');
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[styles.inputContainer, error && styles.inputError]}
        activeOpacity={0.7}
      >
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <CalendarIcon
              size={20}
              color={value ? colors.primary : colors.textSecondary}
            />
          </View>
          <Text style={[styles.dateText, !value && styles.placeholderText]}>
            {formatDisplayDate(value)}
          </Text>
        </View>
        <ChevronRightIcon size={16} color={colors.textSecondary} />
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
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
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
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: `${colors.error}05`,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: typography.base,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});

export default DatePickerInput;
