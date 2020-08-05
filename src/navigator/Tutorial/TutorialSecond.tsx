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
import { Screens, TutorialStackNavigationProps } from '@navigator/types';
import SecondGuidImage from './assets/tuto2.png';
import { StyleSheets, Colors } from '@constants';

interface TutorialSecondProps {
  navigation: TutorialStackNavigationProps<Screens.TutorialSecond>;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  image: StyleSheets.setDimension('100%', '50%'),
  contentText: StyleSheets.text.subTitle(false, Colors.black, 'center'),
  boldText: StyleSheets.text.subTitle(true),
});

const TutorialSecond = ({ navigation }: TutorialSecondProps): JSX.Element => {
  const goToSecondStep = (): void => {
    navigation.navigate(Screens.TutorialLast);
  };

  return (
    <ContentContainer>
      <View style={styles.content}>
        <VSpace space={35} />
        <Title title>{'Find your mate'}</Title>
        <ImageView
          resizeMode={'contain'}
          source={SecondGuidImage}
          style={styles.image}
        />
        <Text style={styles.contentText}>
          {'Before matching,\n'}
          <Text style={styles.boldText}>
            {'your friend’s location\nis not provided😎'}
          </Text>
        </Text>
      </View>
      <BarButton title={'Next'} square onPress={goToSecondStep} />
    </ContentContainer>
  );
};

export default TutorialSecond;
