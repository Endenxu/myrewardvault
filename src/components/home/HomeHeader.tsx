// src/components/home/HomeHeader.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '../../constants/theme';

interface HomeHeaderProps {
  userName?: string | null;
  totalValue: number;
  cardCount: number;
  expiredCount: number;
  onSearchPress: () => void;
  onSortPress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  totalValue,
  cardCount,
  expiredCount,
  onSearchPress,
  onSortPress,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top row with greeting and actions */}
      <View style={styles.topRow}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          {userName && <Text style={styles.userName}>{userName}</Text>}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onSearchPress} style={styles.actionButton}>
            <Icon name="search" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSortPress} style={styles.actionButton}>
            <Icon name="sort" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatCurrency(totalValue)}</Text>
          <Text style={styles.statLabel}>Total Value</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{cardCount}</Text>
          <Text style={styles.statLabel}>Cards</Text>
        </View>

        {expiredCount > 0 && (
          <>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, styles.expiredValue]}>
                {expiredCount}
              </Text>
              <Text style={styles.statLabel}>Expired</Text>
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.base,
    color: colors.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: typography['2xl'],
    fontWeight: '700',
    color: colors.white,
    marginTop: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: spacing.md,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  expiredValue: {
    color: '#FFB3B3',
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.white,
    opacity: 0.8,
  },
});

export default HomeHeader;
