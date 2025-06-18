// src/components/signin/WelcomeHeader.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';

interface WelcomeHeaderProps {
  title: string;
  subtitle: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: typography['3xl'],
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.lg,
  },
});

export default WelcomeHeader;
