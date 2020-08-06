import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SettingRoutes } from '@navigator/Routes';
import { Container } from '@components';
import NotificationControl from './NotificationControl';
import ChangePassword from './ChangePassword';
import Location from './Location';
import Setting from './Setting';
import History from './History';
import Payment from './Payment';

const Stack = createStackNavigator<SettingRoutes>();

export const SettingNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator initialRouteName={'Setting'}>
        <Stack.Screen name={'Setting'} component={Setting} />
        <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
        <Stack.Screen name={'History'} component={History} />
        <Stack.Screen name={'Location'} component={Location} />
        <Stack.Screen
          name={'NotificationControl'}
          component={NotificationControl}
        />
        <Stack.Screen name={'Payment'} component={Payment} />
      </Stack.Navigator>
    </Container>
  );
};
