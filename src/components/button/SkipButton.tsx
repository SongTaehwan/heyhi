import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import { StyleSheets } from '@constants';

interface SkipButtonProps extends TouchableWithoutFeedbackProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  size: StyleSheets.setDimension(62, 30),
});

const SkipButton = ({
  containerStyle,
  ...rest
}: SkipButtonProps): JSX.Element => {
  const navigation = useNavigation();

  const skipTutorial = (): void => {
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={skipTutorial} {...rest}>
      <Image source={require('./assets/skipButton.png')} style={styles.size} />
    </TouchableOpacity>
  );
};

export default SkipButton;
