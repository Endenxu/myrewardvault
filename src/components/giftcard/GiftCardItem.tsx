// src/components/giftcard/GiftCardItem.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  TrashIcon,
  ClockIcon,
  ChevronRightIcon,
  AlertCircleIcon,
  CalendarIcon,
} from '../common/CustomIcons';
import { GiftCard } from '../../types';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';
import { format } from 'date-fns';
import { getBrandGradient } from '../../constants/brands';

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
    return getBrandGradient(card.brand);
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
      return {
        text: 'Expired',
        color: '#FF6B6B',
        IconComponent: AlertCircleIcon,
      };
    }

    const daysLeft = getDaysUntilExpiration();
    if (daysLeft <= 7) {
      return {
        text: `${daysLeft} days left`,
        color: '#FFB84D',
        IconComponent: ClockIcon,
      };
    } else if (daysLeft <= 30) {
      return {
        text: `${daysLeft} days left`,
        color: '#FFB84D',
        IconComponent: ClockIcon,
      };
    }

    return {
      text: formatDate(card.expirationDate),
      color: 'rgba(255, 255, 255, 0.8)',
      IconComponent: CalendarIcon,
    };
  };

  const expirationStatus = getExpirationStatus();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={getCardGradient()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.cardContent}>
          {/* Header with better alignment */}
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
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <TrashIcon size={18} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Amount with better spacing */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{formatCurrency(card.amount)}</Text>
          </View>

          {/* Footer with proper alignment */}
          <View style={styles.footer}>
            <View style={styles.expirationContainer}>
              <expirationStatus.IconComponent
                size={14}
                color={expirationStatus.color}
              />
              <Text
                style={[
                  styles.expirationText,
                  { color: expirationStatus.color },
                ]}
              >
                {expirationStatus.text}
              </Text>
            </View>

            <ChevronRightIcon size={20} color="rgba(255, 255, 255, 0.8)" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    ...shadows.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  gradient: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  cardContent: {
    padding: spacing.lg,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    minHeight: 32,
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.sm,
  },
  brandText: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.white,
    flex: 1,
    lineHeight: typography.lg * 1.2,
  },
  expiredBadge: {
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  expiredText: {
    fontSize: typography.xs,
    fontWeight: '700',
    color: colors.white,
  },
  deleteButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    minHeight: 36,
  },
  amountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  amountText: {
    fontSize: typography['3xl'],
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    lineHeight: typography['3xl'] * 1.1,
    letterSpacing: -0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 24,
  },
  expirationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expirationText: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.white,
    marginLeft: spacing.xs,
  },
});

export default GiftCardItem;
