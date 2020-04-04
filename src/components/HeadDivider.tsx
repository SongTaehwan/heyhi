import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { Pallette } from '@styles';
import Divider from './Divider';

interface DivierProps {
  style?: StyleProp<ViewStyle>;
}
const styles = StyleSheet.create({
  default: {
    borderWidth: 5,
    borderColor: Pallette.veryLightPinkThree,
  },
});

const HeaderDivider = ({ style }: DivierProps): JSX.Element => {
  const dividerStyle = style || styles.default;
  return <Divider style={dividerStyle} />;
};

export default HeaderDivider;
