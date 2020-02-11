import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

const Splash = ({ navigation }) => {
  return (
    <View>
      <Text>Splash</Text>
      <Button
        title={'go to Main'}
        onPress={() => navigation.navigate('MainFlow')}
      />
    </View>
  );
};

export default Splash;
