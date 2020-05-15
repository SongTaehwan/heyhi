import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import React from 'react';
import { Colors } from '@constants';

interface CheckableButtonProps extends Omit<ButtonProps, 'onPress'> {
  value: string;
  checked: boolean;
  onPress: (value: string) => void;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  default: {
    borderWidth: 1,
    borderRadius: 24,
    width: '100%',
    height: 36,
    backgroundColor: 'transparent',
  },
  activeBorder: {
    borderColor: Colors.brightSkyBlue,
  },
  inactiveBorder: {
    borderColor: Colors.veryLightPink,
  },
  ttile: {
    fontSize: 15,
  },
  activeTitle: {
    color: Colors.brightSkyBlue,
  },
  inactiveTitle: {
    color: Colors.veryLightPink,
  },
});

const CheckableButton = ({
  value,
  title = 'title',
  checked = false,
  titleStyle,
  containerStyle,
  buttonStyle,
  onPress,
}: Partial<CheckableButtonProps>): JSX.Element => {
  const onPressHandler = (): void => {
    if (onPress) {
      onPress(value || '');
    }
  };

  return (
    <Button
      title={title}
      type="outline"
      containerStyle={[styles.container, containerStyle]}
      buttonStyle={[
        styles.default,
        buttonStyle,
        checked ? styles.activeBorder : styles.inactiveBorder,
      ]}
      titleStyle={[
        styles.ttile,
        titleStyle,
        checked ? styles.activeTitle : styles.inactiveTitle,
      ]}
      onPress={onPressHandler}
    />
  );
};

export default CheckableButton;
