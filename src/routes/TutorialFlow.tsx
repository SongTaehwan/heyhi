import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import TutorialSecond from '@screens/tutorial/TutorialSecond';
import TutorialFirst from '@screens/tutorial/TutorialFirst';
import TutorialLast from '@screens/tutorial/TutorialLast';
import { Container } from '@components';
import { RootStackParamList } from './types';

interface TutorialFlowProps {
  navigation: StackNavigationProp<RootStackParamList, 'TutorialFlow'>;
  route: RouteProp<RootStackParamList, 'TutorialFlow'>;
}

const TutorialStack = createStackNavigator();

const TutorialFlow = ({
  navigation,
  route,
}: TutorialFlowProps): JSX.Element => {
  useLayoutEffect(() => {
    console.log('called!');
    console.log(navigation, route);
  }, [navigation, route]);

  return (
    <Container topless>
      <TutorialStack.Navigator
        initialRouteName={'FirstTutorial'}
        screenOptions={{
          headerStyle: { shadowOffset: { height: 0, width: 0 } },
          title: '',
        }}>
        <TutorialStack.Screen
          name={'FirstTutorial'}
          component={TutorialFirst}
        />
        <TutorialStack.Screen
          name={'SecondTutorial'}
          component={TutorialSecond}
        />
        <TutorialStack.Screen name={'LastTutorial'} component={TutorialLast} />
      </TutorialStack.Navigator>
    </Container>
  );
};

export default TutorialFlow;
