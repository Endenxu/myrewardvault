import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const SignInScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gift Card Wallet</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <Button mode="contained" onPress={() => console.log('Sign in pressed')}>
        Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: '#666',
  },
});

export default SignInScreen;
