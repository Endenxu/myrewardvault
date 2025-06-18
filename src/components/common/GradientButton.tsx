// src/components/common/GradientButton.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
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
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'secondary':
        return [colors.secondary, '#A855F7'];
      case 'accent':
        return [colors.accent, '#0891B2'];
      default:
        return [colors.primary, colors.secondary];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 40,
          paddingHorizontal: spacing.md,
          fontSize: typography.sm,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: spacing.xl,
          fontSize: typography.lg,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: spacing.lg,
          fontSize: typography.base,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.container, { opacity: disabled ? 0.6 : 1 }, style]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          {
            height: sizeStyles.height,
            paddingHorizontal: sizeStyles.paddingHorizontal,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text
          style={[
            styles.text,
            {
              fontSize: sizeStyles.fontSize,
            },
            textStyle,
          ]}
        >
          {loading ? 'Loading...' : title}
        </Text>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    ...shadows.md,
    shadowColor: colors.primary,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },
  text: {
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});

export default GradientButton;
