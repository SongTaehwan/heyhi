import { Input } from 'react-native-elements';
import { StyleSheet, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  defaultContainer: {
    borderWidth: 1,
    borderRadius: 24,
    height: 50,
    paddingHorizontal: 20,
  },
  active: {
    borderColor: Colors.brightSkyBlue,
  },
  inactive: {
    borderColor: Colors.veryLightPink,
  },
  error: {
    borderColor: 'red',
  },
  defaultInput: {
    fontSize: 15,
  },
});

const TextField = ({
  value,
  onChangeText,
  inputContainerStyle,
  inputStyle,
  placeholder,
  hasError,
  ...props
}: TextFieldProps): JSX.Element => {
  const [focused, setFocus] = useState(false);

  const onFocus = (): void => {
    setFocus(true);
  };

  const onBlur = (): void => {
    setFocus(false);
  };

  const inputContainer = StyleSheet.flatten([
    styles.defaultContainer,
    styles.inactive,
    focused && styles.active,
    hasError && styles.error,
    inputContainerStyle,
  ]);

  const inputComponentStyle = StyleSheet.flatten([
    styles.defaultInput,
    inputStyle,
  ]);

  return (
    <Input
      value={value}
      containerStyle={styles.container}
      inputContainerStyle={inputContainer}
      inputStyle={inputComponentStyle}
      placeholder={placeholder}
      placeholderTextColor={Colors.veryLightPink}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChangeText}
      onSubmitEditing={Keyboard.dismiss}
      {...props}
    />
  );
};

export default TextField;
