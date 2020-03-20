import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Dropdown, DropDownProps } from 'react-native-material-dropdown';
import { st } from '@constant';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pickerWrapper: {
    borderBottomWidth: 0,
    borderRadius: 20,
    backgroundColor: 'red',
  },
});

// TODO: Implement Dropdown
const DropBox = ({
  label,
  containerStyle,
  ...props
}: DropDownProps): JSX.Element => {
  const [modal, setModal] = useState(false);
  const container = useRef(null);
  // const wrapperStyle = StyleSheet.flatten([styles.container, containerStyle]);

  const openModal = (): void => {
    container.current.measure((fx, fy, width, height, px, py): void => {
      console.log(Dimensions.get('window').height);
      console.log(Dimensions.get('window').width);
      // debugger;
    });
    setModal(true);
  };

  // const handleLayout = ():void => {};
  return (
    <TouchableOpacity
      ref={container}
      style={{
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: st.Pallette.brightSkyBlue,
      }}
      onPress={openModal}>
      {/* onLayout={handleLayout}> */}
      <View>
        <Text>{'dropdown'}</Text>
      </View>
      <Modal isVisible={modal}>
        <View>
          <Text>asfasdf</Text>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

DropBox.defaultProps = {
  label: 'Dropdown',
};

export default DropBox;
