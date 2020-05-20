import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BackButton extends TouchableWithoutFeedbackProps {
  containerStyle?: StyleProp<ViewStyle>;
  canGoBack: boolean;
}

const styles = StyleSheet.create({
  alignment: {
    height: 40,
    width: 40,
  },
});

const BackButton = ({
  containerStyle,
  canGoBack,
  ...rest
}: BackButton): JSX.Element => {
  const navigation = useNavigation();
  const goBackToPreviousScreen = (): void => {
    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[containerStyle]}
      onPress={goBackToPreviousScreen}
      {...rest}>
      <Icon name={'chevron-left'} size={40} style={styles.alignment} />
    </TouchableOpacity>
  );
};

export default BackButton;
