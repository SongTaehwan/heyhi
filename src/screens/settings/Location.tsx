import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { View, Text, StyleSheet, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

import { MEMBER } from '@api/mutation';
import {
  ContentContainer,
  Divider,
  VSpace,
  HSpace,
  HeadDivider,
} from '@components';
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
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    AsyncStorage.getItem('location').then((_location) =>
      setLocation(_location ?? ''),
    );

    AsyncStorage.getItem('coords')
      .then((c) => {
        console.log(c);
        return c;
      })
      .then((_coords) => setCoords(_coords ? JSON.parse(_coords) : {}));
  }, []);

  const [updateMemberLocationMutation] = useMutation(
    MEMBER.UPDATE_MEMBER_LOCATION,
  );

  const updateMemberLocation = (_distance: number): void => {
    setDistance(_distance);
    updateMemberLocationMutation({
      variables: {
        data: { distance: _distance, ...coords },
        where: { id: 0 },
      },
    });
  };

  return (
    <ContentContainer>
      <HeadDivider />
      <View style={styles.wrap}>
        <Text>My Current Location</Text>
        <VSpace space={32} />
        <View style={styles.currentLocationWrap}>
          <Icon size={18} name={'location-pin'} color={Colors.brightSkyBlue} />
          <HSpace space={10} />
          <Text>{location}</Text>
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
          onValueChange={updateMemberLocation}
        />
      </View>
    </ContentContainer>
  );
};

export default Location;
