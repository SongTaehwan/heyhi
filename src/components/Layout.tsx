import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Layout {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
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

const Layout = ({ style, children }: Layout): JSX.Element => {
  const layoutStyle = style || styles.contentStyle;
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={layoutStyle}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Layout;
