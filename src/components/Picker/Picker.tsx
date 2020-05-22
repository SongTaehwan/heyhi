import { WheelPicker, DatePicker } from 'react-native-wheel-picker-android';
import { Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';
import React, { useState, ReactNode } from 'react';
import { Colors } from '@constants';
import PickerModal from './PickerModal';

interface PickerProps {
  value: string;
  onChangeValue: (index: number) => void;
  children: ReactNode;
  placeholder: string;
  containerStyle: StyleProp<ViewStyle>;
  data: string[];
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentStyle: {
    borderWidth: 1,
    borderRadius: 24,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  activeBorder: {
    borderColor: Colors.brightSkyBlue,
  },
  inactiveBorder: {
    borderColor: Colors.veryLightPink,
  },
  title: {
    fontSize: 15,
    lineHeight: 30,
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
    color: Colors.brightSkyBlue,
  },
});

const Picker = ({
  value,
  placeholder = 'placeholder',
  containerStyle,
  children,
  ...props
}: Partial<PickerProps>): JSX.Element => {
  const [modalState, setModal] = useState(false);

  const toggleModal = (): void => {
    setModal(!modalState);
  };

  return (
    <TouchableOpacity
      containerStyle={styles.container}
      style={[
        styles.contentStyle,
        containerStyle,
        modalState ? styles.activeBorder : styles.inactiveBorder,
      ]}
      onPress={toggleModal}>
      <Text style={styles.title}>{value || placeholder}</Text>
      <Icon size={28} name={'triangle-down'} style={styles.arrowIcon} />
      <PickerModal
        isVisible={modalState}
        onBackdropPress={toggleModal}
        {...props}>
        {children}
      </PickerModal>
    </TouchableOpacity>
  );
};

Picker.WheelItem = WheelPicker;
Picker.DateItem = DatePicker;

export default Picker;
