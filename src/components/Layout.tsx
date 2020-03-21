import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react';

interface Layout {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

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
}: Layout): JSX.Element => {
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
