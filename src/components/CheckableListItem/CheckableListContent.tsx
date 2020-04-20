import { StyleProp, ViewStyle, StyleSheet, Picker } from 'react-native';
import React from 'react';
import ListContent from '../layout/ListContent';
import TextButton from '../button/TextButton';
import Text from '../Text';
import { CheckableListContentProps, CheckableListContentType } from '../types';
import HorizontalView from '../layout/HorizontalView';
import { st } from '@constant';
import HSpace from '../spacer/HSpace';

const styles = StyleSheet.create({
  labelText: {
    fontSize: 13,
    color: st.Pallette.veryLightPink,
    lineHeight: 30,
  },
  buttonText: {
    fontSize: 13,
    color: st.Pallette.brightSkyBlue,
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
        <Text title={textButtonLabelText} style={styles.labelText} />
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
