import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { st } from '@style';

interface TooltipProps {
  tipText: string;
}

const styles = StyleSheet.create({
  bar: {
    height: 22,
    width: 78,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: st.Pallette.brightSkyBlue,
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: st.Pallette.brightSkyBlue,
    transform: [{ rotate: '180deg' }],
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

const Tooltip = (props: TooltipProps): JSX.Element => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ alignItems: 'center', backgroundColor: 'orange' }}>
        <View style={styles.bar}>
          <Text style={styles.tipText}>English</Text>
        </View>
        <View style={styles.pointer} />
        {props.children}
      </View>
    </View>
  );
};

export default Tooltip;
