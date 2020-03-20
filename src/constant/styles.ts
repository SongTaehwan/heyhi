import { StyleSheet, TextStyle } from 'react-native';

export const Pallette = {
  white: '#ffffff',
  robinSEgg: '#5adbff',
  brightSkyBlue: '#00c7ff',
  vibrantBlue: '#0045ff',
  brightSeaGreen: '#00ffa7',
  darkSlateBlue: '#172b4d',
  purpley: '#7764e4',
  blueyGrey: '#8898aa',
  veryLightPink: '#cecece',
  veryLightPinkTwo: '#efefef',
  brightRed: '#F76C6C',
  matterhorn: '#4b4b4b',
  dodgerBlue: '#0076FF',
  lightCyan: '#E5F9FF',
  aliceBlue: '#e5f1ff',
  seashell: '#FFF3E5',
  magnolia: '#F7E5FF',
  caribbeanGreen: '#9de9ff',
  mediumSpringGreen: '#09ECAF',
  columbiaBlue: '#9ECAFF',
  peachOrange: '#ff9b26',
  electricPurple: '#BC25FF',
  caramel: '#ffd19d',
  mauve: '#e19dff',
};

interface Style {
  [key: string]: TextStyle;
}

export const TextStyles: Style = {
  HeadLine: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Pallette.darkSlateBlue,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Pallette.darkSlateBlue,
  },
  LargeBody: {
    fontSize: 18,
    color: Pallette.darkSlateBlue,
  },

  SecondaryBodyBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Pallette.darkSlateBlue,
  },
  SecondaryBody: {
    fontSize: 15,
    color: Pallette.darkSlateBlue,
  },
  BodyBold: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Pallette.darkSlateBlue,
  },
  Body: {
    fontSize: 13,
    color: Pallette.darkSlateBlue,
  },
  Placeholder: {
    fontSize: 11,
    color: Pallette.darkSlateBlue,
  },
  Button: {
    fontSize: 15,
    color: Pallette.darkSlateBlue,
  },
};

export const ParagraphStyles = {
  LargeBody: {
    lineHeight: 30,
    fontSize: 18,
    color: Pallette.darkSlateBlue,
  },
  Body: {
    lineHeight: 24,
    fontSize: 15,
    color: Pallette.darkSlateBlue,
  },
  SmallBody: {
    lineHeight: 17,
    fontSize: 13,
    color: Pallette.darkSlateBlue,
  },
};

export const Container = StyleSheet.create({
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
  Pallette,
  ParagraphStyles,
  TextStyles,
  Container,
};
