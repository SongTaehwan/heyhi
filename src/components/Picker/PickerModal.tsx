import Modal, { ModalProps } from 'react-native-modal';
import { StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';

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
});

const PickerModal = ({
  isVisible,
  children,
  ...props
}: Partial<PickerModalProps>): JSX.Element => {
  return (
    <Modal isVisible={isVisible} style={styles.modalStyle} {...props}>
      {children}
    </Modal>
  );
};

export default PickerModal;
