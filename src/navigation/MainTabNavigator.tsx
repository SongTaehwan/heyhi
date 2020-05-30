import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RNBootSplash from 'react-native-bootsplash';
import { StyleSheet } from 'react-native';
import React from 'react';
import HomeIconActive from '@images/home_active.png';
import ChatIconActive from '@images/chat_active.png';
import MeIconActive from '@images/me_active.png';
import HomeIcon from '@images/home.png';
import ChatIcon from '@images/chat.png';
import MeIcon from '@images/me.png';
import { MainTabParamList, AppFlow } from '@navigation/types';
import { ImageView, Container } from '@components';
import ChatList from '@screens/chat/ChatList';
import MyPage from '@screens/MyPage';
import Map from '@screens/Main';

type TabBarIconProps = { focused: boolean; color: string };

const BottomTab = createMaterialBottomTabNavigator<MainTabParamList>();

const MainFlow = (): JSX.Element => {
  RNBootSplash.hide();
  return (
    <Container bottomless>
      <BottomTab.Navigator
        initialRouteName={AppFlow.MyPage}
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
          component={ChatList}
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

export default MainFlow;
