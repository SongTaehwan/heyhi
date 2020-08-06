import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { useNavigationState } from '@react-navigation/native';
import PolicyDetail from './PolicyDetail';
import EmailAuth from './EmailAuth';
import UserInterest from './UserInterest';
import SignUp from './SignUp';
import UploadBestShot from './UploadBestShot';
import ServicePolicy from './ServicePolicy';
import UploadSelfie from './UploadSelfie';
import { isFirstScene } from '@util/navigation';
import { StyleSheets, Colors } from '@constants';
import { Container } from '@components';
import {
  SignUpRoutes,
  StackNavigationProps,
  AppRoutes,
} from '@navigator/Routes';

const Stack = createStackNavigator<SignUpRoutes>();

const SignUpNavigator = ({
  navigation,
}: StackNavigationProps<AppRoutes, 'LoginStack'>): JSX.Element => {
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
        initialRouteName={'SignUp'}
        screenOptions={(): StackNavigationOptions => {
          if (isFirstScene(currentNavRoute)) {
            return {
              headerShown: false,
            };
          }

          return StyleSheets.header.withBackButton;
        }}>
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen
          name={'EmailAuth'}
          component={EmailAuth}
          initialParams={{ to: 'ServicePolicy' }}
        />
        <Stack.Screen name={'ServicePolicy'} component={ServicePolicy} />
        <Stack.Screen
          name={'PolicyDetail'}
          component={PolicyDetail}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            title: 'Terms & Conditions',
            headerTitleStyle: StyleSheets.text.subTitle(
              false,
              Colors.darkSlateBlue,
            ),
          }}
        />
        <Stack.Screen name={'UploadBestShot'} component={UploadBestShot} />
        <Stack.Screen name={'UploadSelfie'} component={UploadSelfie} />
        <Stack.Screen name={'UserInterest'} component={UserInterest} />
      </Stack.Navigator>
    </Container>
  );
};

export default SignUpNavigator;
