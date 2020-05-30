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
import {
  Screens,
  MyPageStackParamList,
  AppStackNavigationProps,
  AppFlow,
} from '@navigation/types';
import { StyleSheets } from '@constants';
import { Container, BackButton } from '@components';

interface MyPageStackNavigatorProps {
  navigation: AppStackNavigationProps<AppFlow.MyPageStack>;
}

const Stack = createStackNavigator<MyPageStackParamList>();

const MyPageStackNavigator = ({
  navigation,
}: MyPageStackNavigatorProps): JSX.Element => {
  const HeaderLeftBackButton = {
    headerLeft: (): React.ReactNode => {
      const goBackToTab = navigation.goBack; // eslint-disable-line
      return <BackButton onPress={goBackToTab} />;
    },
  };

  return (
    <Container topless>
      <Stack.Navigator
        screenOptions={StyleSheets.header.headerLeftBackButtonConfig}>
        <Stack.Screen
          name={Screens.Settings}
          component={Settings}
          options={HeaderLeftBackButton}
        />
        <Stack.Screen
          name={Screens.LanguageSettings}
          component={LanguageSettings}
          options={{ ...HeaderLeftBackButton, title: 'Language Settings' }}
        />
        <Stack.Screen
          name={Screens.MyReviews}
          component={MyReviews}
          options={{ ...HeaderLeftBackButton, title: 'My Reviews' }}
        />
        <Stack.Screen
          name={Screens.EditAlbums}
          component={EditAlbums}
          options={{ ...HeaderLeftBackButton, title: 'Edit Albums' }}
        />
        <Stack.Screen
          name={Screens.EditEmail}
          component={EditEmail}
          options={{ ...HeaderLeftBackButton, title: 'Edit Email' }}
        />
        <Stack.Screen
          name={Screens.MyReviewDetail}
          component={MyReviewDetail}
          options={{ ...HeaderLeftBackButton, title: 'My Reviews' }}
        />
        <Stack.Screen
          name={Screens.ChangePassword}
          component={ChangePassword}
          options={{ title: 'Change Password' }}
        />
        <Stack.Screen
          name={Screens.PaymentsMethods}
          component={PaymentsMethods}
          options={{ title: 'Payment' }}
        />
        <Stack.Screen name={Screens.Notification} component={Notification} />
        <Stack.Screen name={Screens.History} component={History} />
        <Stack.Screen name={Screens.Location} component={Location} />
      </Stack.Navigator>
    </Container>
  );
};

export default MyPageStackNavigator;
