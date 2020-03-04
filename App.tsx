import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Splash from '@screens/Splash';
import Language from '@screens/Language';
import SignIn from '@screens/SignIn';
import RestorePassword from '@screens/RestorePassword';
import Account from '@screens/Account';
import ChatRoom from '@screens/ChatRoom';
import Main from '@screens/Main';
import { setNavigator } from '@util/navigationRef';

const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const LoginFlow = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'Language'} component={Language} />
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'RestorePassword'} component={RestorePassword} />
    </Stack.Navigator>
  );
};

const MainFlow = (): JSX.Element => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name={'Main'} component={Main} />
      <BottomTab.Screen name={'Chat'} component={ChatRoom} />
      <BottomTab.Screen name={'Account'} component={Account} />
    </BottomTab.Navigator>
  );
};

const App = (): JSX.Element => {
  return (
    <NavigationContainer ref={navigator => setNavigator(navigator)}>
      <Stack.Navigator>
        <Stack.Screen name={'LoginFlow'} component={LoginFlow} />
        <Stack.Screen name={'MainFlow'} component={MainFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
