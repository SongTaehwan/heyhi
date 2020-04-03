import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EmailVerification from '@screens/join/EmailVerification';
import InterestSelection from '@screens/join/InterestSelection';
import { RootStackParamList, NavigationFlowProps } from './types';
import { Container } from '@components';
import AccountCreation from '@screens/join/AccountCreation';
import BestShotUpload from '@screens/join/BestShotUpload';
import SelfieUpload from '@screens/join/SelfieUpload';
import ServicePolicy from '@screens/join/ServicePolicy';
import ServicePolicyDetail from '@screens/join/ServicePolicyDetail';

type SignUpFlowProps = NavigationFlowProps<RootStackParamList, 'SignUpFlow'>;

const SignUpStack = createStackNavigator();

const SignUpFlow = (props: SignUpFlowProps): JSX.Element => {
  return (
    <Container topless>
      <SignUpStack.Navigator
        initialRouteName="AccountCreation"
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <SignUpStack.Screen
          name={'AccountCreation'}
          component={AccountCreation}
        />
        <SignUpStack.Screen
          name={'BestShotUpload'}
          component={BestShotUpload}
        />
        <SignUpStack.Screen name={'SelfieUpload'} component={SelfieUpload} />
        <SignUpStack.Screen name={'ServicePolicy'} component={ServicePolicy} />
        <SignUpStack.Screen
          name={'ServicePolicyDetail'}
          component={ServicePolicyDetail}
        />
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
