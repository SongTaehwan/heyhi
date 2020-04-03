import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, CheckBoxProps } from 'react-native-elements';
import { st } from '@constant';

interface CheckboxProps extends CheckBoxProps {
  large?: boolean;
}

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

const Checkbox = ({
  checked = false,
  large,
  size,
  title = 'title',
  wrapperStyle,
  textStyle,
  ...rest
}: CheckboxProps): JSX.Element => {
  return (
    <CheckBox
      checked={checked}
      size={large ? 35 : 25}
      title={title}
      wrapperStyle={wrapperStyle}
      containerStyle={styles.container}
      textStyle={StyleSheet.flatten([styles.text, textStyle])}
      checkedIcon="check-square-o"
      checkedColor={st.Pallette.brightSkyBlue}
      uncheckedColor="black"
      uncheckedIcon="square-o"
      {...rest}
    />
  );
};

export default Checkbox;
