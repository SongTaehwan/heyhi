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
import LastGuidImage from '@images/tuto3.png';

interface TutorialLastProps {
  navigation: StackNavigationProp<TutorialStackParamList, 'LastTutorial'>;
  route: RouteProp<TutorialStackParamList, 'LastTutorial'>;
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

const TutorialLast = ({ navigation }: TutorialLastProps): JSX.Element => {
  const goToSecondStep = (): void => {
    // TODO: store token in context
    navigation.navigate('LoginFlow');
  };

  return (
    <Layout>
      <View style={styles.content}>
        <VSpace space={35} />
        <Title h2>{'This is Hey, Hi'}</Title>
        <ImageView
          resizeMode={'contain'}
          source={LastGuidImage}
          style={styles.image}
        />
        <View>
          <Text style={styles.bold}>{'Welcome,\nLet’s get started now!'}</Text>
        </View>
      </View>
      <BarButton title={'Next'} square onPress={goToSecondStep} />
    </Layout>
  );
};

export default TutorialLast;
