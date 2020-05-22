import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from '@components';

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
import BottomTopFlow from './BottomTabFlow';
import {
  AppStackParamList,
  NavigationFlowProps,
  AppFlow,
  Screens,
} from '@routes/types';
import { StyleSheets } from '@constants';

type MyPageFlowProps = NavigationFlowProps<
  AppStackParamList,
  AppFlow.MyPageFlow
>;

const MyPageStack = createStackNavigator();

const MyPageFlow = (props: MyPageFlowProps): JSX.Element => {
  return (
    <Container topless>
      <MyPageStack.Navigator
        initialRouteName={Screens.MyPage}
        screenOptions={StyleSheets.header.headerless}>
        <MyPageStack.Screen name={Screens.MyPage} component={BottomTopFlow} />
        <MyPageStack.Screen name={Screens.Settings} component={Settings} />
        <MyPageStack.Screen
          name={Screens.LanguageSettings}
          component={LanguageSettings}
        />
        <MyPageStack.Screen name={Screens.MyReviews} component={MyReviews} />
        <MyPageStack.Screen
          name={Screens.MyReviewDetail}
          component={MyReviewDetail}
        />
        <MyPageStack.Screen name={Screens.EditAlbums} component={EditAlbums} />
        <MyPageStack.Screen name={Screens.EditEmail} component={EditEmail} />
        <MyPageStack.Screen
          name={Screens.ChangePassword}
          component={ChangePassword}
        />
        <MyPageStack.Screen
          name={Screens.PaymentsMethods}
          component={PaymentsMethods}
        />
        <MyPageStack.Screen
          name={Screens.Notification}
          component={Notification}
        />
        <MyPageStack.Screen name={Screens.History} component={History} />
        <MyPageStack.Screen name={Screens.Location} component={Location} />
      </MyPageStack.Navigator>
    </Container>
  );
};

export default MyPageFlow;
