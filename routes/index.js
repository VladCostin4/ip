import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from '../src/pages/auth/index';
import { HomePage, ChatPage, LobbyPage, VotePage, ScorePage } from '../src/pages/index';

const Stack = createStackNavigator();

const AppRouter = ({ page }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {page === 'Login' ? (
          <Stack.Screen name="Login" component={LoginPage} />
        ) : (
          <Stack.Screen name="Home" component={HomePage} />
        )}
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
        <Stack.Screen name="Lobby" component={LobbyPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen name="Vote" component={VotePage} />
        <Stack.Screen name="Scoreboard" component={ScorePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
