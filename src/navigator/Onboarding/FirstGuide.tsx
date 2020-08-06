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
import FirstGuidImage from './assets/tuto1.png';
import { StyleSheets, Colors } from '@constants';
import { OnboardingNavigationProps } from '@navigator/Routes';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  image: StyleSheets.setDimension('100%', '50%'),
  contentText: StyleSheets.text.subTitle(false, Colors.black, 'center'),
  boldText: StyleSheets.text.subTitle(true),
});

const TutorialFirst = ({
  navigation,
}: OnboardingNavigationProps<'FirstGuide'>): JSX.Element => {
  const goToSecondStep = (): void => {
    navigation.navigate('SecondGuide');
  };

  return (
    <ContentContainer>
      <View style={styles.content}>
        <VSpace space={35} />
        <Title title>{'How to use'}</Title>
        <ImageView
          resizeMode={'contain'}
          source={FirstGuidImage}
          style={styles.image}
        />
        <Text style={styles.contentText}>
          {
            'You will see your friend’s exact\nlocation after matching with you :)\n'
          }
          <Text style={styles.boldText}>{'THIS IS FAKE LOCATION! 😝'}</Text>
        </Text>
      </View>
      <BarButton title={'Next'} square onPress={goToSecondStep} />
    </ContentContainer>
  );
};

export default TutorialFirst;
