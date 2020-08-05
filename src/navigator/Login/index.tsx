import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import { Screens, LoginStackParamList } from '../types';
import PasswordRestoration from './PasswordRestoration';
import NewPassword from './NewPassword';
import EmailAuth from './EmailAuth';
import SignIn from './SignIn';
import { StyleSheets } from '@constants';

const Stack = createStackNavigator<LoginStackParamList>();

export const LoginNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator
        initialRouteName={Screens.SignIn}
        screenOptions={StyleSheets.header.withBackButton}>
        <Stack.Screen name={Screens.SignIn} component={SignIn} />
        <Stack.Screen
          name={Screens.PasswordRestoration}
          component={PasswordRestoration}
        />
        <Stack.Screen name={Screens.EmailAuth} component={EmailAuth} />
        <Stack.Screen name={Screens.NewPassword} component={NewPassword} />
        {/* <Stack.Screen name={AppFlow.SignUpStack} component={SignUpStack} /> */}
      </Stack.Navigator>
    </Container>
  );
};
