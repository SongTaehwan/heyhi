import { DividerProps } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  default: {
    borderColor: Colors.veryLightPinkTwo,
    borderBottomWidth: 1,
    width: '100%',
  },
});

const Divider = ({ style }: DividerProps): JSX.Element => {
  const dividerStyle = StyleSheet.flatten([styles.default, style]);
  return <View style={dividerStyle} />;
};

export default Divider;
