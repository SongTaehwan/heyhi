import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootErrorBoundary from 'react-native-error-boundary';
import React from 'react';
import {
  TutorialFlow,
  LoginFlow,
  SignUpFlow,
  MainFlow,
  MyPageFlow,
} from '@routes';
import Splash from '@screens/Splash';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '../client';
import { AppFlow } from '@routes/types';

const AppStack = createStackNavigator();

const App = (): JSX.Element => {
  const childErrorhandler = (error: Error, stackTrace: string): void => {
    console.log(error.message);
    // TODO: report error to a cash analysis service like crashlytics from firebase
  };

  return (
    <ApolloProvider client={apolloClient}>
      <RootErrorBoundary onError={childErrorhandler}>
        <NavigationContainer>
          <AppStack.Navigator
            headerMode={'none'}
            initialRouteName={AppFlow.Splash}>
            <AppStack.Screen name={AppFlow.Splash} component={Splash} />
            <AppStack.Screen
              name={AppFlow.TutorialFlow}
              component={TutorialFlow}
            />
            <AppStack.Screen name={AppFlow.LoginFlow} component={LoginFlow} />
            <AppStack.Screen name={AppFlow.SignUpFlow} component={SignUpFlow} />
            <AppStack.Screen name={AppFlow.MainFlow} component={MainFlow} />
            <AppStack.Screen name={AppFlow.MyPageFlow} component={MyPageFlow} />
          </AppStack.Navigator>
        </NavigationContainer>
      </RootErrorBoundary>
    </ApolloProvider>
  );
};

export default App;
