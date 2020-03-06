import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import { Pallette } from '@constant/styles';

import { CheckableButton } from './types';

const styles = StyleSheet.create({
  outline: {
    borderColor: Pallette.brightSkyBlue,
  },
  solid: {
    backgroundColor: Pallette.brightSkyBlue,
    borderColor: Pallette.brightSkyBlue,
  },
});

const YesButton = (props: CheckableButton): JSX.Element => {
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

  const iconStyle = { color: props.outline ? Pallette.brightSkyBlue : '#fff' };

  return (
    <Button
      icon={<Icon name={'thumbs-up'} style={iconStyle} />}
      titleStyle={titleStyle}
      title={'Yes!'}
      type={props.type}
      buttonStyle={[buttonStyle]}
      onPress={props.onPress}
    />
  );
};

YesButton.defaultProps = {
  type: 'outline',
};

export default YesButton;
