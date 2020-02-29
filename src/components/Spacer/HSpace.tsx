import { View } from 'react-native';
import React from 'react';
import { SpaceProp } from './types';

const HSpace: React.FC<SpaceProp> = ({ space }: SpaceProp): JSX.Element => {
  return <View style={{ marginHorizontal: space / 2 }} />;
};

export default HSpace;
