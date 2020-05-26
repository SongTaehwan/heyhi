import { WheelPicker, DatePicker } from 'react-native-wheel-picker-android';
import { Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import React, { useState, ReactNode } from 'react';
import { Colors } from '@constants';
import PickerModal from './PickerModal';
import { ModalProps } from 'react-native-modal';
import { HorizontalView } from '@components';

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
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
    color: Colors.brightSkyBlue,
    textAlign: 'center',
    width: 28,
    height: 28,
  },
});

const Picker = ({
  value,
  placeholder = 'placeholder',
  containerStyle,
  children,
  backdropOpacity = 0.5,
  ...props
}: Partial<PickerProps> & Partial<ModalProps>): JSX.Element => {
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
      <HorizontalView horizontalAlign={'center'} verticalAlign={'center'}>
        <Text style={styles.title}>{value || placeholder}</Text>
        <Icon
          size={28}
          name={modalState ? 'triangle-up' : 'triangle-down'}
          style={styles.arrowIcon}
        />
      </HorizontalView>
      <PickerModal
        isVisible={modalState}
        onBackdropPress={toggleModal}
        backdropOpacity={backdropOpacity}
        {...props}>
        {children}
      </PickerModal>
    </TouchableOpacity>
  );
};

Picker.WheelItem = WheelPicker;
Picker.DateItem = DatePicker;

export default Picker;
