import { CheckBox } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import React from 'react';
import { CheckboxProps, CheckboxType } from './types';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight: 0,
    fontWeight: '400',
  },
});

const Checkbox: CheckboxType = ({
  value,
  checked = false,
  large,
  title,
  wrapperStyle,
  textStyle,
  onPress,
  ...rest
}: CheckboxProps): JSX.Element => {
  const handler = (): void => {
    if (onPress) {
      onPress(value || '', checked);
    }
  };

  return (
    <CheckBox
      checked={checked}
      size={large ? 35 : 25}
      title={title}
      wrapperStyle={wrapperStyle}
      containerStyle={styles.container}
      textStyle={StyleSheet.flatten([styles.text, textStyle])}
      checkedIcon="check-square"
      checkedColor={Colors.brightSkyBlue}
      onPress={handler}
      {...rest}
    />
  );
};

export default Checkbox;
