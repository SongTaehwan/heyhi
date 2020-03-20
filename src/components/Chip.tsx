import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ChipProps {
  text: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
}

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
  },
});

const Chip = (props: ChipProps): JSX.Element => {
  const defaultViewStyle = props.viewStyle ?? styles.viewStyle;
  const defaultTextStyle = props.textStyle ?? styles.textStyle;

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
