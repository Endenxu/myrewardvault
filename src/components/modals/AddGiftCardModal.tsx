// src/components/modals/AddGiftCardModal.tsx

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
import { CreditCardIcon, CloseIcon } from '../common/CustomIcons';
import GiftCardForm from '../giftcard/GiftCardForm';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

interface AddGiftCardModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddGiftCardModal: React.FC<AddGiftCardModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
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
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <CreditCardIcon size={24} color={colors.primary} />
              </View>
              <Text style={styles.headerTitle}>Add Gift Card</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* keyboard handling */}
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.formWrapper}>
            <GiftCardForm onSuccess={handleSuccess} onCancel={onClose} />
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
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.text,
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

export default AddGiftCardModal;
