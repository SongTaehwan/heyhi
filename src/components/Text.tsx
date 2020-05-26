import { Text as RNText } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import React from 'react';
import { TextProps } from './types';
import { StyleSheets } from '@constants';

const styles = StyleSheet.create({
  defaultText: StyleSheets.text.baseText(),
  bold: {
    fontWeight: 'bold',
  },
});

const Text = ({
  text,
  title = false,
  subTitle = false,
  smallText = false,
  bold = false,
  style,
  children,
  color,
  align = 'auto',
  ...rest
}: TextProps): JSX.Element => {
  const textStyle = StyleSheet.flatten([
    styles.defaultText,
    { color, textAlign: align },
    style,
    title && StyleSheets.text.title(),
    subTitle && StyleSheets.text.subTitle(),
    smallText && StyleSheets.text.smallText(),
    bold && styles.bold,
  ]);

  return (
    <RNText style={textStyle} {...rest}>
      {children || text}
    </RNText>
  );
};

export default Text;
