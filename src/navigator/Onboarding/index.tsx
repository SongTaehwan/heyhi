import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import SecondGuide from './SecondGuide';
import FirstGuide from './FirstGuide';
import LastGuide from './LastGuide';
import { Container } from '@components';
import { StyleSheets } from '@constants';
import {
  OnboardingRoutes,
  StackNavigationProps,
  AppRoutes,
} from '@navigator/Routes';

export const assets = [
  require('./assets/tuto1.png'),
  require('./assets/tuto2.png'),
  require('./assets/tuto3.png'),
];

const Stack = createStackNavigator<OnboardingRoutes>();

export const OnboaddingNavigator = ({
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
