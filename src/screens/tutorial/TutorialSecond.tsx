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
import SecondGuidImage from '@images/tuto2.png';

interface TutorialSecondProps {
  navigation: StackNavigationProp<TutorialStackParamList, 'SecondTutorial'>;
  route: RouteProp<TutorialStackParamList, 'SecondTutorial'>;
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

const TutorialSecond = ({ navigation }: TutorialSecondProps): JSX.Element => {
  const goToSecondStep = (): void => {
    navigation.navigate('LastTutorial');
  };

  return (
    <Layout>
      <View style={styles.content}>
        <VSpace space={35} />
        <Title h2>{'Find your mate'}</Title>
        <ImageView
          resizeMode={'contain'}
          source={SecondGuidImage}
          style={styles.image}
        />
        <View>
          <Text style={styles.contentText}>
            {'Before matching,\n'}
            <Text style={styles.bold}>
              {'your friend’s location\nis not provided😎'}
            </Text>
          </Text>
        </View>
      </View>
      <BarButton title={'Next'} square onPress={goToSecondStep} />
    </Layout>
  );
};

export default TutorialSecond;
