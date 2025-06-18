// src/screens/SignIn.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeHeader from '../components/signin/WelcomeHeader';
import SignInForm from '../components/signin/SignInForm';
import { colors, spacing } from '../constants/theme';
import { storageService } from '../services/storageService';

type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
};

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const handleSignIn = async (name: string) => {
    try {
      // Save user name to storage
      await storageService.saveUserName(name);

      // Navigate to main app with bottom tabs
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error saving user name:', error);
      // Still navigate even if saving fails
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <WelcomeHeader
                  title="Gift Card Wallet"
                  subtitle="Organize and manage all your gift cards in one place"
                />
              </View>

              <View style={styles.formContainer}>
                <SignInForm onSignIn={handleSignIn} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 300,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 300,
  },
});

export default SignInScreen;
