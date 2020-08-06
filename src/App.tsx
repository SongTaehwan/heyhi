import { NavigationContainer } from '@react-navigation/native';
import RootErrorBoundary from 'react-native-error-boundary';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { useColorScheme } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackCardInterpolatedStyle,
} from '@react-navigation/stack';
import { OnboaddingNavigator } from '@navigator/Onboarding';
import { LoginNavigator } from '@navigator/Login';
import { SignUpNavigator } from '@navigator/SignUp';
import { HomeNavigator } from '@navigator/Home';

import { RootModalRoutes, AppRoutes } from '@navigator/Routes';
import SelfieNoticeModal from '@screens/modal/SelfieNoticeModal';
import Splash from '@screens/Splash';
import ChatRoom from '@screens/ChatRoom';
import { SettingNavigator } from '@navigator/Setting';
import theme, { darkTheme } from './components/Theme';
import apolloClient from '../client';

const Stack = createStackNavigator<AppRoutes>();
const ModalStack = createStackNavigator<RootModalRoutes>();

const App = (): JSX.Element => {
  // TODO: Theme color 적용
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider {...{ theme: dark ? darkTheme : theme }}>
        <AppErrorBoundary />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const AppErrorBoundary = (): JSX.Element => {
  const childErrorhandler = (error: Error, stackTrace: string): void => {
    console.log(error.message);
    // TODO: report error to a cash analysis service like crashlytics from firebase
  };

  return (
    <RootErrorBoundary onError={childErrorhandler}>
      <RootModalSackNaivgator />
    </RootErrorBoundary>
  );
};

const RootModalSackNaivgator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <ModalStack.Navigator
        initialRouteName={'App'}
        mode={'modal'}
        headerMode={'none'}
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          cardStyleInterpolator: ({
            current: { progress },
          }): StackCardInterpolatedStyle => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          }),
        }}>
        <ModalStack.Screen name={'App'} component={AppStack} />
        <ModalStack.Screen
          name={'SelfieNotice'}
          component={SelfieNoticeModal}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'LoginStack'} component={LoginNavigator} />
      <Stack.Screen name={'SignUpStack'} component={SignUpNavigator} />
      <Stack.Screen
        name={'OnboardingStack'}
        component={OnboaddingNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name={'ChatRoom'}
        component={ChatRoom}
        options={{ headerShown: true, title: 'ChatRoom' }}
      />
      <Stack.Screen name={'MyPageStack'} component={SettingNavigator} />
    </Stack.Navigator>
  );
};

export default App;
