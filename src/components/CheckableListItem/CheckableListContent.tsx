import { StyleSheet } from 'react-native';
import React from 'react';
import { CheckableListContentProps, CheckableListContentType } from '../types';
import HorizontalView from '../layout/HorizontalView';
import ListContent from '../layout/ListContent';
import TextButton from '../button/TextButton';
import HSpace from '../spacer/HSpace';
import Text from '../Text';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  labelText: {
    fontSize: 13,
    color: Colors.veryLightPink,
    lineHeight: 30,
  },
  buttonText: {
    fontSize: 13,
    color: Colors.brightSkyBlue,
    lineHeight: 30,
    textDecorationLine: 'underline',
  },
});

const CheckableListContent: CheckableListContentType = ({
  title = 'Title',
  containerStyle,
  textButtonLabelText = 'mandatory',
  textButtonTitle = 'Details',
  onPress,
}: CheckableListContentProps): JSX.Element => {
  return (
    <ListContent containerStyle={containerStyle} contentText={title}>
      <HorizontalView>
        <Text text={textButtonLabelText} style={styles.labelText} />
        <HSpace />
        <TextButton
          text={textButtonTitle}
          textStyle={styles.buttonText}
          onPress={onPress}
        />
      </HorizontalView>
    </ListContent>
  );
};

export default CheckableListContent;
