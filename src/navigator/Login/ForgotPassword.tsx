import { useMutation } from '@apollo/react-hooks';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { LoginNavigationProps } from '@navigator/Routes';
import { MUTATION_SEND_EMAIL } from '@api/mutation';
import { logError } from '@util/Error';
import useText from '@hooks/useText';
import {
  ContentContainer,
  Title,
  BarButton,
  VSpace,
  TextField,
  Content,
  Text,
  ErrorMessage,
} from '@components';

interface MutationVariable {
  data: {
    email: string;
  };
}

const styles = StyleSheet.create({
  guidText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
});

const ForgotPassword = ({
  navigation,
}: LoginNavigationProps<'ForgotPassword'>): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail, isValid] = useText('', {
    isEmail: true,
    delayTime: 100,
  });

  const [sendEmail, { loading }] = useMutation<{}, MutationVariable>(
    MUTATION_SEND_EMAIL,
    {
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: (): void => {
        navigation.navigate('EmailAuth', { email });
      },
      onError: logError(setErrorMessage),
    },
  );

  const sendAuthEmail = (): void => {
    sendEmail({
      variables: {
        data: {
          email,
        },
      },
    });
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text="Create a new Password" center />
        <VSpace space={30} />
        <Text style={styles.guidText}>
          {
            'To reset your password,\nenter your E-mail address below\nand follow the instructions\nin the E-mail we’ll send you'
          }
        </Text>
        <VSpace space={30} />
        <TextField
          autoFocus
          placeholder="Email"
          onChangeText={setEmail}
          inputContainerStyle={{ width: '90%' }}
          enablesReturnKeyAutomatically
          returnKeyType={'done'}
          onSubmitEditing={sendAuthEmail}
        />
      </Content>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
      <BarButton
        title="SEND RESET CODE"
        loading={loading}
        disabled={!isValid || loading}
        onPress={sendAuthEmail}
        // onPress={() => navigation.navigate("EmailAuth", { email })} // dev
      />
    </ContentContainer>
  );
};

export default ForgotPassword;
