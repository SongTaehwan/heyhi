import { NavigationContainer } from '@react-navigation/native';
import RootErrorBoundary from 'react-native-error-boundary';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackCardInterpolatedStyle,
} from '@react-navigation/stack';
import {
  MainTab,
  LoginStack,
  SignUpStack,
  MyPageStack,
  TutorialStack,
} from '@navigation';
import {
  AppFlow,
  AppStackParamList,
  ModalStackParamList,
} from '@navigation/types';
import SelfieNoticeModal from '@screens/modal/SelfieNoticeModal';
import Splash from '@screens/Splash';
import apolloClient from '../client';

const Stack = createStackNavigator<AppStackParamList>();
const ModalStack = createStackNavigator<ModalStackParamList>();

const App = (): JSX.Element => {
  // TODO: Build App Color Theme provider wrapping AppWithErrorBoundary
  return <AppWithErrorBoundary />;
};

const AppWithErrorBoundary = (): JSX.Element => {
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
  // TODO: Theme color 적용
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
      initialRouteName={AppFlow.MainTab}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AppFlow.Splash} component={Splash} />
      <Stack.Screen name={AppFlow.LoginStack} component={LoginStack} />
      <Stack.Screen name={AppFlow.SignUpStack} component={SignUpStack} />
      <Stack.Screen
        name={AppFlow.TutorialStack}
        component={TutorialStack}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={AppFlow.MainTab}
        component={MainTab}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name={AppFlow.MyPageStack} component={MyPageStack} />
    </Stack.Navigator>
  );
};

const ProviderWrapper = (): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

export default ProviderWrapper;
