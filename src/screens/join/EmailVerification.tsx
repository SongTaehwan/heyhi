import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import isEmail from 'validator/lib/isEmail';
import _debounce from 'lodash/debounce';
import {
  Layout,
  ContentLayer,
  Title,
  TextField,
  VSpace,
  BarButton,
} from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';
import useText from '@hooks/useText';

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
}: EmailVerificationProps): JSX.Element => {
  const [email, setEmail] = useText('', { isEmail: true });
  // TODO: Add blow code
  const [showVerificationField, setShowField] = useState('');
  const [verificationCode, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const debouncedCodehandler = _debounce(setCode, 300);
  console.log(email);
  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Verify your email'}</Title>
        <VSpace space={30} />
        <TextField placeholder={'Type your email'} onChangeText={setEmail} />
        <VSpace />
        <BarButton title={'Send mail'} round disabled={email.length === 0} />
        <VSpace space={35} />

        {email.length > 0 && (
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
      </ContentLayer>

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
          if (errorMessage.length === 0) {
            return setErrorMessage(
              'Invalid Verification Code Please try again',
            );
          }
          navigation.navigate('InterestSelection');
        }}
      />
    </Layout>
  );
};

export default EmailVerification;
