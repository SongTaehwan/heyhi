import { View, StyleSheet } from 'react-native';
import React from 'react';
import { HorizontalViewProps, HorizontalViewType } from '../types';

const styles = StyleSheet.create({
  defaultStyle: {
    flexDirection: 'row',
    width: '100%',
  },
});

const HorizontalView: HorizontalViewType = ({
  children,
  style,
  horizontalAlign = 'flex-start',
  verticalAlign = 'flex-start',
}: HorizontalViewProps): JSX.Element => {
  const viewStyle = StyleSheet.flatten([
    styles.defaultStyle,
    style && style,
    { justifyContent: horizontalAlign, alignItems: verticalAlign },
  ]);
  return <View style={viewStyle}>{children}</View>;
};

export default HorizontalView;
