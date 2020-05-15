import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  NavigationFlowProps,
  AppStackParamList,
  AppFlow,
  Screens,
} from './types';
import { Container } from '@components';
import ServicePolicyDetail from '@screens/join/ServicePolicyDetail';
import EmailVerification from '@screens/join/EmailVerification';
import InterestSelection from '@screens/join/InterestSelection';
import AccountCreation from '@screens/join/AccountCreation';
import BestShotUpload from '@screens/join/BestShotUpload';
import ServicePolicy from '@screens/join/ServicePolicy';
import SelfieUpload from '@screens/join/SelfieUpload';

type SignUpFlowProps = NavigationFlowProps<
  AppStackParamList,
  AppFlow.SignUpFlow
>;

const SignUpStack = createStackNavigator();

const SignUpFlow = (props: SignUpFlowProps): JSX.Element => {
  return (
    <Container topless>
      <SignUpStack.Navigator
        initialRouteName={Screens.AccountCreation}
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <SignUpStack.Screen
          name={Screens.AccountCreation}
          component={AccountCreation}
        />
        <SignUpStack.Screen
          name={Screens.EmailVerification}
          component={EmailVerification}
        />
        <SignUpStack.Screen
          name={Screens.ServicePolicy}
          component={ServicePolicy}
        />
        <SignUpStack.Screen
          name={Screens.ServicePolicyDetail}
          component={ServicePolicyDetail}
        />
        <SignUpStack.Screen
          name={Screens.BestShotUpload}
          component={BestShotUpload}
        />
        <SignUpStack.Screen
          name={Screens.SelfieUpload}
          component={SelfieUpload}
        />
        <SignUpStack.Screen
          name={Screens.InterestSelection}
          component={InterestSelection}
        />
      </SignUpStack.Navigator>
    </Container>
  );
};

export default SignUpFlow;
