import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { Dropdown, DropDownProps } from 'react-native-material-dropdown';
import { st } from '@constant';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';

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
  const [dropMenuStyle, setMenuStyle] = useState({
    height: 0,
    width: 0,
    py: 0,
    px: 0,
    fx: 0,
    fy: 0,
  });
  // const wrapperStyle = StyleSheet.flatten([styles.container, containerStyle]);

  const openModal = (): void => {
    container.current.measure(
      (fx, fy, width, height, px, py): void => {
        console.log(Dimensions.get('window').height);
        console.log(Dimensions.get('window').width);
        // debugger;
        setMenuStyle({
          width,
          height,
          px,
          py,
          fx,
          fy,
        });
      },
    );
    setModal(!modal);
  };

  const getDropMenuStyle = (): ViewStyle => {
    return {
      position: 'absolute',
      width: dropMenuStyle.width,
      backgroundColor: st.Pallette.brightSkyBlue,
      left: dropMenuStyle.fx,
      top: dropMenuStyle.py,
    };
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
      <Modal
        isVisible={modal}
        style={{ justifyContent: 'flex-start', margin: 0 }}>
        <View style={getDropMenuStyle()}>
          <FlatList
            data={[{ item: 123 }, { item: 456 }, { item: 789 }, { item: 10 }]}
            renderItem={({ item: { item }, index }): JSX.Element => {
              console.log(item);
              return (
                <TouchableOpacity>
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(): string => Math.random().toString()}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

DropBox.defaultProps = {
  label: 'Dropdown',
};

export default DropBox;
