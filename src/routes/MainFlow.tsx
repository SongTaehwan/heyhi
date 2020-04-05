import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import ChatRoom from '@screens/ChatRoom';
import Account from '@screens/Account';
import Main from '@screens/Main';
import { RootStackParamList } from './types';

interface MainFlowProps {
  navigation: StackNavigationProp<RootStackParamList, 'LoginFlow'>;
  route: RouteProp<RootStackParamList, 'LoginFlow'>;
}

const BottomTab = createMaterialBottomTabNavigator();

const MainFlow = (props: MainFlowProps): JSX.Element => {
  return (
    <BottomTab.Navigator initialRouteName="Main">
      <BottomTab.Screen name={'Main'} component={Main} />
      <BottomTab.Screen name={'Chat'} component={ChatRoom} />
      <BottomTab.Screen name={'Account'} component={Account} />
    </BottomTab.Navigator>
  );
};

export default MainFlow;
