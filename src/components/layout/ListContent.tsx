import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Text } from '@components';

interface ListContent {
  containerStyle?: StyleProp<ViewStyle>;
  contentTextStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  contentText?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
  },
});

const ListContent = ({
  containerStyle,
  contentTextStyle,
  children,
  contentText = 'Text',
}: ListContent): JSX.Element => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Text style={StyleSheet.flatten([styles.content, contentTextStyle])}>
        {contentText}
      </Text>
      {children}
    </View>
  );
};

export default ListContent;
