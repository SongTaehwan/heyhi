import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LanguageSettings from '@screens/mypage/LanguageSettings';
import PaymentsMethods from '@screens/settings/PaymentsMethods';
import ChangePassword from '@screens/settings/ChangePassword';
import MyReviewDetail from '@screens/mypage/MyReviewDetail';
import Notification from '@screens/settings/Notification';
import EditAlbums from '@screens/mypage/EditAlbums';
import Location from '@screens/settings/Location';
import MyReviews from '@screens/mypage/MyReviews';
import EditEmail from '@screens/mypage/EditEmail';
import History from '@screens/settings/History';
import Settings from '@screens/Settings';
import { Screens, MyPageStackParamList } from '@navigation/types';
import { StyleSheets } from '@constants';
import { Container } from '@components';

const Stack = createStackNavigator<MyPageStackParamList>();

const MyPageStackNavigator = (): JSX.Element => {
  return (
    <Container topless>
      <Stack.Navigator screenOptions={StyleSheets.header.withBackButton}>
        <Stack.Screen name={Screens.Settings} component={Settings} />
        <Stack.Screen
          name={Screens.LanguageSettings}
          component={LanguageSettings}
        />
        <Stack.Screen name={Screens.MyReviews} component={MyReviews} />
        <Stack.Screen
          name={Screens.MyReviewDetail}
          component={MyReviewDetail}
        />
        <Stack.Screen name={Screens.EditAlbums} component={EditAlbums} />
        <Stack.Screen name={Screens.EditEmail} component={EditEmail} />
        <Stack.Screen
          name={Screens.ChangePassword}
          component={ChangePassword}
        />
        <Stack.Screen
          name={Screens.PaymentsMethods}
          component={PaymentsMethods}
        />
        <Stack.Screen name={Screens.Notification} component={Notification} />
        <Stack.Screen name={Screens.History} component={History} />
        <Stack.Screen name={Screens.Location} component={Location} />
      </Stack.Navigator>
    </Container>
  );
};

export default MyPageStackNavigator;
