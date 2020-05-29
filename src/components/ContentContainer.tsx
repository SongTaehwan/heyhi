import { ScrollView } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ContentContainerProps } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentStyle: {
    flexGrow: 1,
  },
});

const ContentContainer = ({
  containerStyle,
  contentContainerStyle,
  children,
}: ContentContainerProps): JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.contentStyle, contentContainerStyle]}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ContentContainer;
