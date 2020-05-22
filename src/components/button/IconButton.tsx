import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import React from 'react';
import { IconButtonProps } from './types';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  icon: {
    fontSize: 30,
  },
});

const IconButton = (props: IconButtonProps): JSX.Element => {
  const iconColor = props.disabled ? Colors.blueyGrey : Colors.brightSkyBlue;

  return (
    <Button
      icon={
        <Icon
          style={props.style ? props.style : styles.icon}
          name={props.iconName}
          size={props.iconSize}
          color={iconColor}
        />
      }
      buttonStyle={
        props.iconContainerStyle ? props.iconContainerStyle : styles.button
      }
      disabled={props.disabled}
      onPress={props.onPress}
    />
  );
};

export default IconButton;
