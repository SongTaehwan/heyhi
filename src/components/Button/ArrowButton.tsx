import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

interface ArrowButtonProps {
  iconName: string;
  iconSize: number;
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    backgroundColor: '#fff',
  },
});

const ArrowButton = (props: ArrowButtonProps): JSX.Element => {
  return (
    <Button
      icon={<Icon name={props.iconName} size={props.iconSize} />}
      buttonStyle={styles.button}
    />
  );
};

ArrowButton.defaultProps = {
  iconSize: 12,
};

export default ArrowButton;
