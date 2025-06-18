// src/components/modals/EditGiftCardModal.tsx

import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import GiftCardForm from '../giftcard/GiftCardForm';
import { GiftCard, GiftCardFormData } from '../../types';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

interface EditGiftCardModalProps {
  visible: boolean;
  card: GiftCard | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditGiftCardModal: React.FC<EditGiftCardModalProps> = ({
  visible,
  card,
  onClose,
  onSuccess,
}) => {
  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  const getInitialData = (): Partial<GiftCardFormData> | undefined => {
    if (!card) return undefined;

    return {
      brand: card.brand,
      amount: card.amount.toString(),
      expirationDate: card.expirationDate,
    };
  };

  if (!card) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Icon name="edit" size={24} color={colors.white} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Edit Gift Card</Text>
                <Text style={styles.headerSubtitle}>{card.brand}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Content */}
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={styles.formWrapper}>
            <GiftCardForm
              onSuccess={handleSuccess}
              onCancel={onClose}
              initialData={getInitialData()}
              isEditing={true}
              cardId={card.id}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.white,
    opacity: 0.8,
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default EditGiftCardModal;
