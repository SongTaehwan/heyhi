import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import { Screens } from '@navigator/types';

import Settings from './Setting';
import ChangePassword from './ChangePassword';
import History from './History';
import Location from './Location';
import Notification from './Notification';
import PaymentsMethods from './PaymentsMethods';

const Stack = createStackNavigator();

export const SettingNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator initialRouteName={Screens.Settings}>
        <Stack.Screen name={Screens.Settings} component={Settings} />
        <Stack.Screen
          name={Screens.ChangePassword}
          component={ChangePassword}
        />
        <Stack.Screen name={Screens.History} component={History} />
        <Stack.Screen name={Screens.Location} component={Location} />
        <Stack.Screen name={Screens.Notification} component={Notification} />
        <Stack.Screen
          name={Screens.PaymentsMethods}
          component={PaymentsMethods}
        />
      </Stack.Navigator>
    </Container>
  );
};
