import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootErrorBoundary from 'react-native-error-boundary';
import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { setNavigator } from '@util/navigationRef';
import {
  TutorialFlow,
  LoginFlow,
  SignUpFlow,
  MainFlow,
  MyPageFlow,
  SettingsFlow,
} from '@routes';
import Splash from '@screens/Splash';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './client';

const RootStack = createStackNavigator();

const App = (props): JSX.Element => {
  // TODO: Create AuthContext for token and tutorial

  const [showTutorial, setTutorial] = useState(false); // NOTE: true if you want to check tutorial
  const [hasToken, setToken] = useState(false); // NOTE: true if you want to skip Loginflow
  const [isLoading, setLoading] = useState(true);

  const initializeApp = async (): Promise<void> => {
    const [[, token], [, tutorial]] = await AsyncStorage.multiGet([
      'token',
      'tutorial',
    ]);

    RNBootSplash.hide({ duration: 200 });

    setTimeout(() => {
      if (token !== null) {
        setToken(true);
      }

      if (tutorial === null) {
        setTutorial(true);
      }

      setLoading(false);
    }, 1500);
  };

  const childErrorhandler = (error: Error, stackTrace: string): void => {
    console.log(error.message);
    // TODO: report error to a cash analysis service like crashlytics from firebase
  };

  useEffect(() => {
    initializeApp();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    // TODO: Build Error Fallback component for Production
    <ApolloProvider client={apolloClient}>
      <RootErrorBoundary onError={childErrorhandler}>
        <NavigationContainer ref={(navigator) => setNavigator(navigator)}>
          <RootStack.Navigator headerMode={'none'}>
            {showTutorial && (
              <RootStack.Screen
                name={'TutorialFlow'}
                component={TutorialFlow}
              />
            )}
            {!hasToken && (
              <>
                <RootStack.Screen name={'LoginFlow'} component={LoginFlow} />
                <RootStack.Screen name={'SignUpFlow'} component={SignUpFlow} />
              </>
            )}
            <RootStack.Screen name={'MainFlow'} component={MainFlow} />
            <RootStack.Screen name={'MyPageFlow'} component={MyPageFlow} />
          </RootStack.Navigator>
        </NavigationContainer>
      </RootErrorBoundary>
    </ApolloProvider>
  );
};

export default App;
