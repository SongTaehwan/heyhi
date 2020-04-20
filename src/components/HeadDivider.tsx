import { DividerProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Pallette } from '@styles';
import Divider from './Divider';

const styles = StyleSheet.create({
  default: {
    borderWidth: 5,
    borderColor: Pallette.veryLightPinkThree,
  },
});

const HeaderDivider = ({ style }: DividerProps): JSX.Element => {
  const dividerStyle = style || styles.default;
  return <Divider style={dividerStyle} />;
};

export default HeaderDivider;
