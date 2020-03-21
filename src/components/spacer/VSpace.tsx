import { View } from 'react-native';
import React from 'react';
import { SpaceProp } from './types';

const VSpace: React.FC<SpaceProp> = ({
  space = 10,
}: SpaceProp): JSX.Element => {
  return <View style={{ marginVertical: space / 2 }} />;
};

export default VSpace;
