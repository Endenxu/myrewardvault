// src/components/giftcard/GiftCardDetails.tsx

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
import { format, formatDistanceToNow, isPast } from 'date-fns';

interface GiftCardDetailsProps {
  card: GiftCard;
  onEdit: () => void;
  onDelete: () => void;
  onShare?: () => void;
}

const GiftCardDetails: React.FC<GiftCardDetailsProps> = ({
  card,
  onEdit,
  onDelete,
  onShare,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
  };

  const getExpirationInfo = () => {
    const expirationDate = new Date(card.expirationDate);
    const isExpired = isPast(expirationDate);

    if (isExpired) {
      const timeAgo = formatDistanceToNow(expirationDate, { addSuffix: true });
      return {
        text: `Expired ${timeAgo}`,
        color: colors.error,
        icon: 'error',
      };
    }

    const timeUntil = formatDistanceToNow(expirationDate, { addSuffix: true });
    const daysUntil = Math.ceil(
      (expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntil <= 7) {
      return {
        text: `Expires ${timeUntil}`,
        color: colors.error,
        icon: 'warning',
      };
    } else if (daysUntil <= 30) {
      return {
        text: `Expires ${timeUntil}`,
        color: colors.warning,
        icon: 'schedule',
      };
    }

    return {
      text: `Expires ${timeUntil}`,
      color: colors.success,
      icon: 'check-circle',
    };
  };

  const getCardGradient = () => {
    const brandLower = card.brand.toLowerCase();
    if (brandLower.includes('amazon')) return ['#FF9900', '#FF7700'];
    if (brandLower.includes('apple')) return ['#000000', '#333333'];
    if (brandLower.includes('google')) return ['#4285F4', '#34A853'];
    if (brandLower.includes('starbucks')) return ['#00704A', '#003D21'];
    if (brandLower.includes('target')) return ['#CC0000', '#990000'];
    if (brandLower.includes('walmart')) return ['#004C91', '#0071CE'];
    return [colors.primary, colors.secondary];
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Gift Card',
      `Are you sure you want to delete the ${card.brand} gift card? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ],
    );
  };

  const expirationInfo = getExpirationInfo();

  return (
    <View style={styles.container}>
      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <LinearGradient
          colors={getCardGradient()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardBrand}>{card.brand}</Text>
            <Text style={styles.cardAmount}>{formatCurrency(card.amount)}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardExpiry}>
                Expires {format(new Date(card.expirationDate), 'MM/yy')}
              </Text>
              {card.isExpired && (
                <View style={styles.expiredBadge}>
                  <Text style={styles.expiredBadgeText}>EXPIRED</Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Card Information */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Card Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Icon name="store" size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Brand</Text>
            <Text style={styles.infoValue}>{card.brand}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Icon name="attach-money" size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Amount</Text>
            <Text style={styles.infoValue}>{formatCurrency(card.amount)}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIconContainer,
              { backgroundColor: `${expirationInfo.color}15` },
            ]}
          >
            <Icon
              name={expirationInfo.icon}
              size={20}
              color={expirationInfo.color}
            />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Expiration</Text>
            <Text style={styles.infoValue}>
              {formatDate(card.expirationDate)}
            </Text>
            <Text
              style={[styles.expirationStatus, { color: expirationInfo.color }]}
            >
              {expirationInfo.text}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Icon name="date-range" size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Added</Text>
            <Text style={styles.infoValue}>{formatDate(card.createdAt)}</Text>
          </View>
        </View>

        {card.updatedAt !== card.createdAt && (
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Icon name="edit" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>{formatDate(card.updatedAt)}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Icon name="edit" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Edit Card</Text>
        </TouchableOpacity>

        {onShare && (
          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Icon name="share" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDeletePress}
        >
          <Icon name="delete" size={20} color={colors.error} />
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
            Delete Card
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardPreview: {
    margin: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  cardGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    minHeight: 180,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardBrand: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.md,
  },
  cardAmount: {
    fontSize: typography['4xl'],
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardExpiry: {
    fontSize: typography.sm,
    color: colors.white,
    opacity: 0.9,
  },
  expiredBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  expiredBadgeText: {
    fontSize: typography.xs,
    fontWeight: '600',
    color: colors.white,
  },
  infoSection: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.text,
  },
  expirationStatus: {
    fontSize: typography.sm,
    fontWeight: '500',
    marginTop: spacing.xs,
  },
  actionSection: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  actionButtonText: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing.md,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: `${colors.error}30`,
  },
  deleteButtonText: {
    color: colors.error,
  },
});

export default GiftCardDetails;
