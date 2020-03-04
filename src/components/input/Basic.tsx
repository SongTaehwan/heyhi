import React from 'react';
import { Input } from 'react-native-elements';

type Props = {
  placeHolder: string;
};

const Basic = ({ placeHolder }: Props) => {
  return <Input placeholder={''} />;
};

export default Basic;
