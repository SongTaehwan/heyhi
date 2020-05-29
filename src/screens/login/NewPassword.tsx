import React, { useState, useRef } from 'react';
import {
  Title,
  VSpace,
  Content,
  BarButton,
  ContentContainer,
  TextField,
  ErrorMessage,
} from '@components';
import {
  LoginStackNavigationProps,
  Screens,
  LoginStackParamList,
} from '@navigation/types';
import useText from '@hooks/useText';
import { useMutation } from '@apollo/react-hooks';
import { Input } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';

interface NewPasswordProps {
  navigation: LoginStackNavigationProps<Screens.NewPassword>;
  route: RouteProp<LoginStackParamList, Screens.NewPassword>;
}

// TODO: API, Navigation logic
const NewPassword = ({ navigation, route }: NewPasswordProps): JSX.Element => {
  const { userId = null } = route.params;
  const [password, setPassword] = useText('');
  const [passwordConfirm, setPasswordConfirm] = useText('');
  const [errorMessage, setErrorMessage] = useState('');
  const passwordRef = useRef<Input | null>(null);

  const setConfirmPasswordRef = (node: Input): void => {
    if (node) {
      passwordRef.current = node;
    }
  };

  const onSubmitButton = (): void => {
    // API
  };

  const focusNextInput = (): void => {
    const passwordConfirmRef = passwordRef.current;
    if (passwordConfirmRef) {
      passwordConfirmRef.focus();
    }
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
          placeholder={'New Password'}
          onChangeText={setPassword}
          returnKeyType={'next'}
          onSubmitEditing={focusNextInput}
          enablesReturnKeyAutomatically
        />
        <VSpace space={10} />
        <TextField
          inputRef={setConfirmPasswordRef}
          maxLength={15}
          placeholder={'Confirm Password'}
          onChangeText={setPasswordConfirm}
          returnKeyType={'done'}
          onSubmitEditing={onSubmitButton}
          enablesReturnKeyAutomatically
        />
      </Content>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
      <BarButton title="SUBMIT" onPress={onSubmitButton} />
    </ContentContainer>
  );
};

export default NewPassword;
