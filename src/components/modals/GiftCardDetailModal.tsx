// src/components/modals/GiftCardDetailModal.tsx - Clean Header Design
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, ShareIcon } from '../common/CustomIcons';
import GiftCardDetails from '../giftcard/GiftCardDetails';
import EditGiftCardModal from './EditGiftCardModal';
import { GiftCard } from '../../types';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

interface GiftCardDetailModalProps {
  visible: boolean;
  card: GiftCard | null;
  onClose: () => void;
  onDelete: (cardId: string) => void;
  onUpdate: () => void;
}

const GiftCardDetailModal: React.FC<GiftCardDetailModalProps> = ({
  visible,
  card,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    onUpdate();
    Alert.alert('Success', 'Gift card updated successfully!');
  };

  const handleDelete = async () => {
    if (!card) return;

    try {
      await onDelete(card.id);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete gift card');
    }
  };

  const handleShare = async () => {
    if (!card) return;

    try {
      const message = `Gift Card: ${card.brand}\nAmount: $${
        card.amount
      }\nExpires: ${new Date(card.expirationDate).toLocaleDateString()}`;

      await Share.share({
        message,
        title: `${card.brand} Gift Card`,
      });
    } catch (error) {
      console.error('Error sharing gift card:', error);
      Alert.alert('Error', 'Failed to share gift card');
    }
  };

  if (!card) return null;

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          {/* Clean Header Design */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <ArrowLeftIcon size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <View style={styles.headerCenter}>
                <Text style={styles.headerTitle}>Gift Card Details</Text>
                <Text style={styles.headerSubtitle}>{card.brand}</Text>
              </View>

              <TouchableOpacity
                onPress={handleShare}
                style={styles.shareButton}
              >
                <ShareIcon size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <GiftCardDetails
              card={card}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Edit Modal */}
      <EditGiftCardModal
        visible={showEditModal}
        card={card}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...shadows.sm,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default GiftCardDetailModal;
