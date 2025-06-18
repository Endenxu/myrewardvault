// src/components/common/Button.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  fullWidth = false,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 36,
          paddingHorizontal: spacing.md,
          fontSize: typography.sm,
        };
      case 'large':
        return {
          height: 52,
          paddingHorizontal: spacing.xl,
          fontSize: typography.lg,
        };
      default:
        return {
          height: 44,
          paddingHorizontal: spacing.lg,
          fontSize: typography.base,
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: colors.text,
      ...shadows.none,
    };

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          textColor: colors.text,
          ...shadows.sm,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: colors.primary,
          borderWidth: 2,
          textColor: colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          textColor: colors.primary,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: colors.error,
          borderColor: colors.error,
          borderWidth: 1,
          textColor: colors.white,
          ...shadows.sm,
        };
      default: // primary
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          borderWidth: 1,
          textColor: colors.white,
          ...shadows.sm,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const getDisabledStyles = () => {
    if (!disabled) return variantStyles;

    return {
      ...variantStyles,
      backgroundColor:
        variant === 'ghost' || variant === 'outline'
          ? 'transparent'
          : colors.border,
      borderColor: colors.border,
      textColor: colors.textTertiary,
      ...shadows.none,
    };
  };

  const finalStyles = getDisabledStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: finalStyles.backgroundColor,
          borderColor: finalStyles.borderColor,
          borderWidth: finalStyles.borderWidth,
          width: fullWidth ? '100%' : undefined,
          shadowOffset: finalStyles.shadowOffset,
          shadowOpacity: finalStyles.shadowOpacity,
          shadowRadius: finalStyles.shadowRadius,
          elevation: finalStyles.elevation,
        },
        style,
      ]}
      activeOpacity={disabled ? 1 : 0.8}
    >
      {leftIcon && !loading && <View style={styles.leftIcon}>{leftIcon}</View>}

      {loading ? (
        <ActivityIndicator
          size="small"
          color={finalStyles.textColor}
          style={styles.loader}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: sizeStyles.fontSize,
              color: finalStyles.textColor,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}

      {rightIcon && !loading && (
        <View style={styles.rightIcon}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    minWidth: 80,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  loader: {
    marginHorizontal: spacing.sm,
  },
});

export default Button;
