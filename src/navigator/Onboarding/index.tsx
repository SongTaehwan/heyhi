import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';

import SecondGuide from './SecondGuide';
import FirstGuide from './FirstGuide';
import LastGuide from './LastGuide';
import { StyleSheets } from '@constants';
import { Container } from '@components';
import {
  AppRoutes,
  OnboardingRoutes,
  StackNavigationProps,
} from '@navigator/Routes';

export const assets = [
  require('./assets/guide1.png'),
  require('./assets/guide2.png'),
  require('./assets/guide3.png'),
];

const Stack = createStackNavigator<OnboardingRoutes>();

const OnboaddingNavigator = ({
  navigation,
}: StackNavigationProps<AppRoutes, 'OnboardingStack'>): JSX.Element => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <Container topless>
      <Stack.Navigator
        initialRouteName={'FirstGuide'}
        screenOptions={StyleSheets.header.tutorialHeader}>
        <Stack.Screen name={'FirstGuide'} component={FirstGuide} />
        <Stack.Screen name={'SecondGuide'} component={SecondGuide} />
        <Stack.Screen name={'LastGuide'} component={LastGuide} />
      </Stack.Navigator>
    </Container>
  );
};

export default OnboaddingNavigator;
