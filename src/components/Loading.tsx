import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const Loading = (props: ActivityIndicatorProps): JSX.Element => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={props.size ?? 'large'} color={props.color} />
    </View>
  );
};

export default Loading;
