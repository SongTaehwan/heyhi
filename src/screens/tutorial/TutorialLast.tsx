import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import { BarButton, Title, VSpace, ImageView, Layout } from '@components';
import {
  TutorialStackParamList,
  NavigationFlowProps,
  RootStackParamList,
} from '@routes/types';
import LastGuidImage from '@images/tuto3.png';
import AsyncStorage from '@react-native-community/async-storage';

type TutorialLastProps = NavigationFlowProps<
  TutorialStackParamList & RootStackParamList,
  'LastTutorial'
>;

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
  const goToSecondStep = async (): Promise<any> => {
    // TODO: store token in context
    await AsyncStorage.setItem('tutorial', 'done');
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
