// src/components/giftcard/GiftCardDetails.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GiftCard } from '../../types';
import {
  TagIcon,
  DollarSignIcon,
  CalendarXIcon,
  PlusCircleIcon,
  EditIcon,
  TrashIcon,
  WarningIcon,
  CheckCircleIcon,
  ClockIcon,
  SparkleIcon,
} from '../common/CustomIcons';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';
import { format, formatDistanceToNow, isPast } from 'date-fns';
import { getBrandGradient } from '../../constants/brands';

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
        icon: WarningIcon,
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
        icon: WarningIcon,
      };
    } else if (daysUntil <= 30) {
      return {
        text: `Expires ${timeUntil}`,
        color: colors.warning,
        icon: ClockIcon,
      };
    }

    return {
      text: `Expires ${timeUntil}`,
      color: colors.success,
      icon: CheckCircleIcon,
    };
  };

  const getCardGradient = () => {
    return getBrandGradient(card.brand);
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
  const ExpirationIcon = expirationInfo.icon;

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
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardBrand}>{card.brand}</Text>
              <View style={styles.cardHeaderIcons}>
                <SparkleIcon size={20} color="rgba(255, 255, 255, 0.8)" />
              </View>
            </View>

            {/* Amount Section */}
            <View style={styles.cardAmountSection}>
              <Text style={styles.cardAmount}>
                {formatCurrency(card.amount)}
              </Text>
              {card.isExpired && (
                <View style={styles.expiredOverlay}>
                  <View style={styles.expiredBadge}>
                    <Text style={styles.expiredBadgeText}>EXPIRED</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Card Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.cardExpirySection}>
                <Text style={styles.cardExpiry}>
                  Expires {format(new Date(card.expirationDate), 'MM/yy')}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardOverlay} />
        </LinearGradient>
      </View>

      {/* Card Information  */}
      <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
          <Text style={styles.sectionTitle}>Card Information</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletePress}
            activeOpacity={0.7}
          >
            <TrashIcon size={18} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <TagIcon size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Brand</Text>
            <Text style={styles.infoValue}>{card.brand}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <DollarSignIcon size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Amount</Text>
            <Text style={styles.infoValue}>{formatCurrency(card.amount)}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <ExpirationIcon size={20} color={colors.primary} />
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
            <PlusCircleIcon size={20} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Added</Text>
            <Text style={styles.infoValue}>{formatDate(card.createdAt)}</Text>
          </View>
        </View>

        {card.updatedAt !== card.createdAt && (
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <EditIcon size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>{formatDate(card.updatedAt)}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardPreview: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  cardGradient: {
    borderRadius: borderRadius.xl,
    minHeight: 220,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  cardBrand: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardHeaderIcons: {
    opacity: 0.8,
  },
  cardAmountSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardAmount: {
    fontSize: typography['5xl'],
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: -1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  expiredOverlay: {
    position: 'absolute',
    top: -spacing.md,
    right: -spacing.md,
  },
  expiredBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  expiredBadgeText: {
    fontSize: typography.sm,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardExpirySection: {
    flex: 1,
  },
  cardExpiry: {
    fontSize: typography.base,
    color: colors.white,
    opacity: 0.9,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  infoSection: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
    paddingTop: spacing.xs,
  },
  infoLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.text,
    lineHeight: typography.base * 1.3,
  },
  expirationStatus: {
    fontSize: typography.sm,
    fontWeight: '500',
    marginTop: spacing.xs,
  },
});

export default GiftCardDetails;
