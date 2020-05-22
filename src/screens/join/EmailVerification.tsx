import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import _debounce from 'lodash/debounce';
import {
  ContentContainer,
  Content,
  Title,
  TextField,
  VSpace,
  BarButton,
} from '@components';
import {
  NavigationFlowProps,
  SignUpStackParamList,
  Screens,
} from '@routes/types';
import useText from '@hooks/useText';
import { useMutation } from '@apollo/react-hooks';
import { AUTHENTICATION } from '@api/mutation';

type EmailVerificationProps = NavigationFlowProps<
  SignUpStackParamList,
  'EmailVerification'
>;

const styles = StyleSheet.create({
  verficationTitle: {
    fontSize: 15,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: 15,
  },
});

const EmailVerification = ({
  navigation,
  route,
}: EmailVerificationProps): JSX.Element => {
  const [email, setEmail] = useText(route.params.email, {
    isEmail: true,
    delayTime: 0,
  });
  // TODO: Add blow code
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [showVerificationField, setShowField] = useState(false);
  const [verificationCode, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const debouncedCodehandler = _debounce(setCode, 300);

  const [sendEmail] = useMutation(AUTHENTICATION.SEND_EMAIL, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      setEmailDisabled(false);
      console.log('error', error);
    },
  });

  const [verifyCode] = useMutation(AUTHENTICATION.VERIFY_CODE, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <ContentContainer>
      <Content>
        <Title title>{'Verify your email'}</Title>
        <VSpace space={30} />
        <TextField
          value={email}
          placeholder={'Type your email'}
          onChangeText={setEmail}
        />
        <VSpace />
        <BarButton
          title={'Send mail'}
          round
          disabled={email.length === 0 && emailDisabled}
          onPress={(): void => {
            setEmailDisabled(true);
            setShowField(true);
            sendEmail({
              variables: {
                data: {
                  email,
                },
              },
            });
          }}
        />
        <VSpace space={35} />

        {showVerificationField && (
          <>
            <Title style={styles.verficationTitle}>{'Verification code'}</Title>
            <VSpace />
            <TextField
              placeholder={'Enter verification code'}
              onChangeText={debouncedCodehandler}
              hasError={errorMessage.length > 0}
            />
          </>
        )}
      </Content>

      {errorMessage.length !== 0 && (
        <>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <VSpace />
        </>
      )}
      <BarButton
        square={false}
        disabled={verificationCode.length === 0}
        onPress={(): void => {
          // verifyCode({
          //   variables: {
          //     data: { verifyCode: verificationCode, email },
          //   },
          // });
          // if (errorMessage.length === 0) {
          //   return setErrorMessage(
          //     'Invalid Verification Code Please try again',
          //   );
          // }
          navigation.navigate(Screens.ServicePolicy);
        }}
      />
    </ContentContainer>
  );
};

export default EmailVerification;
