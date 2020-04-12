import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { st } from '@constant';

interface ContainerProps extends SafeAreaViewProps {
  topless?: boolean;
  bottomless?: boolean;
  style?: StyleProp<ViewStyle>;
}
const Container = ({
  topless = false,
  bottomless = false,
  style,
  ...props
}: ContainerProps): JSX.Element => {
  const viewStyle = StyleSheet.flatten([
    st.Container.default,
    topless && st.Container.topless,
    bottomless && st.Container.bottomless,
    style,
  ]);

  return (
    <SafeAreaView style={viewStyle} {...props}>
      {props.children}
    </SafeAreaView>
  );
};

export default Container;
