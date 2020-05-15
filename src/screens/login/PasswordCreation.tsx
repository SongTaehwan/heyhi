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
import { LoginFlowProps, Screens } from '@routes/types';
import { useMutation } from '@apollo/react-hooks';
import { AUTHENTICATION } from '@api/mutation';

type PasswordCreationProps = LoginFlowProps<Screens.PasswordCreation>;

const PasswordCreation = ({
  navigation,
  route,
}: PasswordCreationProps): JSX.Element => {
  const [password, setPassword] = useState('');
  const { checkEmail } = route.params;

  const [verifyCode] = useMutation(AUTHENTICATION.VERIFY_CODE, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const getUserPassword = (userPassword: string): void => {
    console.log(userPassword);
    setPassword(userPassword);
  };

  return (
    <Layout>
      <ContentLayer>
        <Title text="Log in to Hey, Hi!" />
        <VSpace space={30} />
        <PinCode codeLength={6} onFulfill={getUserPassword} />
        <VSpace space={40} />
        <Divider />
        <VSpace space={30} />
        <TextButton text="Haven’t you get received a code?" />
      </ContentLayer>
      <BarButton
        title="NEXT"
        disabled={password.length === 0}
        onPress={(): void => {
          console.log('password', password);
          console.log('checkEmail', checkEmail);

          verifyCode({
            variables: {
              data: { verifyCode: password + '', email: checkEmail },
            },
          });
        }}
      />
    </Layout>
  );
};

export default PasswordCreation;
