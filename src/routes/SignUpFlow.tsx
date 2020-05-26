import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import {
  AppFlow,
  Screens,
  AppStackParamList,
  NavigationFlowProps,
} from './types';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { useNavigationState } from '@react-navigation/native';
import ServicePolicyDetail from '@screens/join/ServicePolicyDetail';
import EmailVerification from '@screens/join/EmailVerification';
import InterestSelection from '@screens/join/InterestSelection';
import AccountCreation from '@screens/join/AccountCreation';
import BestShotUpload from '@screens/join/BestShotUpload';
import ServicePolicy from '@screens/join/ServicePolicy';
import SelfieUpload from '@screens/join/SelfieUpload';
import { isFirstScene } from '@util/navigation';
import { StyleSheets } from '@constants';
import { Container } from '@components';

type SignUpFlowProps = NavigationFlowProps<
  AppStackParamList,
  AppFlow.SignUpFlow
>;

const SignUpStack = createStackNavigator();

const SignUpFlow = ({ navigation }: SignUpFlowProps): JSX.Element => {
  const currentNavRoute = useNavigationState(
    (state) => state.routes[state.index],
  );

  useLayoutEffect(() => {
    const shouldHideParentHeader = isFirstScene(currentNavRoute);

    if (shouldHideParentHeader) {
      navigation.setOptions({
        headerShown: true,
        ...StyleSheets.header.withBackButton,
      });
    } else {
      navigation.setOptions({ headerShown: false });
    }
  }, [currentNavRoute, navigation]);

  return (
    <Container topless>
      <SignUpStack.Navigator
        initialRouteName={Screens.AccountCreation}
        screenOptions={(): StackNavigationOptions => {
          if (isFirstScene(currentNavRoute)) {
            return {
              headerShown: false,
            };
          }

          return StyleSheets.header.withBackButton;
        }}>
        <SignUpStack.Screen
          name={Screens.AccountCreation}
          component={AccountCreation}
        />
        <SignUpStack.Screen
          name={Screens.EmailVerification}
          component={EmailVerification}
          initialParams={{ to: Screens.ServicePolicy }}
        />
        <SignUpStack.Screen
          name={Screens.ServicePolicy}
          component={ServicePolicy}
        />
        <SignUpStack.Screen
          name={Screens.ServicePolicyDetail}
          component={ServicePolicyDetail}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
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
