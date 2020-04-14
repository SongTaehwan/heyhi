import React from 'react';
import { StyleSheet } from 'react-native';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from '@react-navigation/material-bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from '@screens/Main';
import ChatRoom from '@screens/ChatRoom';
import MyPage from '@screens/MyPage';

import { Pallette } from '@styles';
import { RootStackParamList } from './types';

interface Props {
  focused: boolean;
  color: string;
}

interface BottomTabFlowProps {
  navigation: MaterialBottomTabNavigationProp<
    RootStackParamList,
    'BottomTabFlow'
  >;
  route: RouteProp<RootStackParamList, 'MainFlow'>;
}

const styles = StyleSheet.create({
  navigatorStyle: { backgroundColor: Pallette.white },
  barStyle: {
    backgroundColor: Pallette.white,
    paddingTop: 15,
    marginBottom: -30,
    marginHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

const BottomTab = (props: BottomTabFlowProps): JSX.Element => {
  console.log(props.route);
  const Tab = createMaterialBottomTabNavigator();
  const tabBarLabel = '';
  const mainOptions = {
    tabBarLabel,
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: Props): JSX.Element => (
      <FoundationIcon name={'home'} color={color} size={26} />
    ),
  };

  const chatRoomOptions = {
    tabBarLabel,
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: Props): JSX.Element => (
      <MaterialCommunityIcon name={'chat'} color={color} size={26} />
    ),
  };

  const myPageOptions = {
    tabBarLabel,
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: Props): JSX.Element => (
      <FeatherIcon name={'user'} color={color} size={26} />
    ),
  };

  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor={Pallette.brightSkyBlue}
      style={styles.navigatorStyle}
      barStyle={styles.barStyle}>
      <Tab.Screen name={'Main'} component={Main} options={mainOptions} />
      <Tab.Screen
        name={'Chat'}
        component={ChatRoom}
        options={chatRoomOptions}
      />
      <Tab.Screen name={'MyPage'} component={MyPage} options={myPageOptions} />
    </Tab.Navigator>
  );
};

export default BottomTab;
