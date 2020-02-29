import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { NavigationProp } from '@type/index';

interface SplashProp {
  navigation: NavigationProp<null, 'Splash'>;
}

const Splash = ({ navigation }: SplashProp): JSX.Element => {
  console.log(navigation);
  return (
    <View>
      <Text>Splash</Text>
      <Button title={'go to Main'} />
    </View>
  );
};

export default Splash;
