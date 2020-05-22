import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors, StyleSheets } from '@constants';
import { TextButtonProps, TextButtonType } from '../types';
import { Text } from '../';

const styles = StyleSheet.create({
  textStyle: StyleSheets.text.baseText(Colors.brightSkyBlue),
});

const TextButton: TextButtonType = ({
  text = 'button',
  textStyle,
  ...props
}: TextButtonProps): JSX.Element => {
  return (
    <TouchableOpacity {...props}>
      <Text style={[styles.textStyle, textStyle]} text={text} />
    </TouchableOpacity>
  );
};

export default TextButton;
