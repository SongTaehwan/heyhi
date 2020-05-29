import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import { Screens, LoginStackParamList } from './types';
import PasswordRestoration from '@screens/login/PasswordRestoration';
import NewPassword from '@screens/login/NewPassword';
import EmailAuth from '@screens/login/EmailAuth';
import SignIn from '@screens/login/SignIn';
import { StyleSheets } from '@constants';

const Stack = createStackNavigator<LoginStackParamList>();

const LoginStackNavigator = (): JSX.Element => {
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

export default LoginStackNavigator;
