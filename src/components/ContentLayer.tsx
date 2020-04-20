import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ContentLayerProps } from './types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    backgroundColor: 'white',
  },
});

const ContentLayer = ({ children, style }: ContentLayerProps): JSX.Element => {
  return <View style={[styles.content, style]}>{children}</View>;
};

export default ContentLayer;
