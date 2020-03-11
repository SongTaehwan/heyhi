import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import RestorePassword from '@screens/login/RestorePassword';
import SignIn from '@screens/login/SignIn';
import Language from '@screens/Language';
import { Container } from '@components';
import { RootStackParamList } from './types';

interface LoginFlowProps {
  navigation: StackNavigationProp<RootStackParamList, 'LoginFlow'>;
  route: RouteProp<RootStackParamList, 'LoginFlow'>;
}

const LoginStack = createStackNavigator();

const LoginFlow = (props: LoginFlowProps): JSX.Element => {
  return (
    <Container topless>
      <LoginStack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <LoginStack.Screen name={'SignIn'} component={SignIn} />
        {/* <LoginStack.Screen name={'Language'} component={Language} /> */}
        <LoginStack.Screen
          name={'RestorePassword'}
          component={RestorePassword}
        />
      </LoginStack.Navigator>
    </Container>
  );
};

export default LoginFlow;
