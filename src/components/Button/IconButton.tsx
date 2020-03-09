import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import { Pallette } from '@constant/styles';

import { IconButtonProps } from './types';

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

const IconButton = (props: IconButtonProps): JSX.Element => {
  const iconColor = props.disabled
    ? Pallette.blueyGrey
    : Pallette.brightSkyBlue;

  return (
    <Button
      icon={
        <Icon name={props.iconName} size={props.iconSize} color={iconColor} />
      }
      buttonStyle={styles.button}
      disabled={props.disabled}
      onPress={props.onPress}
    />
  );
};

export default IconButton;
