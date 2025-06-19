// src/components/signin/SignInForm.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from '../common/Input';
import { spacing, colors, typography } from '../../constants/theme';
import Button from '../common/Button';

interface SignInFormProps {
  onSignIn: (name: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateName = (inputName: string) => {
    if (!inputName.trim()) {
      return 'Name is required';
    }
    if (inputName.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const handleSignIn = async () => {
    const error = validateName(name);
    if (error) {
      setNameError(error);
      return;
    }

    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      onSignIn(name.trim());
    }, 1000);
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (nameError) {
      setNameError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        {/* Welcome message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.instructionText}>
            Enter your name to get started with your gift card collection
          </Text>
        </View>

        {/* Input section */}
        <View style={styles.inputSection}>
          <Input
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={handleNameChange}
            error={nameError}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSignIn}
            style={styles.input}
          />
        </View>

        {/* Button section */}
        <View style={styles.buttonSection}>
          <Button
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            size="large"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  welcomeText: {
    fontSize: typography['2xl'],
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  instructionText: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.base * 1.4,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  input: {
    fontSize: typography.lg,
  },
  buttonSection: {
    marginTop: spacing.md,
  },
  button: {
    height: 56,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default SignInForm;
