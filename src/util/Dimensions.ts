import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const getScreenWidth = (): number => {
  return Math.round(screenWidth);
};

export const getScreenHeight = (): number => {
  return Math.round(screenHeight);
};

export const getCircleRadiusSize = (): number => {
  return (getScreenWidth() + getScreenHeight()) / 2;
};

export const getRelativeWidth = (width: number, comparison = 375): number => {
  const ratio = parseFloat((width / comparison).toFixed(2));
  return ratio * screenWidth;
};

export const getRelativeHeight = (height: number, comparison = 667): number => {
  const ratio = parseFloat((height / comparison).toFixed(2));
  return ratio * screenHeight;
};
