import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { st } from '@constant';

interface DivierProps {
  style?: StyleProp<ViewStyle>;
}
const styles = StyleSheet.create({
  default: {
    borderColor: st.Pallette.veryLightPinkTwo,
    borderBottomWidth: 1,
    width: '100%',
  },
});

const Divider = ({ style }: DivierProps): JSX.Element => {
  const dividerStyle = StyleSheet.flatten([styles.default, style]);
  return <View style={dividerStyle} />;
};

export default Divider;
