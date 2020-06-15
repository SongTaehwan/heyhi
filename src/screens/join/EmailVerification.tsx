import { useMutation } from '@apollo/react-hooks';
import React, { useState, useRef } from 'react';
import { Input } from 'react-native-elements';
import { Keyboard } from 'react-native';
import {
  Title,
  VSpace,
  Content,
  BarButton,
  TextField,
  ErrorMessage,
  ContentContainer,
} from '@components';
import { TextFieldProps } from '@components/types';
import { Screens, ReuseablePageProps } from '@navigation/types';
import { MUTATION_SEND_EMAIL, MUTATION_VERIFY_CODE } from '@api/mutation';
import useText from '@hooks/useText';

type EmailVerificationProps = ReuseablePageProps<Screens.EmailVerification>;

const initialErrorState = {
  message: '',
  fromEmail: false,
  fromCode: false,
};

const EmailVerification = ({
  navigation,
  route,
}: EmailVerificationProps): JSX.Element => {
  const userEmail = route.params?.email ?? '';
  const [email, setEmail, isValidEmail] = useText(userEmail, {
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
    onCompleted: (data) => {
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

  const [verifyCode, { loading: isVerifying }] = useMutation(
    MUTATION_VERIFY_CODE,
    {
      variables: {
        data: {
          email,
          verifyCode: verificationCode,
        },
      },
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        console.log(data);
        navigateToNextPage();
      },
      onError: (error) => {
        console.log('Error while verifying code: ', error);

        const message = error.message.split(': ').pop() as string;

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
    console.log('verificationCode', verificationCode);
    if (verificationCode.length === 6) {
      verifyCode();
      Keyboard.dismiss();
    }
  };

  const navigateToNextPage = (): void => {
    const nextPage = route.params.to!;
    navigation.navigate(nextPage);
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
        title="NEXT"
        loading={isVerifying}
        square={false}
        disabled={verificationCode.length !== 6 || isVerifying}
        onPress={handleVerificationCode}
        // onPress={navigateToNextPage}
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

export default EmailVerification;
