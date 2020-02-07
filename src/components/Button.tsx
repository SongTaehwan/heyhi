import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Button = () => {
  return (
    <TouchableOpacity style={styles.viewStyle}>
      <View>
        <Text style={styles.fontColor}>Button!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'blue',
  },
  fontColor: {
    color: 'tomato',
  },
});
