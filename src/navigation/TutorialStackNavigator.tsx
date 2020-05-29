import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import TutorialSecond from '@screens/tutorial/TutorialSecond';
import TutorialFirst from '@screens/tutorial/TutorialFirst';
import TutorialLast from '@screens/tutorial/TutorialLast';
import { Container } from '@components';
import {
  AppFlow,
  Screens,
  TutorialStackParamList,
  AppStackNavigationProps,
} from '@navigation/types';
import { StyleSheets } from '@constants';

interface TutorialStackNavigatorProps {
  navigation: AppStackNavigationProps<AppFlow.TutorialStack>;
}

const Stack = createStackNavigator<TutorialStackParamList>();

const TutorialStackNavigator = ({
  navigation,
}: TutorialStackNavigatorProps): JSX.Element => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <Container topless>
      <Stack.Navigator
        initialRouteName={Screens.TutorialFirst}
        screenOptions={StyleSheets.header.tutorialHeader}>
        <Stack.Screen name={Screens.TutorialFirst} component={TutorialFirst} />
        <Stack.Screen
          name={Screens.TutorialSecond}
          component={TutorialSecond}
        />
        <Stack.Screen name={Screens.TutorialLast} component={TutorialLast} />
      </Stack.Navigator>
    </Container>
  );
};

export default TutorialStackNavigator;
