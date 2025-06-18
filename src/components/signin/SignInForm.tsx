// src/components/signin/SignInForm.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Input from '../common/Input';
import GradientButton from '../common/GradientButton';
import { spacing } from '../../constants/theme';

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
      <Input
        label="Your Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={handleNameChange}
        error={nameError}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <GradientButton
        title="Continue"
        onPress={handleSignIn}
        loading={loading}
        size="large"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    marginTop: spacing.lg,
  },
});

export default SignInForm;
