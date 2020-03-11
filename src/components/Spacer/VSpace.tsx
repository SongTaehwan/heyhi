import { View } from 'react-native';
import React from 'react';
import { SpaceProp } from '@components/spacer/types';

const VSpace: React.FC<SpaceProp> = ({ space }: SpaceProp): JSX.Element => {
  return <View style={{ marginVertical: space / 2 }} />;
};

export default VSpace;
