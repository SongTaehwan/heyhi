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
import { StyleSheets, Colors } from '@constants';
import { Container } from '@components';

interface SignUpStackNavigatorProps {
  navigation: AppStackNavigationProps<AppFlow.SignUpStack>;
}

const Stack = createStackNavigator<SignUpStackParamList>();

const SignUpStackNavigator = ({
  navigation,
}: SignUpStackNavigatorProps): JSX.Element => {
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
        initialRouteName={Screens.SelfieUpload}
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
            headerStyle: {
              backgroundColor: 'orange',
            },
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

export default SignUpStackNavigator;
