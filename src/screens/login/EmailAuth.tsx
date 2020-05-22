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
import { LoginFlowProps, Screens } from '@routes/types';
import { AUTHENTICATION } from '@api/mutation';

type EmailAuthProps = LoginFlowProps<Screens.EmailAuth>;

interface UpdateResult {
  updateMember: {
    id: number;
  };
}

const EmailAuth = ({ navigation, route }: EmailAuthProps): JSX.Element => {
  const { email } = route.params;
  const [verificationCode, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [sendEmail] = useMutation(AUTHENTICATION.SEND_EMAIL, {
    variables: {
      data: {
        email,
      },
    },
    notifyOnNetworkStatusChange: false,
    fetchPolicy: 'no-cache',
    onError: (error): void => {
      console.log('Error while Sending Auth email: ', error);
      const message = error.message.split(': ').pop() as string;
      setErrorMessage(message);
    },
  });

  const sendAuthEmail = (): void => {
    sendEmail();
  };

  const [sendAuth, { loading }] = useMutation<UpdateResult>(
    AUTHENTICATION.VERIFY_CODE,
    {
      variables: {
        data: { verifyCode: verificationCode, email },
      },
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: ({ updateMember: { id } }) => {
        navigation.navigate(Screens.NewPassword, {
          userId: id,
        });
      },
      onError: (error) => {
        console.log('Error while Sending verification code: ', error);
        const message = error.message.split(': ').pop() as string;
        setErrorMessage(message);
      },
    },
  );

  const onChangeVerificationCode = (code: string): void => {
    setPassword(code);
  };

  const onSubmitButton = (): void => {
    sendAuth();
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text="Log in to Hey, Hi!" />
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
