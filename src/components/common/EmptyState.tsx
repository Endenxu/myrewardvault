// src/components/common/EmptyState.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GradientButton from './GradientButton';
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '../../constants/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'credit-card',
  title,
  subtitle,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={80} color={colors.textTertiary} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {buttonText && onButtonPress && (
        <GradientButton
          title={buttonText}
          onPress={onButtonPress}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing['2xl'],
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography['2xl'],
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.base,
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 200,
  },
});

export default EmptyState;
