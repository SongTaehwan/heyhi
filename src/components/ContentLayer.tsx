import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ContentLayer {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
});

const ContentLayer = ({ children, style }: ContentLayer): JSX.Element => {
  return <View style={[styles.content, style]}>{children}</View>;
};

export default ContentLayer;
