import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import {
  AppStackParamList,
  AppFlow,
  Screens,
  NavigationFlowProps,
} from './types';
import PasswordRestoration from '@screens/login/PasswordRestoration';
import NewPassword from '@screens/login/NewPassword';
import EmailAuth from '@screens/login/EmailAuth';
import SignIn from '@screens/login/SignIn';
import { StyleSheets } from '@constants';
import SignUpFlow from './SignUpFlow';

type LoginFlowProps = NavigationFlowProps<AppStackParamList, AppFlow.LoginFlow>;

const LoginStack = createStackNavigator();

const LoginFlow = (props: LoginFlowProps): JSX.Element => {
  return (
    <Container topless>
      <LoginStack.Navigator
        initialRouteName={Screens.SignIn}
        screenOptions={StyleSheets.header.withBackButton}>
        <LoginStack.Screen name={Screens.SignIn} component={SignIn} />
        <LoginStack.Screen
          name={Screens.PasswordRestoration}
          component={PasswordRestoration}
        />
        <LoginStack.Screen name={Screens.EmailAuth} component={EmailAuth} />
        <LoginStack.Screen name={Screens.NewPassword} component={NewPassword} />
        <LoginStack.Screen name={AppFlow.SignUpFlow} component={SignUpFlow} />
      </LoginStack.Navigator>
    </Container>
  );
};

export default LoginFlow;
