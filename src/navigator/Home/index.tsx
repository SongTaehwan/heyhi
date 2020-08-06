import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet } from 'react-native';
import React from 'react';

import { HomeRoutes, StackNavigationProps, AppRoutes } from '@navigator/Routes';
import { ImageView, Container } from '@components';
import { isFirstScene } from '@util/navigation';
import Chat from './Chat';
import MyPage from './MyPage';
import Map from './Main';

export const assets = [
  require('./assets/home_active.png'),
  require('./assets/home.png'),
  require('./assets/chat_active.png'),
  require('./assets/chat.png'),
  require('./assets/me_active.png'),
  require('./assets/me.png'),
];

type TabBarIconProps = { focused: boolean; color: string };

const BottomTab = createMaterialBottomTabNavigator<HomeRoutes>();

const HomeNavigator = ({
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
                source={focused ? assets[0] : assets[1]}
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
                source={focused ? assets[2] : assets[3]}
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
                source={focused ? assets[4] : assets[5]}
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
