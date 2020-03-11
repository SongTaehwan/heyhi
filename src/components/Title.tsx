import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-elements';

interface TitleProps {
  text: string;
  h1: boolean;
  h2: boolean;
  h3: boolean;
  h4: boolean;
  style: TextStyle;
  children: React.ReactNode | string;
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 24,
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
});

const Title = ({
  text,
  h1,
  h2,
  h3,
  h4,
  style,
  children,
}: TitleProps): JSX.Element => {
  const titleStyle = StyleSheet.flatten([
    styles.defaultText,
    style,
    h1 && StyleSheet.flatten([{ fontSize: 35 }, styles.bold]),
    h2 && StyleSheet.flatten([{ fontSize: 24 }, styles.bold]),
    h3 && StyleSheet.flatten([{ fontSize: 18 }, styles.bold]),
    h4 && StyleSheet.flatten([{ fontSize: 15 }, styles.bold]),
  ]);

  return <Text style={titleStyle}>{children || text}</Text>;
};

Title.defaultProps = {
  text: 'Title',
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  style: {},
  children: '',
};

export default Title;
