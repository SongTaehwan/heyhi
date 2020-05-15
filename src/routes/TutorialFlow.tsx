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
    console.log(navigation, route);
  }, [navigation, route]);

  return (
    <Container topless>
      <TutorialStack.Navigator
        initialRouteName={Screens.TutorialFirst}
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
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
