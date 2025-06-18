// src/utils/validation.ts

import {
  GiftCardFormData,
  ValidationError,
  FormValidationResult,
} from '../types';

export class ValidationUtils {
  static validateGiftCardForm(
    formData: GiftCardFormData,
  ): FormValidationResult {
    const errors: ValidationError[] = [];

    // Validate brand
    if (!formData.brand?.trim()) {
      errors.push({
        field: 'brand',
        message: 'Brand name is required',
      });
    } else if (formData.brand.trim().length < 2) {
      errors.push({
        field: 'brand',
        message: 'Brand name must be at least 2 characters',
      });
    } else if (formData.brand.trim().length > 50) {
      errors.push({
        field: 'brand',
        message: 'Brand name must be less than 50 characters',
      });
    }

    // Validate amount
    if (!formData.amount?.trim()) {
      errors.push({
        field: 'amount',
        message: 'Amount is required',
      });
    } else {
      const amount = parseFloat(formData.amount.trim());
      if (isNaN(amount)) {
        errors.push({
          field: 'amount',
          message: 'Amount must be a valid number',
        });
      } else if (amount <= 0) {
        errors.push({
          field: 'amount',
          message: 'Amount must be greater than $0',
        });
      } else if (amount > 10000) {
        errors.push({
          field: 'amount',
          message: 'Amount must be less than $10,000',
        });
      } else if (!/^\d+(\.\d{1,2})?$/.test(formData.amount.trim())) {
        errors.push({
          field: 'amount',
          message: 'Amount can have maximum 2 decimal places',
        });
      }
    }

    // Validate expiration date
    if (!formData.expirationDate?.trim()) {
      errors.push({
        field: 'expirationDate',
        message: 'Expiration date is required',
      });
    } else {
      const expirationDate = new Date(formData.expirationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day

      if (isNaN(expirationDate.getTime())) {
        errors.push({
          field: 'expirationDate',
          message: 'Invalid expiration date',
        });
      } else if (expirationDate < today) {
        errors.push({
          field: 'expirationDate',
          message: 'Expiration date cannot be in the past',
        });
      } else {
        // Check if expiration date is too far in the future (10 years)
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 10);
        if (expirationDate > maxDate) {
          errors.push({
            field: 'expirationDate',
            message:
              'Expiration date cannot be more than 10 years in the future',
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static getErrorForField(
    errors: ValidationError[],
    fieldName: string,
  ): string | undefined {
    const error = errors.find(err => err.field === fieldName);
    return error?.message;
  }

  static formatCurrency(amount: string): string {
    // Remove non-numeric characters except decimal point
    const cleaned = amount.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }

    return cleaned;
  }

  static formatBrandName(brand: string): string {
    // Capitalize first letter of each word
    return brand
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  static isValidAmount(amount: string): boolean {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0 && num <= 10000;
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ');
  }
}
