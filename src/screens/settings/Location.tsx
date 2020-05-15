import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { Layout, Divider, VSpace, HSpace, HeadDivider } from '@components';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  currentLocationWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Location = (): JSX.Element => {
  const [distance, setDistance] = useState(1);

  return (
    <Layout>
      <HeadDivider />
      <View style={styles.wrap}>
        <Text>My Current Location</Text>
        <VSpace space={32} />
        <View style={styles.currentLocationWrap}>
          <Icon size={18} name={'location-pin'} color={Colors.brightSkyBlue} />
          <HSpace space={10} />
          <Text>Gangnam-Gu, Seoul</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.wrap}>
        <Text>Maximum Distance Setting</Text>
        <VSpace space={70} />
        <Slider
          minimumValue={1}
          maximumValue={50}
          value={distance}
          step={1}
          onValueChange={setDistance}
        />
      </View>
    </Layout>
  );
};

export default Location;
