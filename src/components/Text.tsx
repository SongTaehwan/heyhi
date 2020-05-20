import { StyleSheet } from 'react-native';
import { Text as RNText } from 'react-native-elements';
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
  style,
  children,
  ...rest
}: TextProps): JSX.Element => {
  const textStyle = StyleSheet.flatten([
    styles.defaultText,
    style,
    title && StyleSheets.text.title(),
    subTitle && StyleSheets.text.subTitle(),
    smallText && StyleSheets.text.smallText(),
  ]);

  return (
    <RNText style={textStyle} {...rest}>
      {children || text}
    </RNText>
  );
};

export default Text;
