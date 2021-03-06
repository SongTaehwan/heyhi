import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';
import { Input } from 'react-native-elements';
import React, { useState, useRef } from 'react';
import {
  Title,
  VSpace,
  Content,
  BarButton,
  TextField,
  ErrorMessage,
  ContentContainer,
} from '@components';

import { LoginNavigationProps } from '@navigator/Routes';
import { MUTATION_RESET_PASSWORD } from '@api/mutation';
import useText from '@hooks/useText';

interface Variables {
  data: {
    password: string;
  };
  where: {
    email: string;
  };
}

interface Result {
  resetPassword: {
    accessToken: string;
    refreshToken: string;
  };
}

// TODO: API, Navigation logic
const PasswordChange = ({
  navigation,
  route,
}: LoginNavigationProps<'PasswordChange'>): JSX.Element => {
  const { email = '' } = route.params;
  const [password, setPassword] = useText('');
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const passwordRef = useRef<Input | null>(null);

  const [changePassword, { loading }] = useMutation<Result, Variables>(
    MUTATION_RESET_PASSWORD,
    {
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: onCompleteResetPassword,
      onError: (error): void => {
        console.log('Error while Sending Auth email: ', error);
        const message = error.message.split(': ').pop() as string;
        setErrorMessage(message);
      },
    },
  );

  async function onCompleteResetPassword({
    resetPassword: { accessToken, refreshToken },
  }: Result): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        ['ACCESS_TOKEN', accessToken],
        ['REFRESH_TOKEN', refreshToken],
      ]);

      // move to Map
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error during update token: ', error);
      setErrorMessage(error.message);
    }
  }

  const setNewPasswordRef = (node: Input): void => {
    if (node) {
      passwordRef.current = node;
    }
  };

  const onSubmitButton = (): void => {
    if (!passwordConfirm) {
      setErrorMessage('Password is not matched');
      return passwordRef.current!.shake();
    }

    changePassword({
      variables: {
        data: {
          password,
        },
        where: {
          email,
        },
      },
    });
  };

  const focusNextInput = (): void => {
    const passwordConfirmRef = passwordRef.current;

    if (passwordConfirmRef) {
      passwordConfirmRef.focus();
    }
  };

  const comparePassword = (text: string): void => {
    if (text === password) {
      return setPasswordConfirm(true);
    }

    setPasswordConfirm(false);
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text={'Create a new Password'} />
        <VSpace space={30} />
        <Title text={'At least 6 characters required'} />
        <VSpace space={30} />

        <TextField
          autoFocus
          maxLength={15}
          secureTextEntry
          placeholder={'New Password'}
          onChangeText={setPassword}
          returnKeyType={'next'}
          onSubmitEditing={focusNextInput}
          enablesReturnKeyAutomatically
        />
        <VSpace space={10} />
        <TextField
          inputRef={setNewPasswordRef}
          maxLength={15}
          secureTextEntry
          hasError={errorMessage.length > 0}
          placeholder={'Confirm Password'}
          onChangeText={comparePassword}
          returnKeyType={'done'}
          onSubmitEditing={onSubmitButton}
          enablesReturnKeyAutomatically
        />
      </Content>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
      <BarButton
        title="SUBMIT"
        disabled={loading}
        loading={loading}
        onPress={onSubmitButton}
      />
    </ContentContainer>
  );
};

export default PasswordChange;
