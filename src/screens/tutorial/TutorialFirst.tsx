import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import React from 'react';
import { BarButton, Title, VSpace, ImageView, Layout } from '@components';
import { TutorialStackParamList } from '@routes/types';
import FirstGuidImage from '@images/tuto1.png';

interface TutorialFirstProps {
  navigation: StackNavigationProp<TutorialStackParamList, 'FirstTutorial'>;
  route: RouteProp<TutorialStackParamList, 'FirstTutorial'>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: wp('100%'),
    height: hp('50%'),
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const TutorialFirst = ({ navigation }: TutorialFirstProps): JSX.Element => {
  const goToSecondStep = (): void => {
    navigation.navigate('SecondTutorial');
  };

  return (
    <Layout>
      <View style={styles.content}>
        <VSpace space={35} />
        <Title h2>{'How to use'}</Title>
        <ImageView
          resizeMode={'contain'}
          source={FirstGuidImage}
          style={styles.image}
        />
        <View>
          <Text style={styles.contentText}>
            {
              'You will see your friend’s exact\nlocation after matching with you :)\n'
            }
            <Text style={styles.bold}>{'THIS IS FAKE LOCATION! 😝'}</Text>
          </Text>
        </View>
      </View>
      <BarButton title={'Next'} square onPress={goToSecondStep} />
    </Layout>
  );
};

export default TutorialFirst;
