import React, { useState } from 'react';
import {
  Title,
  VSpace,
  PinCode,
  Content,
  Divider,
  BarButton,
  TextButton,
  ErrorMessage,
  ContentContainer,
} from '@components';
import { useMutation } from '@apollo/react-hooks';
import { Screens } from '@navigator/types';
import { MUTATION_SEND_EMAIL, MUTATION_VERIFY_CODE } from '@api/mutation';
import { LoginNavigationProps } from '@navigator/Routes';

interface VerificationVariables {
  data: {
    email: string;
    verifyCode: string;
  };
}

interface VerificationResult {
  verifyCode: {
    id: number;
  };
}

const EmailAuth = ({
  navigation,
  route,
}: LoginNavigationProps<'EmailAuth'>): JSX.Element => {
  const { email } = route.params;
  const [verificationCode, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [sendEmail] = useMutation(MUTATION_SEND_EMAIL, {
    notifyOnNetworkStatusChange: false,
    fetchPolicy: 'no-cache',
    onError: (error): void => {
      console.log('Error while Sending Auth email: ', error);
      const message = error.message.split(': ').pop() as string;
      setErrorMessage(message);
    },
  });

  const sendAuthEmail = (): void => {
    sendEmail({
      variables: {
        data: {
          email,
        },
      },
    });
  };

  const [sendAuth, { loading }] = useMutation<
    VerificationResult,
    VerificationVariables
  >(MUTATION_VERIFY_CODE, {
    variables: {
      data: {
        email,
        verifyCode: verificationCode,
      },
    },
    notifyOnNetworkStatusChange: false,
    fetchPolicy: 'no-cache',
    onCompleted: ({ verifyCode: { id } }) => {
      navigation.navigate(Screens.NewPassword, {
        userId: id,
      });
    },
    onError: (error) => {
      console.log('Error while Sending verification code: ', error);
      const message = error.message.split(': ').pop() as string;
      setErrorMessage(message);
    },
  });

  const onChangeVerificationCode = (code: string): void => {
    setPassword(code);
  };

  const onSubmitButton = (): void => {
    sendAuth({
      variables: {
        data: {
          email,
          verifyCode: verificationCode,
        },
      },
    });
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text="Log in to Hey, Hi!" center />
        <VSpace space={30} />
        <Title subTitle text={'Sign in your social account'} />
        <VSpace space={20} />
        <PinCode codeLength={6} onFulfill={onChangeVerificationCode} />
        <VSpace space={40} />
        <Divider />
        <VSpace space={30} />
        <TextButton
          text="Haven’t you get received a code?"
          onPress={sendAuthEmail}
        />
      </Content>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
      <BarButton
        title="NEXT"
        loading={loading}
        disabled={verificationCode.length !== 6 || loading}
        onPress={onSubmitButton}
        // onPress={() => navigation.navigate(Screens.NewPassword, { userId: 1 })}
      />
    </ContentContainer>
  );
};

export default EmailAuth;
