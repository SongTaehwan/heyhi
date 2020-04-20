import React, { useState, useRef, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { st } from '@constant';
import { WheelPicker } from 'react-native-wheel-picker-android';

interface PickerProps {
  children: ReactNode;
  label: string;
  containerStyle: StyleProp<ViewStyle>;
}

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
const Picker = ({
  label,
  containerStyle,
  children,
  ...props
}: PickerProps): JSX.Element => {
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

  const openModal = (): void => {
    container.current.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number,
      ): void => {
        console.log(Dimensions.get('window').height);
        console.log(Dimensions.get('window').width);

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

  const wheelPickerData = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];
  return (
    <View style={styles.container}>
      <WheelPicker data={wheelPickerData} onItemSelected={0} />
    </View>
  );
};

Picker.defaultProps = {
  label: 'Dropdown',
};

export default Picker;
