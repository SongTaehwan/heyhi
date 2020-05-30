import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatRoom from '@screens/chat/ChatRoom';
import ChatList from '@screens/chat/ChatList';
import { StyleSheets } from '@constants';
import { Container } from '@components';
import { Screens } from './types';

const Stack = createStackNavigator();

const ChatStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={'ChatList'}
      screenOptions={StyleSheets.header.withBackButton}>
      <Stack.Screen
        name={'ChatList'}
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'ChatRoom'} component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
