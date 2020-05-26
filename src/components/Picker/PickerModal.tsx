import Modal, { ModalProps } from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { TextButton } from '@components';

interface PickerModalProps extends ModalProps {
  isVisible: boolean;
  children: ReactNode;
  onChangeValue: (index: number) => void;
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const PickerModal = ({
  isVisible,
  children,
  onBackdropPress,
  ...props
}: Partial<PickerModalProps>): JSX.Element => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalStyle}
      onBackdropPress={onBackdropPress}
      {...props}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TextButton
            text="닫기"
            textStyle={styles.buttonText}
            onPress={onBackdropPress}
          />
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default PickerModal;
