// src/components/common/FloatingActionButton.tsx

import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'add',
  size = 56,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Icon name={icon} size={size * 0.4} color={colors.white} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    ...shadows.lg,
    shadowColor: colors.primary,
    elevation: 8,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingActionButton;
