import { StyleSheet } from 'react-native';
import Colors from './colors';

export const TextStyles = StyleSheet.create({
  HeadLine: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.darkSlateBlue,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkSlateBlue,
  },
  LargeBody: {
    fontSize: 18,
    color: Colors.darkSlateBlue,
  },

  SecondaryBodyBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.darkSlateBlue,
  },
  SecondaryBody: {
    fontSize: 15,
    color: Colors.darkSlateBlue,
  },
  BodyBold: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.darkSlateBlue,
  },
  Body: {
    fontSize: 13,
    color: Colors.darkSlateBlue,
  },
  Placeholder: {
    fontSize: 11,
    color: Colors.darkSlateBlue,
  },
  Button: {
    fontSize: 15,
    color: Colors.darkSlateBlue,
  },
});

export const ParagraphStyles = StyleSheet.create({
  LargeBody: {
    lineHeight: 30,
    fontSize: 18,
    color: Colors.darkSlateBlue,
  },
  Body: {
    lineHeight: 24,
    fontSize: 15,
    color: Colors.darkSlateBlue,
  },
  SmallBody: {
    lineHeight: 17,
    fontSize: 13,
    color: Colors.darkSlateBlue,
  },
});

export const ContainerStyles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: 'white',
  },
  topless: {
    paddingTop: 0,
  },
  bottomless: {
    paddingBottom: 0,
  },
});

export default {
  ParagraphStyles,
  TextStyles,
  ContainerStyles,
};
