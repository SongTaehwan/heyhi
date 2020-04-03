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
import { NavigationFlowProps, LoginStackParamList } from '@routes/types';

type PasswordCreationProps = NavigationFlowProps<
  LoginStackParamList,
  'PasswordCreation'
>;

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
