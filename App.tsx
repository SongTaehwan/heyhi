import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootErrorBoundary from 'react-native-error-boundary';
import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { setNavigator } from '@util/navigationRef';
import { TutorialFlow, LoginFlow, MainFlow } from '@routes';
import Splash from '@screens/Splash';

const RootStack = createStackNavigator();

const App = (props): JSX.Element => {
  // TODO: Create AuthContext for token and tutorial

  const [showTutorial, setTutorial] = useState(true); // NOTE: true if you want to check tutorial
  const [hasToken, setToken] = useState(false); // NOTE: true if you want to skip Loginflow
  const [isLoading, setLoading] = useState(true);

  const initializeApp = async (): Promise<void> => {
    const [[, token], [, tutorial]] = await AsyncStorage.multiGet([
      'token',
      'tutorial',
    ]);

    RNBootSplash.hide({ duration: 200 });

    setTimeout(() => {
      setLoading(false);

      if (token !== null) {
        setToken(true);
      }

      if (tutorial !== null) {
        setTutorial(true);
      }
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
    <RootErrorBoundary onError={childErrorhandler}>
      <NavigationContainer ref={navigator => setNavigator(navigator)}>
        <RootStack.Navigator headerMode={'none'}>
          {showTutorial && (
            <RootStack.Screen name={'TutorialFlow'} component={TutorialFlow} />
          )}
          {!hasToken && (
            <RootStack.Screen name={'LoginFlow'} component={LoginFlow} />
          )}
          <RootStack.Screen name={'MainFlow'} component={MainFlow} />
        </RootStack.Navigator>
      </NavigationContainer>
    </RootErrorBoundary>
  );
};

export default App;
