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
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success';
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
          borderRadius: borderRadius.md,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: spacing.xl,
          fontSize: typography.lg,
          borderRadius: borderRadius.xl,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: spacing.lg,
          fontSize: typography.base,
          borderRadius: borderRadius.lg,
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: colors.text,
      shadowColor: colors.black,
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
          shadowColor: colors.black,
          ...shadows.sm,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: colors.primary,
          borderWidth: 2,
          textColor: colors.primary,
          shadowColor: colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
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
          shadowColor: colors.error,
          ...shadows.sm,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: colors.success,
          borderColor: colors.success,
          borderWidth: 1,
          textColor: colors.white,
          shadowColor: colors.success,
          ...shadows.sm,
        };
      default: // primary
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          borderWidth: 1,
          textColor: colors.white,
          shadowColor: colors.primary,
          ...shadows.md,
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
          ? 'rgba(148, 163, 184, 0.1)'
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
          borderRadius: sizeStyles.borderRadius,
          width: fullWidth ? '100%' : undefined,
          shadowOffset: finalStyles.shadowOffset,
          shadowOpacity: finalStyles.shadowOpacity,
          shadowRadius: finalStyles.shadowRadius,
          shadowColor: finalStyles.shadowColor,
          elevation: finalStyles.elevation,
        },
        style,
      ]}
      activeOpacity={disabled ? 1 : 0.85}
    >
      {/* Subtle shine overlay for primary and success variants */}
      {(variant === 'primary' ||
        variant === 'success' ||
        variant === 'danger') && (
        <View
          style={[
            styles.shineOverlay,
            { borderRadius: sizeStyles.borderRadius },
          ]}
        />
      )}

      <View style={styles.contentContainer}>
        {leftIcon && !loading && (
          <View style={styles.leftIcon}>{leftIcon}</View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="small"
              color={finalStyles.textColor}
              style={styles.loader}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: sizeStyles.fontSize,
                  color: finalStyles.textColor,
                  marginLeft: spacing.sm,
                },
                textStyle,
              ]}
            >
              Loading...
            </Text>
          </View>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  shineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    flex: 0,
  },
  leftIcon: {
    marginRight: spacing.sm,
    flex: 0,
  },
  rightIcon: {
    marginLeft: spacing.sm,
    flex: 0,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
  },
  loader: {
    // No additional styles needed
  },
});

export default Button;
