// src/components/giftcard/GiftCardItem.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { GiftCard } from '../../types';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';
import { format } from 'date-fns';

interface GiftCardItemProps {
  card: GiftCard;
  onPress: () => void;
  onDelete: () => void;
}

const GiftCardItem: React.FC<GiftCardItemProps> = ({
  card,
  onPress,
  onDelete,
}) => {
  const handleDeletePress = () => {
    Alert.alert(
      'Delete Gift Card',
      `Are you sure you want to delete the ${card.brand} gift card?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ],
    );
  };

  const getCardGradient = () => {
    // Simple gradient selection based on brand name
    const brandLower = card.brand.toLowerCase();
    if (brandLower.includes('amazon')) return ['#FF9900', '#FF7700'];
    if (brandLower.includes('apple')) return ['#000000', '#333333'];
    if (brandLower.includes('google')) return ['#4285F4', '#34A853'];
    if (brandLower.includes('starbucks')) return ['#00704A', '#003D21'];
    if (brandLower.includes('target')) return ['#CC0000', '#990000'];
    if (brandLower.includes('walmart')) return ['#004C91', '#0071CE'];

    // Default gradient
    return [colors.primary, colors.secondary];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getDaysUntilExpiration = () => {
    const now = new Date();
    const expiration = new Date(card.expirationDate);
    const diffTime = expiration.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpirationStatus = () => {
    if (card.isExpired) {
      return { text: 'Expired', color: colors.error };
    }

    const daysLeft = getDaysUntilExpiration();
    if (daysLeft <= 7) {
      return { text: `${daysLeft} days left`, color: colors.warning };
    } else if (daysLeft <= 30) {
      return { text: `${daysLeft} days left`, color: colors.warning };
    }

    return {
      text: formatDate(card.expirationDate),
      color: colors.textSecondary,
    };
  };

  const expirationStatus = getExpirationStatus();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getCardGradient()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.cardContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <Text style={styles.brandText} numberOfLines={1}>
                {card.brand}
              </Text>
              {card.isExpired && (
                <View style={styles.expiredBadge}>
                  <Text style={styles.expiredText}>EXPIRED</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={handleDeletePress}
              style={styles.deleteButton}
            >
              <Icon name="delete" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Amount */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{formatCurrency(card.amount)}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.expirationContainer}>
              <Icon name="schedule" size={16} color={colors.white} />
              <Text
                style={[
                  styles.expirationText,
                  { color: expirationStatus.color },
                ]}
              >
                {expirationStatus.text}
              </Text>
            </View>

            <Icon name="chevron-right" size={20} color={colors.white} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  gradient: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  cardContent: {
    padding: spacing.lg,
    minHeight: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.white,
    flex: 1,
  },
  expiredBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  expiredText: {
    fontSize: typography.xs,
    fontWeight: '600',
    color: colors.white,
  },
  deleteButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  amountContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  amountText: {
    fontSize: typography['3xl'],
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expirationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expirationText: {
    fontSize: typography.sm,
    fontWeight: '500',
    marginLeft: spacing.xs,
    color: colors.white,
  },
});

export default GiftCardItem;
