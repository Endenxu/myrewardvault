// src/components/modals/AddGiftCardModal.tsx

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
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Icon name="add-card" size={24} color={colors.white} />
              </View>
              <Text style={styles.headerTitle}>Add Gift Card</Text>
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
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.white,
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

export default AddGiftCardModal;
