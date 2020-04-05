import {
  View,
  StyleSheet,
  StyleProp,
  FlexAlignType,
  ViewStyle,
} from 'react-native';
import React, { ReactNode, FC } from 'react';

interface HorizontalViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  horizontalAlign?: FlexAlignType;
  verticalAlign?: FlexAlignType;
}

export type HorizontalViewType = FC<HorizontalViewProps>;

const styles = StyleSheet.create({
  defaultStyle: {
    flexDirection: 'row',
    width: '100%',
  },
});

const HorizontalView: HorizontalViewType = ({
  children,
  style,
  horizontalAlign = 'flex-start',
  verticalAlign = 'flex-start',
}: HorizontalViewProps): JSX.Element => {
  const viewStyle = StyleSheet.flatten([
    styles.defaultStyle,
    style && style,
    { justiftContent: horizontalAlign, alignItems: verticalAlign },
  ]);
  return <View style={viewStyle}>{children}</View>;
};

export default HorizontalView;
