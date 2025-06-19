// src/components/common/Input.tsx

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Animated,
} from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleFocus = (event: any) => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onBlur?.(event);
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  const shadowOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.15],
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          {
            borderColor,
            shadowOpacity,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 12,
            elevation: isFocused ? 4 : 0,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={colors.textTertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: typography.base,
    color: colors.text,
    paddingVertical: spacing.md,
  },
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  inputWithRightIcon: {
    marginRight: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
    marginTop: spacing.sm,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
});

export default Input;
