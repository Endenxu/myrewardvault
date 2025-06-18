// src/navigation/StackNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignInScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home';
import { colors, typography, spacing } from '../constants/theme';

type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
};

type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Placeholder screens for tabs
const ProfileScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Icon name="person" size={80} color={colors.textTertiary} />
    <Text style={styles.placeholderTitle}>Profile</Text>
    <Text style={styles.placeholderSubtitle}>Profile settings coming soon</Text>
  </View>
);

const SettingsScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Icon name="settings" size={80} color={colors.textTertiary} />
    <Text style={styles.placeholderTitle}>Settings</Text>
    <Text style={styles.placeholderSubtitle}>App settings coming soon</Text>
  </View>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'credit-card';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: typography.sm,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Cards' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  placeholderTitle: {
    fontSize: typography['2xl'],
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  placeholderSubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default StackNavigator;
