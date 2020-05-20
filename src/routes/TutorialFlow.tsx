import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import TutorialSecond from '@screens/tutorial/TutorialSecond';
import TutorialFirst from '@screens/tutorial/TutorialFirst';
import TutorialLast from '@screens/tutorial/TutorialLast';
import { Container } from '@components';
import {
  AppStackParamList,
  NavigationFlowProps,
  AppFlow,
  Screens,
} from '@routes/types';
import { StyleSheets } from '@constants';

type TutorialFlowProps = NavigationFlowProps<
  AppStackParamList,
  AppFlow.TutorialFlow
>;

const TutorialStack = createStackNavigator();

const TutorialFlow = ({
  navigation,
  route,
}: TutorialFlowProps): JSX.Element => {
  useLayoutEffect(() => {
    // TODO: 헤더 옵션 추가
  }, [navigation, route]);

  return (
    <Container topless>
      <TutorialStack.Navigator
        initialRouteName={Screens.TutorialFirst}
        screenOptions={StyleSheets.header.tutorialHeader}>
        <TutorialStack.Screen
          name={Screens.TutorialFirst}
          component={TutorialFirst}
        />
        <TutorialStack.Screen
          name={Screens.TutorialSecond}
          component={TutorialSecond}
        />
        <TutorialStack.Screen
          name={Screens.TutorialLast}
          component={TutorialLast}
        />
      </TutorialStack.Navigator>
    </Container>
  );
};

export default TutorialFlow;
