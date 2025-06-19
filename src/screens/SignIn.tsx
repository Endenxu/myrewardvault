// src/screens/SignIn.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
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
      await storageService.saveUserName(name);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error saving user name:', error);
      navigation.navigate('Main');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <LinearGradient
            colors={['#FAFBFF', '#F0F4FF', colors.surface]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoid}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.container}>
                  <View style={styles.topSpacer} />

                  {/* Header Section */}
                  <View style={styles.headerSection}>
                    <WelcomeHeader
                      title="Gift Card Wallet"
                      subtitle="Organize and manage all your gift cards in one place"
                    />
                  </View>

                  {/* Form Section */}
                  <View style={styles.formSection}>
                    <SignInForm onSignIn={handleSignIn} />
                  </View>

                  {/* Bottom spacer */}
                  <View style={styles.bottomSpacer} />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  topSpacer: {
    flex: 0.8,
    minHeight: 40,
  },
  headerSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  formSection: {
    flex: 1.5,
    justifyContent: 'flex-start',
    paddingTop: spacing.xl,
  },
  bottomSpacer: {
    flex: 1,
    minHeight: 60,
  },
});

export default SignInScreen;
