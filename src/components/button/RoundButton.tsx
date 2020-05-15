import { StyleSheet, View } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import React from 'react';
import { Colors } from '@constants';
import Tooltip from './Tooltip';

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  button: {
    borderColor: Colors.brightSkyBlue,
  },
});

const RoundButton = (props: ButtonProps): JSX.Element => {
  return (
    <View>
      <Tooltip>
        <Button
          title="EN"
          type={'outline'}
          containerStyle={[styles.container, props.containerStyle]}
          buttonStyle={[styles.container, styles.button, props.buttonStyle]}
        />
      </Tooltip>
    </View>
  );
};

export default RoundButton;
