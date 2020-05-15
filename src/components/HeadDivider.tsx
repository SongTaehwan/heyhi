import { DividerProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@constants';
import Divider from './Divider';

const styles = StyleSheet.create({
  default: {
    borderWidth: 5,
    borderColor: Colors.veryLightPinkThree,
  },
});

const HeaderDivider = ({ style }: DividerProps): JSX.Element => {
  const dividerStyle = style || styles.default;
  return <Divider style={dividerStyle} />;
};

export default HeaderDivider;
