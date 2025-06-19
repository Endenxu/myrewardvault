// src/components/modals/EditGiftCardModal.tsx - Clean Header Design
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
import { EditIcon, CloseIcon } from '../common/CustomIcons';
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
        {/* Clean Header Design */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <EditIcon size={24} color={colors.primary} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Edit Gift Card</Text>
                <Text style={styles.headerSubtitle}>{card.brand}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

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
    backgroundColor: colors.surface,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.sm,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xl,
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
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceVariant,
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
