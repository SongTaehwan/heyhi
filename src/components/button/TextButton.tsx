import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { st } from '@constant';
import { TextButtonProps, TextButtonType } from '../types';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: st.Pallette.brightSkyBlue,
  },
});

const TextButton: TextButtonType = ({
  text = 'button',
  textStyle,
  ...props
}: TextButtonProps): JSX.Element => {
  const buttonTextStyle = textStyle || styles.textStyle;

  return (
    <TouchableOpacity {...props}>
      <Text style={buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
