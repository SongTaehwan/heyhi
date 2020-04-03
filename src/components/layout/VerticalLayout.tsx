import React, { ReactNode, FC } from 'react';
import { View, ViewProps, StyleSheet, StyleProp } from 'react-native';

interface VerticalLayoutProps {
  children?: ReactNode;
  style?: StyleProp<ViewProps>;
}

export type VerticalLayoutType = FC<VerticalLayoutProps>;

const styles = StyleSheet.create({
  defaultStyle: {
    flexDirection: 'row',
    width: '100%',
  },
});

const VerticalLayout: VerticalLayoutType = ({
  children,
}: VerticalLayoutProps): JSX.Element => {
  return <View style={styles.defaultStyle}>{children}</View>;
};

export default VerticalLayout;
