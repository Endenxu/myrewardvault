// src/navigation/StackNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  CreditCardIcon,
  UserIcon,
  SettingsIcon,
} from '../components/common/CustomIcons';
import SignInScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home';
import { colors, typography, spacing, borderRadius } from '../constants/theme';

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

// Custom Tab Bar Icon Component
const TabBarIcon: React.FC<{
  route: string;
  focused: boolean;
  size: number;
}> = ({ route, focused, size }) => {
  const iconSize = focused ? 22 : 20;
  const iconColor = focused ? colors.primary : colors.textTertiary;

  const getIcon = () => {
    switch (route) {
      case 'Home':
        return <CreditCardIcon size={iconSize} color={iconColor} />;
      case 'Profile':
        return <UserIcon size={iconSize} color={iconColor} />;
      case 'Settings':
        return <SettingsIcon size={iconSize} color={iconColor} />;
      default:
        return <CreditCardIcon size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View
      style={[styles.tabIconWrapper, focused && styles.tabIconWrapperFocused]}
    >
      {getIcon()}
    </View>
  );
};

// Placeholder screens for tabs
const ProfileScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <UserIcon size={80} color={colors.primary} />
    <Text style={styles.placeholderTitle}>Profile</Text>
    <Text style={styles.placeholderSubtitle}>Profile settings coming soon</Text>
  </View>
);

const SettingsScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <SettingsIcon size={80} color={colors.primary} />
    <Text style={styles.placeholderTitle}>Settings</Text>
    <Text style={styles.placeholderSubtitle}>App settings coming soon</Text>
  </View>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => (
          <TabBarIcon route={route.name} focused={focused} size={size} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 85 : 70,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: typography.xs,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: Platform.OS === 'android' ? 4 : 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Cards',
          tabBarBadge: undefined,
        }}
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
  tabIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    position: 'relative',
  },
  tabIconWrapperFocused: {
    transform: [{ scale: 1.1 }],
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
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
