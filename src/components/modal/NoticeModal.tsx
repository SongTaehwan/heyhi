import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HorizontalView from '../layout/HorizontalView';
import { Colors } from '../../constants';
import ImageView from '../ImageView';
import Text from '../Text';

export interface NoticeModalProps extends ModalProps {
  onClosePress?(): void;
}

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    alignItems: 'center',
  },
  contentConatiner: {
    width: wp(85),
    minHeight: hp(40),
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Colors.drawShadow({
      width: 0,
      height: 3,
      opacity: 0.16,
      radius: 6,
      elevation: 2,
    }),
  },
  contentHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.veryLightPinkTwo,
  },
  closeContainer: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
});

const NoticeModal = ({
  isVisible = false,
  children,
  onClosePress,
  ...rest
}: Partial<NoticeModalProps>): JSX.Element => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      style={styles.modalStyle}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={900}
      animationOutTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      {...rest}>
      <View style={styles.contentConatiner}>
        <HorizontalView
          style={styles.contentHeader}
          horizontalAlign={'center'}
          verticalAlign={'center'}>
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={onClosePress}>
            <ImageView
              source={require('./assets/iconExitActive.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Text bold text="Notice" />
        </HorizontalView>
        {children}
      </View>
    </Modal>
  );
};

export default NoticeModal;
