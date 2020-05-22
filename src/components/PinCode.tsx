import CodeInput, {
  CodeInputProps,
} from 'react-native-confirmation-code-input';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  defaultContainerStyle: {
    justifyContent: 'space-between',
    flexGrow: 0,
    paddingTop: 0,
  },
  cellStyle: {
    borderRadius: 16,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
});

const PinCode = ({ onFulfill, ...rest }: CodeInputProps): JSX.Element => {
  return (
    <CodeInput
      size={48}
      space={5}
      codeLength={5}
      cellBorderWidth={1}
      codeInputStyle={styles.cellStyle}
      inactiveColor={Colors.veryLightPinkTwo}
      activeColor={Colors.brightSkyBlue}
      containerStyle={styles.defaultContainerStyle}
      keyboardType={'numeric'}
      onFulfill={onFulfill}
      {...rest}
    />
  );
};

export default PinCode;
