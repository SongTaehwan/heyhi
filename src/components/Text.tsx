import { StyleSheet, TextStyle } from 'react-native';
import {
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native-elements';
import React from 'react';

interface TextProps extends RNTextProps {
  text?: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  style?: TextStyle;
  children?: React.ReactNode;
}

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
  text,
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
    h3 && StyleSheet.flatten([{ fontSize: 18 }, styles.bold]),
    h4 && StyleSheet.flatten([{ fontSize: 15 }, styles.bold]),
  ]);

  return (
    <RNText style={textStyle} {...rest}>
      {children || text}
    </RNText>
  );
};

export default Text;
