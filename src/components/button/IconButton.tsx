import { IconButtonProps as RNEiconButtonProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@constants';

interface IconButtonProps extends RNEiconButtonProps {
  canGoBack?: boolean;
}

const IconButton = ({
  name = 'chevron-left',
  iconStyle,
  canGoBack = false,
  size = 40,
  onPress,
  ...rest
}: IconButtonProps): JSX.Element => {
  const navigation = useNavigation();
  const goBackToPreviousScreen = (): void => {
    if (canGoBack) {
      navigation.goBack();
    }
  };

  const mergedIconStyle = StyleSheet.flatten([
    { width: size, height: size, marginRight: 0 },
    iconStyle,
  ]);

  return (
    <Icon.Button
      name={name}
      size={size}
      iconStyle={mergedIconStyle}
      color={Colors.black}
      backgroundColor={'transparent'}
      activeOpacity={0.3}
      underlayColor={'transparent'}
      onPress={onPress || goBackToPreviousScreen}
      {...rest}
    />
  );
};

export default IconButton;
