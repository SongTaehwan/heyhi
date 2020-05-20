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

const ArrowButton = ({
  iconName = 'angle-left',
  iconSize = 30,
  onPress,
  icon,
}: IconButtonProps): JSX.Element => {
  return (
    <Button
      icon={icon || <Icon name={iconName} size={iconSize} />}
      buttonStyle={styles.button}
      onPress={onPress}
    />
  );
};

export default ArrowButton;
