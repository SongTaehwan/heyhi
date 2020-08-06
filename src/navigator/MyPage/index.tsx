import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MyPageRoutes } from '@navigator/Routes';
import { Container } from '@components';
import ChangeLanguage from './ChangeLanguage';
import ReviewDetail from './ReviewDetail';
import ChangeEmail from './ChangeEmail';
import EditAlbum from './EditAlbum';
import MyReview from './MyReview';

const Stack = createStackNavigator<MyPageRoutes>();

export const MyPageNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator initialRouteName={'EditAlbum'}>
        <Stack.Screen name={'EditAlbum'} component={EditAlbum} />
        <Stack.Screen name={'ChangeEmail'} component={ChangeEmail} />
        <Stack.Screen name={'ChangeLanguage'} component={ChangeLanguage} />
        <Stack.Screen name={'ReviewDetail'} component={ReviewDetail} />
        <Stack.Screen name={'MyReview'} component={MyReview} />
      </Stack.Navigator>
    </Container>
  );
};
