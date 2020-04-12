import { Dimensions } from 'react-native';

export const getScreenWidth = (): number => {
  return Math.round(Dimensions.get('window').width);
};

export const getScreenHeight = (): number => {
  return Math.round(Dimensions.get('window').height);
};

export const getCircleRadiusSize = (): number => {
  return (getScreenWidth() + getScreenHeight()) / 2;
};
