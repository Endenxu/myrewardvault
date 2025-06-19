// src/components/common/Input.tsx

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';
import { getPopularBrands, searchBrands } from '../../constants/brands';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showSuggestions?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  onChangeText,
  value,
  showSuggestions = false,
  onSuggestionSelect,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleFocus = (event: any) => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (showSuggestions) {
      setShowSuggestionsList(true);
      updateSuggestions(value || '');
    }

    onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setShowSuggestionsList(false);
    }, 150);

    onBlur?.(event);
  };

  const updateSuggestions = (text: string) => {
    if (!text.trim()) {
      // Show popular brands when empty
      setFilteredSuggestions(getPopularBrands());
      return;
    }

    // Use the search function from brands config
    const matchingBrands = searchBrands(text);
    setFilteredSuggestions(matchingBrands.map(brand => brand.name));
  };

  const handleChangeText = (text: string) => {
    if (showSuggestions) {
      updateSuggestions(text);
    }
    onChangeText?.(text);
  };

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionSelect?.(suggestion);
    setShowSuggestionsList(false);
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  const shadowOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.15],
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          {
            borderColor,
            shadowOpacity,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 12,
            elevation: isFocused ? 4 : 0,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={colors.textTertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          value={value}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Scrollable Suggestions List */}
      {showSuggestions &&
        showSuggestionsList &&
        filteredSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <ScrollView
              style={styles.suggestionsScrollView}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {filteredSuggestions.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.suggestionItem,
                    index === filteredSuggestions.length - 1 &&
                      styles.lastSuggestionItem,
                  ]}
                  onPress={() => handleSuggestionPress(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    position: 'relative',
  },
  label: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: typography.base,
    color: colors.text,
    paddingVertical: spacing.md,
  },
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  inputWithRightIcon: {
    marginRight: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
    marginTop: spacing.sm,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xs,
    maxHeight: 240,
    zIndex: 1000,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  suggestionsScrollView: {
    maxHeight: 240,
  },
  suggestionItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  lastSuggestionItem: {
    borderBottomWidth: 0,
  },
  suggestionText: {
    fontSize: typography.base,
    color: colors.text,
    fontWeight: '500',
  },
});

export default Input;
