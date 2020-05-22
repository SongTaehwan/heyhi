import { NavigationContainer } from '@react-navigation/native';
import RootErrorBoundary from 'react-native-error-boundary';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  TutorialFlow,
  LoginFlow,
  SignUpFlow,
  MainFlow,
  MyPageFlow,
} from '@routes';
import Splash from '@screens/Splash';
import { AppFlow } from '@routes/types';
import apolloClient from '../client';

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
            <AppStack.Screen name={AppFlow.LoginFlow} component={LoginFlow} />
            <AppStack.Screen
              name={AppFlow.TutorialFlow}
              component={TutorialFlow}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
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
