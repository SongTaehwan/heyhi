import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import {
  AppStackParamList,
  AppFlow,
  Screens,
  NavigationFlowProps,
} from './types';
import SignUpFlow from './SignUpFlow';
import PasswordRestoration from '@screens/login/PasswordRestoration';
import PasswordCreation from '@screens/login/PasswordCreation';
import SignIn from '@screens/login/SignIn';
import Language from '@screens/Language';

type LoginFlowProps = NavigationFlowProps<AppStackParamList, AppFlow.LoginFlow>;

const LoginStack = createStackNavigator();

const LoginFlow = (props: LoginFlowProps): JSX.Element => {
  return (
    <Container topless>
      <LoginStack.Navigator
        initialRouteName={Screens.SignIn}
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <LoginStack.Screen name={Screens.SignIn} component={SignIn} />
        {/* <LoginStack.Screen name={'Language'} component={Language} /> */}
        <LoginStack.Screen
          name={Screens.PasswordRestoration}
          component={PasswordRestoration}
        />
        <LoginStack.Screen
          name={Screens.PasswordCreation}
          component={PasswordCreation}
        />
        <LoginStack.Screen name={AppFlow.SignUpFlow} component={SignUpFlow} />
      </LoginStack.Navigator>
    </Container>
  );
};

export default LoginFlow;
