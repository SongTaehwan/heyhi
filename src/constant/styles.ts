const Pallette = {
  white: '#ffffff',
  robinSEgg: '#5adbff',
  brightSkyBlue: '#00c7ff',
  vibrantBlue: '#0045ff',
  brightSeaGreen: '#00ffa7',
  darkSlateBlue: '#172b4d',
  purpley: '#7764e4',
  blueyGrey: '#8898aa',
};

const TextStyles = {
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

const ParagraphStyles = {
  LargeBody: {
    height: 30,
    fontSize: 18,
    color: Pallette.darkSlateBlue,
  },
  Body: {
    height: 24,
    fontSize: 15,
    color: Pallette.darkSlateBlue,
  },
  SmallBody: {
    height: 17,
    fontSize: 13,
    color: Pallette.darkSlateBlue,
  },
};

export default {
  Pallette,
  TextStyles,
  ParagraphStyles,
};
