import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useRef } from 'react';
import { Keyboard, Alert } from 'react-native';
import { Input } from 'react-native-elements';

import {
  Title,
  VSpace,
  Content,
  BarButton,
  TextField,
  ErrorMessage,
  ContentContainer,
} from '@components';
import {
  MUTATION_SEND_EMAIL,
  MUTATION_UPDATE_MEMBER_EMAIL,
} from '@api/mutation';
import { TextFieldProps } from '@components/types';
import useText from '@hooks/useText';

const initialErrorState = {
  message: '',
  fromEmail: false,
  fromCode: false,
};

const ChangeEmail = (): JSX.Element => {
  const [email, setEmail, isValidEmail] = useText('', {
    isEmail: true,
    delayTime: 0,
  });

  const [verificationCode, setCode] = useText('');
  const [showVerificationField, setShowInput] = useState(false);
  const [error, setError] = useState(initialErrorState);
  const emailRef = useRef<Input | null>(null);
  const codeRef = useRef<Input | null>(null);

  const setEmailRef = (node: Input): void => {
    if (node) {
      emailRef.current = node;
    }
  };

  const setCodeRef = (node: Input): void => {
    if (node) {
      codeRef.current = node;
    }
  };

  const [sendEmail, { loading: isSending }] = useMutation(MUTATION_SEND_EMAIL, {
    variables: {
      data: {
        email,
      },
    },
    notifyOnNetworkStatusChange: false,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setShowInput(true);
      setError(initialErrorState);
    },
    onError: (error) => {
      console.log('Error while sending email with verification code: ', error);

      const message = error.message.split(': ').pop() as string;

      setError({
        message,
        fromEmail: true,
        fromCode: false,
      });

      if (emailRef.current !== null) {
        emailRef.current?.shake();
      }
    },
  });

  const [updateMemberEmail, { loading: isVerifying }] = useMutation(
    MUTATION_UPDATE_MEMBER_EMAIL,
    {
      variables: {
        data: {
          email,
          verifyCode: verificationCode,
        },
      },
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: async () => {
        Alert.alert('이메일이 변경되었습니다.');
        await AsyncStorage.multiRemove(['ACCESS_TOKEN', 'REFRESH_TOKEN']);
      },
      onError: (error) => {
        console.log('Error while verifying code: ', error.message);

        const { message } = JSON.parse(
          error.message.split(': ').pop() as string,
        );

        setError({
          message,
          fromEmail: false,
          fromCode: true,
        });

        if (codeRef.current !== null) {
          codeRef.current?.shake();
        }
      },
    },
  );

  const sendVerificationMail = (): void => {
    if (isValidEmail) {
      sendEmail();
      Keyboard.dismiss();
    }
  };

  const handleVerificationCode = (): void => {
    if (verificationCode.length === 6) {
      updateMemberEmail();
      Keyboard.dismiss();
    }
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text={'Verify your email'} center />
        <VSpace space={30} />
        <TextField
          value={email}
          inputRef={setEmailRef}
          hasError={error.fromEmail}
          enablesReturnKeyAutomatically
          onChangeText={setEmail}
          placeholder={'Type your email'}
          returnKeyType={'done'}
          onSubmitEditing={isValidEmail ? sendVerificationMail : undefined}
        />
        <VSpace />
        <BarButton
          round
          loading={isSending}
          title={'Send Mail'}
          disabled={!isValidEmail || isSending}
          onPress={sendVerificationMail}
        />
        <VSpace space={35} />

        {showVerificationField && (
          <VertificationCode
            inputRef={setCodeRef}
            hasError={error.fromCode}
            onChangeCode={setCode}
            onSubmitEditing={handleVerificationCode}
          />
        )}
      </Content>
      {!!error.message && <ErrorMessage message={error.message} />}
      <BarButton
        title="DONE"
        loading={isVerifying}
        square={false}
        disabled={verificationCode.length !== 6 || isVerifying}
        onPress={handleVerificationCode}
      />
    </ContentContainer>
  );
};

interface VertificationCodeProps extends TextFieldProps {
  hasError: boolean;
  onChangeCode(code: string): void;
  onSubmitEditing(): void;
}

const VertificationCode = ({
  inputRef,
  hasError = false,
  onChangeCode,
  onSubmitEditing,
}: VertificationCodeProps): JSX.Element => {
  return (
    <>
      <Title text={'Verification code'} />
      <VSpace />
      <TextField
        inputRef={inputRef}
        maxLength={6}
        enablesReturnKeyAutomatically
        returnKeyType={'done'}
        onSubmitEditing={onSubmitEditing}
        placeholder={'Enter verification code'}
        onChangeText={onChangeCode}
        hasError={hasError}
      />
    </>
  );
};

export default ChangeEmail;
