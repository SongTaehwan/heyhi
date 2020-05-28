import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import ChatRoom from '@screens/ChatRoom';
import Account from '@screens/Account';
import Map from '@screens/Main';
import { MainTabParamList } from '@navigation/types';

const BottomTab = createMaterialBottomTabNavigator<MainTabParamList>();

const MainFlow = (): JSX.Element => {
  return (
    <BottomTab.Navigator initialRouteName={'Map'}>
      <BottomTab.Screen name={'Map'} component={Map} />
      <BottomTab.Screen name={'Chat'} component={ChatRoom} />
      <BottomTab.Screen name={'Account'} component={Account} />
    </BottomTab.Navigator>
  );
};

export default MainFlow;
