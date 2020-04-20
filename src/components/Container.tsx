import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import { st } from '@constant';
import { ContainerProps } from './types';

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
