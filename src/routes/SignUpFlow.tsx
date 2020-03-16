import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EmailVerification from '@screens/join/EmailVerification';
import InterestSelection from '@screens/join/InterestSelection';
import { RootStackParamList, NavigationFlowProps } from './types';
import { Container } from '@components';

type SignUpFlowProps = NavigationFlowProps<RootStackParamList, 'SignUpFlow'>;

const SignUpStack = createStackNavigator();

const SignUpFlow = (props: SignUpFlowProps): JSX.Element => {
  return (
    <Container topless>
      <SignUpStack.Navigator
        initialRouteName="EmailVerification"
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <SignUpStack.Screen
          name={'EmailVerification'}
          component={EmailVerification}
        />
        <SignUpStack.Screen
          name={'InterestSelection'}
          component={InterestSelection}
        />
      </SignUpStack.Navigator>
    </Container>
  );
};

export default SignUpFlow;
