import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import {
  BarButton,
  Title,
  VSpace,
  ImageView,
  ContentContainer,
} from '@components';
import {
  TutorialStackParamList,
  NavigationFlowProps,
  AppStackParamList,
  Screens,
  AppFlow,
} from '@routes/types';
import LastGuidImage from '@images/tuto3.png';
import { StyleSheets } from '@constants';

type TutorialLastProps = NavigationFlowProps<
  TutorialStackParamList & AppStackParamList,
  Screens.TutorialLast
>;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: StyleSheets.setDimension('100%', '50%'),
  boldText: StyleSheets.text.subTitle(true, 'center'),
});

const TutorialLast = ({
  navigation,
  route,
}: TutorialLastProps): JSX.Element => {
  console.log(route);
  const goToSecondStep = (): void => {
    // NOTE: API reference: https://reactnavigation.org/docs/nesting-navigators/
    navigation.navigate(AppFlow.LoginFlow, { screen: Screens.SignIn });
  };

  return (
    <ContentContainer>
      <View style={styles.content}>
        <VSpace space={35} />
        <Title title>{'This is Hey, Hi'}</Title>
        <ImageView
          resizeMode={'contain'}
          source={LastGuidImage}
          style={styles.image}
        />
        <View>
          <Text style={styles.boldText}>
            {'Welcome,\nLet’s get started now!'}
          </Text>
        </View>
      </View>
      <BarButton title={'Next'} square onPress={goToSecondStep} />
    </ContentContainer>
  );
};

export default TutorialLast;
