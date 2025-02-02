import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHomeScreen from '../../screens/auth/AuthHomeScreen.tsx';
import LoginScreen from '../../screens/auth/LoginScreen.tsx';
import { authStackNavigations } from '../../constants/navigations.ts';
import SignupScreen from '../../screens/auth/SignupScreen.tsx';
import { colors } from '../../constants/colors.ts';

export type AuthStackParamList = {
  [authStackNavigations.AUTH_HOME]: undefined;
  [authStackNavigations.LOGIN]: undefined;
  [authStackNavigations.SIGNUP]: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: {
        backgroundColor: colors.WHITE
      },
      headerStyle: {
        backgroundColor: colors.WHITE,
        shadowColor: 'gray'
      },
      headerTitleStyle: {
        fontSize: 15,
      },
      headerTintColor: 'black'
    }}>
      <Stack.Screen 
        name={authStackNavigations.AUTH_HOME} 
        component={AuthHomeScreen}
        options={{
          headerTitle: "",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name={authStackNavigations.LOGIN} 
        component={LoginScreen}
        options={{
          headerTitle: "로그인"
        }}
      />
      <Stack.Screen 
        name={authStackNavigations.SIGNUP} 
        component={SignupScreen}
        options={{
          headerTitle: "회원가입"
        }}
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;