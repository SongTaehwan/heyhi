import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { st } from '@constant';

interface TextButtonProps extends TouchableOpacityProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: st.Pallette.brightSkyBlue,
  },
});

const TextButton = ({
  text = 'button',
  textStyle,
  ...props
}: TextButtonProps): JSX.Element => {
  const buttonTextStyle = textStyle || styles.textStyle;

  return (
    <TouchableOpacity {...props}>
      <Text style={buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
