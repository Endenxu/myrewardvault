// src/components/common/FloatingActionButton.tsx

import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PlusIcon, EditIcon } from './CustomIcons';
import { colors, spacing } from '../../constants/theme';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: 'add' | 'edit';
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'add',
  size = 64,
  style,
  disabled = false,
}) => {
  const getIconComponent = () => {
    const iconSize = size * 0.35;
    const iconColor = colors.white;

    switch (icon) {
      case 'edit':
        return <EditIcon size={iconSize} color={iconColor} />;
      case 'add':
      default:
        return <PlusIcon size={iconSize} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: disabled ? 0.6 : 1,
          bottom: spacing.xl + 80,
          right: spacing.lg,
        },
        style,
      ]}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        {getIconComponent()}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default FloatingActionButton;
