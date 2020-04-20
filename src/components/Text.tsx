import { StyleSheet } from 'react-native';
import { Text as RNText } from 'react-native-elements';
import React from 'react';
import { TextProps } from './types';

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 24,
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
});

const Text = ({
  title,
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  style,
  children,
  ...rest
}: TextProps): JSX.Element => {
  const textStyle = StyleSheet.flatten([
    styles.defaultText,
    style,
    h1 && StyleSheet.flatten([{ fontSize: 35 }, styles.bold]),
    h2 && StyleSheet.flatten([{ fontSize: 24 }, styles.bold]),
    h3 && StyleSheet.flatten([{ fontSize: 18, lineHeight: 30 }, styles.bold]),
    h4 && StyleSheet.flatten([{ fontSize: 15 }, styles.bold]),
  ]);

  return (
    <RNText style={textStyle} {...rest}>
      {children || title}
    </RNText>
  );
};

export default Text;
