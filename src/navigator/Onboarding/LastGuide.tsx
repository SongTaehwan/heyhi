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
import LastGuidImage from './assets/tuto3.png';
import { StyleSheets } from '@constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { OnboardingNavigationProps } from '@navigator/Routes';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: StyleSheets.setDimension('100%', '50%'),
  boldText: StyleSheets.text.subTitle(true, Colors.black, 'center'),
});

const LastGuide = ({
  navigation,
}: OnboardingNavigationProps<'LastGuide'>): JSX.Element => {
  const goToSignIn = (): void => {
    // NOTE: API reference: https://reactnavigation.org/docs/nesting-navigators/
    navigation.navigate('Login');
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
      <BarButton title={'Next'} square onPress={goToSignIn} />
    </ContentContainer>
  );
};

export default LastGuide;
