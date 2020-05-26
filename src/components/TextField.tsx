import { StyleSheet, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import React, { useState } from 'react';
import { Colors, StyleSheets } from '@constants';
import { TextFieldProps } from './types';

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
  refId = null,
  inputRef,
  customRef,
  value,
  onChangeText,
  inputContainerStyle,
  inputStyle,
  placeholder,
  renderErrorMessage = false,
  hasError = false,
  autoCapitalize = 'none',
  autoCorrect = false,
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
    StyleSheets.text.baseText(),
    inputStyle,
  ]);

  const mapRefWithId = (node: Input): void => {
    if (customRef && node) {
      customRef(node, refId);
    }
  };

  return (
    <Input
      ref={inputRef || mapRefWithId}
      value={value}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      containerStyle={styles.container}
      inputContainerStyle={inputContainer}
      inputStyle={inputComponentStyle}
      placeholder={placeholder}
      placeholderTextColor={Colors.veryLightPink}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChangeText}
      onSubmitEditing={Keyboard.dismiss}
      renderErrorMessage={renderErrorMessage}
      {...props}
    />
  );
};

export default TextField;
