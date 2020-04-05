import CodeInput, {
  CodeInputProps,
} from 'react-native-confirmation-code-input';
import React from 'react';
import { StyleSheet } from 'react-native';
import { st } from '@constant';

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flexGrow: 0,
  },
  cellStyle: {
    borderRadius: 16,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
});

const PinCode = (props: CodeInputProps): JSX.Element => {
  return <CodeInput {...props} onFulfill={props.onFulfill} />;
};

PinCode.defaultProps = {
  inactiveColor: st.Pallette.veryLightPinkTwo,
  activeColor: st.Pallette.brightSkyBlue,
  cellBorderWidth: 1,
  codeLength: 5,
  size: 48,
  space: 10,
  codeInputStyle: styles.cellStyle,
  keyboardType: 'numeric',
  containerStyle: styles.defaultContainerStyle,
};
export default PinCode;
