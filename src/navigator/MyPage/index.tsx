import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Container } from '@components';
import { Screens } from '@navigator/types';

import EditAlbums from './EditAlbums';
import EditEmail from './EditEmail';
import LanguageSettings from './LanguageSettings';
import MyReviewDetail from './MyReviewDetail';
import MyReviews from './MyReviews';

const Stack = createStackNavigator();

export const MyPageNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator initialRouteName={Screens.EditAlbums}>
        <Stack.Screen name={Screens.EditAlbums} component={EditAlbums} />
        <Stack.Screen name={Screens.EditEmail} component={EditEmail} />
        <Stack.Screen
          name={Screens.LanguageSettings}
          component={LanguageSettings}
        />
        <Stack.Screen
          name={Screens.MyReviewDetail}
          component={MyReviewDetail}
        />
        <Stack.Screen name={Screens.MyReviews} component={MyReviews} />
      </Stack.Navigator>
    </Container>
  );
};
