import { View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { NavigationProp } from '@type/index';
import { Paragraph } from '@components/layout';

interface SplashProp {
  navigation: NavigationProp<null, 'Splash'>;
}

const Splash = ({ navigation }: SplashProp): JSX.Element => {
  return (
    <View>
      <Paragraph contents={`One Line\nTwo Line\nThree Line`} />
      <Paragraph styleName="Body" contents={`One Line\nTwo Line\nThree Line`} />
      <Paragraph
        styleName="SmallBody"
        contents={`One Line\nTwo Line\nThree Line`}
      />
      <Button title={'go to Main'} />
    </View>
  );
};

export default Splash;
