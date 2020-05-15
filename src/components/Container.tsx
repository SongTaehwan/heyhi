import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import { StyleSheets } from '@constants';
import { ContainerProps } from './types';

const Container = ({
  topless = false,
  bottomless = false,
  style,
  ...props
}: ContainerProps): JSX.Element => {
  const viewStyle = StyleSheet.flatten([
    StyleSheets.ContainerStyles.default,
    topless && StyleSheets.ContainerStyles.topless,
    bottomless && StyleSheets.ContainerStyles.bottomless,
    style,
  ]);

  return (
    <SafeAreaView style={viewStyle} {...props}>
      {props.children}
    </SafeAreaView>
  );
};

export default Container;
