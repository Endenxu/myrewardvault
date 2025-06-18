// src/components/modals/GiftCardDetailModal.tsx

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
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
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
      onClose(); // Close the detail modal after deletion
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
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color={colors.white} />
              </TouchableOpacity>

              <View style={styles.headerCenter}>
                <Text style={styles.headerTitle}>Gift Card Details</Text>
                <Text style={styles.headerSubtitle}>{card.brand}</Text>
              </View>

              <TouchableOpacity
                onPress={handleShare}
                style={styles.shareButton}
              >
                <Icon name="share" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

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
    backgroundColor: colors.surface,
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.white,
    opacity: 0.8,
    marginTop: 2,
    textAlign: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});

export default GiftCardDetailModal;
