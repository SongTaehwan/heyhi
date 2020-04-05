import { StyleSheet, View } from 'react-native';
import { Button, Text, ButtonProps } from 'react-native-elements';
import React from 'react';
import st from '@styles';
import Tooltip from './Tooltip';

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  button: {
    borderColor: st.Pallette.brightSkyBlue,
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
