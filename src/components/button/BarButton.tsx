import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import React from 'react';
import { ClickableButton } from './types';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  square: {
    backgroundColor: Colors.brightSkyBlue,
    height: 60,
  },
  round: {
    backgroundColor: Colors.brightSkyBlue,
    height: 48,
    borderRadius: 25,
  },
  largeFont: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  smallFont: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  disabledStyle: {
    backgroundColor: Colors.veryLightPink,
  },
  disabledTitle: {
    color: 'white',
  },
});

const BarButton = (props: ClickableButton): JSX.Element => {
  const defaultButtonStyle =
    props.buttonStyle ?? props.round ? styles.round : styles.square;
  const titleStyle =
    props.titleStyle ?? props.round ? styles.smallFont : styles.largeFont;
  const disabledStyle = props.disabledStyle ?? styles.disabledStyle;
  const disabledTitleStyle = props.disabledTitleStyle ?? styles.disabledTitle;

  return (
    <Button
      containerStyle={props.containerStyle}
      title={props.title}
      type={'solid'}
      onPress={props.onPress}
      loading={props.loading}
      loadingStyle={props.loadingStyle}
      disabled={props.disabled}
      disabledStyle={disabledStyle}
      disabledTitleStyle={disabledTitleStyle}
      titleStyle={titleStyle}
      buttonStyle={[defaultButtonStyle, props.buttonStyle]}
    />
  );
};

BarButton.defaultProps = {
  round: false,
  title: 'Click',
  containerStyle: {
    width: '100%',
  },
};

export default BarButton;
