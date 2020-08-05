import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import TutorialSecond from './TutorialSecond';
import TutorialFirst from './TutorialFirst';
import TutorialLast from './TutorialLast';
import { Container } from '@components';
import {
  AppFlow,
  Screens,
  TutorialStackParamList,
  AppStackNavigationProps,
} from '@navigator/types';
import { StyleSheets } from '@constants';

export const assets = [
  require('./assets/tuto1.png'),
  require('./assets/tuto2.png'),
  require('./assets/tuto3.png'),
];

interface TutorialStackNavigatorProps {
  navigation: AppStackNavigationProps<AppFlow.TutorialStack>;
}

const Stack = createStackNavigator<TutorialStackParamList>();

export const TutorialNavigator = ({
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
