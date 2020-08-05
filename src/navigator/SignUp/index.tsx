import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import {
  Screens,
  SignUpStackParamList,
  AppStackNavigationProps,
  AppFlow,
} from '../types';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { useNavigationState } from '@react-navigation/native';
import ServicePolicyDetail from './ServicePolicyDetail';
import EmailVerification from './EmailVerification';
import InterestSelection from './InterestSelection';
import AccountCreation from './AccountCreation';
import BestShotUpload from './BestShotUpload';
import ServicePolicy from './ServicePolicy';
import SelfieUpload from './SelfieUpload';
import { isFirstScene } from '@util/navigation';
import { StyleSheets, Colors } from '@constants';
import { Container } from '@components';

interface SignUpNavigatorProps {
  navigation: AppStackNavigationProps<AppFlow.SignUpStack>;
}

const Stack = createStackNavigator<SignUpStackParamList>();

export const SignUpNavigator = ({
  navigation,
}: SignUpNavigatorProps): JSX.Element => {
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
      <Stack.Navigator
        initialRouteName={Screens.AccountCreation}
        screenOptions={(): StackNavigationOptions => {
          if (isFirstScene(currentNavRoute)) {
            return {
              headerShown: false,
            };
          }

          return StyleSheets.header.withBackButton;
        }}>
        <Stack.Screen
          name={Screens.AccountCreation}
          component={AccountCreation}
        />
        <Stack.Screen
          name={Screens.EmailVerification}
          component={EmailVerification}
          initialParams={{ to: Screens.ServicePolicy }}
        />
        <Stack.Screen name={Screens.ServicePolicy} component={ServicePolicy} />
        <Stack.Screen
          name={Screens.ServicePolicyDetail}
          component={ServicePolicyDetail}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            title: 'Terms & Conditions',
            headerTitleStyle: StyleSheets.text.subTitle(
              false,
              Colors.darkSlateBlue,
            ),
          }}
        />
        <Stack.Screen
          name={Screens.BestShotUpload}
          component={BestShotUpload}
        />
        <Stack.Screen name={Screens.SelfieUpload} component={SelfieUpload} />
        <Stack.Screen
          name={Screens.InterestSelection}
          component={InterestSelection}
        />
      </Stack.Navigator>
    </Container>
  );
};
