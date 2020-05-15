import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import ChatRoom from '@screens/ChatRoom';
import Account from '@screens/Account';
import Main from '@screens/Main';
import { NavigationFlowProps, AppStackParamList, AppFlow } from '@routes/types';

type MainFlowProps = NavigationFlowProps<AppStackParamList, AppFlow.MainFlow>;

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
