import React from 'react';
import { Button } from 'react-native-elements';
import { ClickableButton } from './types';
import { StyleSheet } from 'react-native';
import st from '@styles';

const styles = StyleSheet.create({
  square: {
    height: 60,
    borderColor: st.Pallette.brightSkyBlue,
  },
  round: {
    height: 48,
    borderRadius: 25,
    borderColor: st.Pallette.brightSkyBlue,
  },
  largeFont: {
    fontSize: 24,
    fontWeight: 'bold',
    color: st.Pallette.brightSkyBlue,
  },
  smallFont: {
    fontSize: 15,
    fontWeight: 'bold',
    color: st.Pallette.brightSkyBlue,
  },
});

const ConfirmButton = (props: ClickableButton): JSX.Element => {
  const buttonStyle =
    props.buttonStyle ?? props.square ? styles.square : styles.round;
  const titleStyle =
    props.titleStyle ?? props.square ? styles.largeFont : styles.smallFont;

  return (
    <Button
      title={props.title}
      type={'outline'}
      onPress={props.onPress}
      loading={props.loading}
      loadingStyle={props.loadingStyle}
      containerStyle={props.containerStyle}
      titleStyle={titleStyle}
      buttonStyle={buttonStyle}
    />
  );
};

ConfirmButton.defaultProps = {
  square: false,
  title: 'YES',
};

export default ConfirmButton;
