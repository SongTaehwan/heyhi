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
import { TutorialNavigator } from '@navigator/Tutorial';
import { LoginNavigator } from '@navigator/Login';
import { SignUpNavigator } from '@navigator/SignUp';
import { HomeNavigator } from '@navigator/Home';

import {
  AppFlow,
  AppStackParamList,
  ModalStackParamList,
} from '@navigator/types';
import SelfieNoticeModal from '@screens/modal/SelfieNoticeModal';
import Splash from '@screens/Splash';
import ChatRoom from '@screens/ChatRoom';
import { SettingNavigator } from '@navigator/Setting';
import theme, { darkTheme } from './components/Theme';
import apolloClient from '../client';

const Stack = createStackNavigator<AppStackParamList>();
const ModalStack = createStackNavigator<ModalStackParamList>();

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
      initialRouteName={AppFlow.Splash}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AppFlow.Splash} component={Splash} />
      <Stack.Screen name={AppFlow.LoginStack} component={LoginNavigator} />
      <Stack.Screen name={AppFlow.SignUpStack} component={SignUpNavigator} />
      <Stack.Screen
        name={AppFlow.TutorialStack}
        component={TutorialNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={AppFlow.MainTab}
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
      <Stack.Screen name={AppFlow.MyPageStack} component={SettingNavigator} />
    </Stack.Navigator>
  );
};

export default App;
