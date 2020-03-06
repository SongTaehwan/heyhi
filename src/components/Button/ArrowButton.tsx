import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import { IconButtonProps } from './types';

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    backgroundColor: '#fff',
  },
});

const ArrowButton = (props: IconButtonProps): JSX.Element => {
  return (
    <Button
      icon={<Icon name={props.iconName} size={props.iconSize} />}
      buttonStyle={styles.button}
      onPress={props.onPress}
    />
  );
};

ArrowButton.defaultProps = {
  iconSize: 12,
};

export default ArrowButton;
