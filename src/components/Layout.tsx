import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react';
import { LayoutProps } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentStyle: {
    flexGrow: 1,
  },
});

const Layout = ({
  containerStyle,
  contentContainerStyle,
  children,
}: LayoutProps): JSX.Element => {
  const layoutContainerStyle = StyleSheet.flatten([
    containerStyle,
    styles.container,
  ]);
  const layoutStyle = StyleSheet.flatten([
    contentContainerStyle,
    styles.contentStyle,
  ]);

  return (
    <View style={layoutContainerStyle}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={layoutStyle}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Layout;
