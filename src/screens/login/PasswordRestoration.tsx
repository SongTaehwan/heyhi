import { useMutation } from '@apollo/react-hooks';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Screens, LoginStackNavigationProps } from '@navigation/types';
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

import { MUTATION_SEND_EMAIL } from '@api/mutation';

interface PasswordRestoration {
  navigation: LoginStackNavigationProps<Screens.PasswordRestoration>;
}

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

const PasswordRestoration = ({
  navigation,
}: PasswordRestoration): JSX.Element => {
  const [email, setEmail, isValid] = useText('', { isEmail: true });
  const [errorMessage, setErrorMessage] = useState('');

  const [sendEmail, { loading }] = useMutation<{}, MutationVariable>(
    MUTATION_SEND_EMAIL,
    {
      variables: {
        data: {
          email,
        },
      },
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: (): void => {
        navigation.navigate(Screens.EmailAuth, { email });
      },
      onError: (error): void => {
        console.log('Error while Sending Auth email: ', error);

        // TODO: 에러 발생 시 UX를 고려해서 무시하고 넘어간 후 Effect 훅에서 재요청 보낼지?
        const message = error.message.split(': ').pop() as string;
        setErrorMessage(message);
      },
    },
  );

  const sendAuthEmail = (): void => {
    sendEmail();
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
        // onPress={() => navigation.navigate(Screens.EmailAuth, { email })} // dev
      />
    </ContentContainer>
  );
};

export default PasswordRestoration;
