import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import { Pallette } from '@constant/styles';

import { CheckableButton } from './types';

const styles = StyleSheet.create({
  outline: {
    borderColor: Pallette.brightRed,
  },
  solid: {
    backgroundColor: Pallette.brightRed,
    borderColor: Pallette.brightRed,
  },
});

const NoButton = (props: CheckableButton): JSX.Element => {
  const commonBtnStyle = {
    width: 140,
    height: 40,
    borderRadius: 20,
    fontSize: 15,
  };
  const titleStyle = {
    color: props.outline ? '#000' : '#fff',
    width: 84,
    fontSize: 15,
  };

  const buttonStyle =
    props.buttonStyle ?? props.outline
      ? { ...styles.outline, ...commonBtnStyle }
      : { ...styles.solid, ...commonBtnStyle };

  return (
    <Button
      icon={
        <Icon
          name={'thumbs-down'}
          style={{ color: props.outline ? Pallette.brightRed : '#fff' }}
        />
      }
      titleStyle={titleStyle}
      title={'No'}
      type={props.type}
      buttonStyle={buttonStyle}
      onPress={props.onPress}
    />
  );
};

NoButton.defaultProps = {
  type: 'outline',
};

export default NoButton;
