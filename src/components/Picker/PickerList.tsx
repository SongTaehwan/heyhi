import { FlatList } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';

const styles = StyleSheet.create({
  style,
});

const DropBoxList = (): JSX.Element => {
  return (
    <Modal
      isVisible={modal}
      style={{ justifyContent: 'flex-start', margin: 0 }}>
      <View />
    </Modal>
  );
};

export default DropBoxList;
