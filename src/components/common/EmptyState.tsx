// src/components/common/EmptyState.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CreditCardIcon, PlusIcon } from './CustomIcons';
import Button from './Button';
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '../../constants/theme';

interface EmptyStateProps {
  icon?: 'credit-card' | 'user' | 'settings';
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
  const getIconComponent = () => {
    switch (icon) {
      case 'credit-card':
      default:
        return <CreditCardIcon size={64} color={colors.textTertiary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{getIconComponent()}</View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {buttonText && onButtonPress && (
        <Button
          title={buttonText}
          onPress={onButtonPress}
          size="large"
          style={styles.button}
          leftIcon={<PlusIcon size={20} color={colors.white} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing['2xl'],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
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
    lineHeight: typography.base * 1.5,
    marginBottom: spacing.xl,
    maxWidth: 280,
  },
  button: {
    minWidth: 200,
  },
});

export default EmptyState;
