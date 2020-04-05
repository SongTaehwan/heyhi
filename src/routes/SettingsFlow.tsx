import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Container } from '@components';
import Settings from '@screens/Settings';
import ChangePassword from '@screens/settings/ChangePassword';
import PaymentsMethods from '@screens/settings/PaymentsMethods';
import Notification from '@screens/settings/Notification';
import History from '@screens/settings/History';
import Location from '@screens/settings/Location';

import { RootStackParamList } from './types';

interface SettingsFlowProps {
  navigation: StackNavigationProp<RootStackParamList, 'SettingsFlow'>;
  route: RouteProp<RootStackParamList, 'SettingsFlow'>;
}

const SettingsStack = createStackNavigator();

const SettingsFlow = (props: SettingsFlowProps): JSX.Element => {
  return (
    <Container topless>
      <SettingsStack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <SettingsStack.Screen name={'Settings'} component={Settings} />
        <SettingsStack.Screen
          name={'ChangePassword'}
          component={ChangePassword}
        />
        <SettingsStack.Screen
          name={'PaymentsMethods'}
          component={PaymentsMethods}
        />
        <SettingsStack.Screen name={'Notification'} component={Notification} />
        <SettingsStack.Screen name={'History'} component={History} />
        <SettingsStack.Screen name={'Location'} component={Location} />
      </SettingsStack.Navigator>
    </Container>
  );
};

export default SettingsFlow;
