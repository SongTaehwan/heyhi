import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Container } from '@components';

import MyPage from '@screens/MyPage';
import LanguageSettings from '@screens/mypage/LanguageSettings';
import MyReviews from '@screens/mypage/MyReviews';
import EditAlbums from '@screens/mypage/EditAlbums';
import EditEmail from '@screens/mypage/EditEmail';
import Settings from '@screens/Settings';

import { RootStackParamList } from './types';

interface MyPageFlowProps {
  navigation: StackNavigationProp<RootStackParamList, 'MyPageFlow'>;
  route: RouteProp<RootStackParamList, 'MyPageFlow'>;
}

const MyPageStack = createStackNavigator();

const MyPageFlow = (props: MyPageFlowProps): JSX.Element => {
  return (
    <Container topless>
      <MyPageStack.Navigator
        initialRouteName="Mypage"
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <MyPageStack.Screen name={'MyPage'} component={MyPage} />
        <MyPageStack.Screen name={'Settings'} component={Settings} />
        <MyPageStack.Screen
          name={'LanguageSettings'}
          component={LanguageSettings}
        />
        <MyPageStack.Screen name={'MyReviews'} component={MyReviews} />
        <MyPageStack.Screen name={'EditAlbums'} component={EditAlbums} />
        <MyPageStack.Screen name={'EditEmail'} component={EditEmail} />
      </MyPageStack.Navigator>
    </Container>
  );
};

export default MyPageFlow;
