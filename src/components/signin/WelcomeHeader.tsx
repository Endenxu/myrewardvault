// src/components/signin/WelcomeHeader.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography, spacing } from '../../constants/theme';

interface WelcomeHeaderProps {
  title: string;
  subtitle: string;
}

// Custom Wallet Icon Component
const WalletIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = colors.white,
}) => {
  return (
    <View style={[styles.walletContainer, { width: size, height: size }]}>
      {/* Wallet Body */}
      <View
        style={[
          styles.walletBody,
          {
            width: size * 0.75,
            height: size * 0.55,
            borderRadius: size * 0.08,
          },
        ]}
      />

      {/* Wallet Flap */}
      <View
        style={[
          styles.walletFlap,
          {
            width: size * 0.75,
            height: size * 0.25,
            top: size * 0.1,
            borderRadius: size * 0.08,
          },
        ]}
      />

      {/* Card slots */}
      <View
        style={[
          styles.cardSlot1,
          {
            width: size * 0.45,
            height: size * 0.08,
            top: size * 0.35,
            left: size * 0.15,
            borderRadius: size * 0.02,
          },
        ]}
      />

      <View
        style={[
          styles.cardSlot2,
          {
            width: size * 0.35,
            height: size * 0.06,
            top: size * 0.48,
            left: size * 0.2,
            borderRadius: size * 0.015,
          },
        ]}
      />

      {/* Money peek */}
      <View
        style={[
          styles.moneyPeek,
          {
            width: size * 0.25,
            height: size * 0.04,
            top: size * 0.15,
            right: size * 0.18,
            borderRadius: size * 0.01,
          },
        ]}
      />
    </View>
  );
};

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      {/* Icon Container with Gradient Background */}
      <View style={styles.iconWrapper}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#A855F7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconGradient}
        >
          <WalletIcon size={48} />

          {/* Floating elements for added visual interest */}
          <View style={styles.floatingDot1} />
          <View style={styles.floatingDot2} />
          <View style={styles.floatingDot3} />
        </LinearGradient>

        {/* Glow effect */}
        <View style={styles.glowEffect} />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: spacing.xl,
  },
  iconGradient: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 34,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    zIndex: -1,
  },
  walletContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletBody: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  walletFlap: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardSlot1: {
    position: 'absolute',
    backgroundColor: 'rgba(99, 102, 241, 0.7)',
  },
  cardSlot2: {
    position: 'absolute',
    backgroundColor: 'rgba(139, 92, 246, 0.7)',
  },
  moneyPeek: {
    position: 'absolute',
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
  },
  floatingDot1: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  floatingDot2: {
    position: 'absolute',
    bottom: 12,
    left: 8,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  floatingDot3: {
    position: 'absolute',
    top: 20,
    left: 16,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: typography['4xl'],
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: typography['4xl'] * 1.1,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lg * 1.4,
    maxWidth: 320,
    fontWeight: '400',
  },
});

export default WelcomeHeader;
