import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import React from 'react';
import HomeIconActive from '@images/home_active.png';
import ChatIconActive from '@images/chat_active.png';
import MeIconActive from '@images/me_active.png';
import HomeIcon from '@images/home.png';
import ChatIcon from '@images/chat.png';
import MeIcon from '@images/me.png';
import {
  MainTabParamList,
  AppFlow,
  AppStackNavigationProps,
  AppStackParamList,
} from '@navigator/types';
import { ImageView, Container } from '@components';
import { isFirstScene } from '@util/navigation';
import Chat from './Chat';
import MyPage from './MyPage';
import Map from './Main';

type TabBarIconProps = { focused: boolean; color: string };

interface HomeNavigatorProps {
  navigation: AppStackNavigationProps<AppFlow.MainTab>;
  route: RouteProp<AppStackParamList, AppFlow.MainTab>;
}

const BottomTab = createMaterialBottomTabNavigator<MainTabParamList>();

export const HomeNavigator = ({ route }: HomeNavigatorProps): JSX.Element => {
  const isFirstScreen = isFirstScene(route);
  return (
    <Container bottomless topless={isFirstScreen}>
      <BottomTab.Navigator
        initialRouteName={AppFlow.Map}
        labeled={false}
        sceneAnimationEnabled
        keyboardHidesNavigationBar
        style={styles.navigator}
        barStyle={styles.bar}>
        <BottomTab.Screen
          name={AppFlow.Map}
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
          name={AppFlow.Chat}
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
          name={AppFlow.MyPage}
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
