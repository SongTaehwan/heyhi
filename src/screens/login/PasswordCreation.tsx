import React, { useState } from 'react';
import {
  PinCode,
  Layout,
  Title,
  ContentLayer,
  BarButton,
  VSpace,
  Divider,
  TextButton,
} from '@components';
import { LoginStackParamList } from '@routes/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface PasswordCreationProps {
  navigation: StackNavigationProp<LoginStackParamList, 'PasswordCreation'>;
  route: RouteProp<LoginStackParamList, 'PasswordCreation'>;
}

const PasswordCreation = ({
  navigation,
}: PasswordCreationProps): JSX.Element => {
  const [password, setPassword] = useState('');

  const getUserPassword = (userPassword: string): void => {
    console.log(userPassword);
    setPassword(userPassword);
  };

  return (
    <Layout>
      <ContentLayer>
        <Title text="Log in to Hey, Hi!" />
        <VSpace space={30} />
        <PinCode onFulfill={getUserPassword} />
        <VSpace space={40} />
        <Divider />
        <VSpace space={30} />
        <TextButton text="Haven’t you get received a code?" />
      </ContentLayer>
      <BarButton title="NEXT" disabled={password.length === 0} />
    </Layout>
  );
};

export default PasswordCreation;
