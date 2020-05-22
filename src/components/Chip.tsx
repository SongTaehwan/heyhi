import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ChipProps } from './types';

const styles = StyleSheet.create({
  viewStyle: {
    width: 80,
    height: 24,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: '900',
    fontSize: 12,
    color: 'black',
  },
});

const Chip = (props: ChipProps): JSX.Element => {
  const defaultViewStyle = { ...styles.viewStyle, ...props?.viewStyle };
  const defaultTextStyle = { ...styles.textStyle, ...props?.textStyle };

  const viewStyle = props.color
    ? { ...defaultViewStyle, borderColor: props.color }
    : defaultViewStyle;

  const textStyle = props.color
    ? { ...defaultTextStyle, color: props.color }
    : defaultTextStyle;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.text}</Text>
    </View>
  );
};

Chip.defaultProps = {
  type: 'outline',
};

export default Chip;
