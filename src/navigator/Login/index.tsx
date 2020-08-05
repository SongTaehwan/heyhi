import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import { Screens } from '../types';
import ForgotPassword from './ForgotPassword';
import PasswordChange from './PasswordChange';
import EmailAuth from './EmailAuth';
import Login from './Login';
import { StyleSheets } from '@constants';
import { LoginRoutes } from '@navigator/Routes';

const Stack = createStackNavigator<LoginRoutes>();

export const LoginNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator
        initialRouteName={Screens.Login}
        screenOptions={StyleSheets.header.withBackButton}>
        <Stack.Screen name={Screens.Login} component={Login} />
        <Stack.Screen
          name={Screens.ForgotPassword}
          component={ForgotPassword}
        />
        <Stack.Screen name={Screens.EmailAuth} component={EmailAuth} />
        <Stack.Screen
          name={Screens.PasswordChange}
          component={PasswordChange}
        />
      </Stack.Navigator>
    </Container>
  );
};
