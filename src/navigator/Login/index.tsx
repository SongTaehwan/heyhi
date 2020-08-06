import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginRoutes } from '@navigator/Routes';
import { StyleSheets } from '@constants';
import { Container } from '@components';
import ForgotPassword from './ForgotPassword';
import PasswordChange from './PasswordChange';
import EmailAuth from './EmailAuth';
import Login from './Login';

export const assets = [require('./assets/logo.png')];

const Stack = createStackNavigator<LoginRoutes>();

const LoginNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={StyleSheets.header.withBackButton}>
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
        <Stack.Screen name={'EmailAuth'} component={EmailAuth} />
        <Stack.Screen name={'PasswordChange'} component={PasswordChange} />
      </Stack.Navigator>
    </Container>
  );
};

export default LoginNavigator;
