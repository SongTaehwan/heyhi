import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet } from 'react-native';
import React from 'react';

import { HomeRoutes, StackNavigationProps, AppRoutes } from '@navigator/Routes';
import HomeIconActive from '@images/home_active.png';
import ChatIconActive from '@images/chat_active.png';
import MeIconActive from '@images/me_active.png';
import HomeIcon from '@images/home.png';
import ChatIcon from '@images/chat.png';
import MeIcon from '@images/me.png';
import { ImageView, Container } from '@components';
import { isFirstScene } from '@util/navigation';
import Chat from './Chat';
import MyPage from './MyPage';
import Map from './Main';

type TabBarIconProps = { focused: boolean; color: string };

const BottomTab = createMaterialBottomTabNavigator<HomeRoutes>();

export const HomeNavigator = ({
  route,
}: StackNavigationProps<AppRoutes, 'Home'>): JSX.Element => {
  const isFirstScreen = isFirstScene(route);
  return (
    <Container bottomless topless={isFirstScreen}>
      <BottomTab.Navigator
        initialRouteName={'Map'}
        labeled={false}
        sceneAnimationEnabled
        keyboardHidesNavigationBar
        style={styles.navigator}
        barStyle={styles.bar}>
        <BottomTab.Screen
          name={'Map'}
          component={Map}
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps): React.ReactNode => (
              <ImageView
                source={focused ? HomeIconActive : HomeIcon}
                style={styles.icon}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={'Chat'}
          component={Chat}
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps): React.ReactNode => (
              <ImageView
                source={focused ? ChatIconActive : ChatIcon}
                style={styles.icon}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={'MyPage'}
          component={MyPage}
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps): React.ReactNode => (
              <ImageView
                source={focused ? MeIconActive : MeIcon}
                style={styles.icon}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </Container>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  navigator: {
    backgroundColor: 'white',
  },
  bar: {
    marginHorizontal: 20,
    paddingHorizontal: 24,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
  },
});

export default HomeNavigator;
