import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Input } from 'react-native-elements';
import React, { useRef } from 'react';
import _isEqual from 'lodash/isEqual';
import validator from 'validator';

import {
  Title,
  Text,
  VSpace,
  Divider,
  Content,
  ImageView,
  TextField,
  BarButton,
  TextButton,
  ErrorMessage,
  ContentContainer,
} from '@components';
import { LoginNavigationProps } from '@navigator/Routes';
import { MUTATION_SIGN_IN } from '@api/mutation';
import { QUERY_MEMBER } from '@api/query';
import { logError } from '@util/Error';
import useValue from '@hooks/useValue';
import useText from '@hooks/useText';
import { Colors } from '@constants';

interface LoginData {
  data: {
    email: string;
    password: string;
  };
}

interface AuthTokens {
  passwordAuthentication: {
    accessToken: string;
    refreshToken: string;
  };
}

const initialFormError = {
  message: '',
  fromEmail: false,
  fromPassword: false,
};

// NOTE: SignIn Component
const Login = ({ navigation }: LoginNavigationProps<'Login'>): JSX.Element => {
  const [getUser] = useLazyQuery(QUERY_MEMBER, {
    onCompleted: async (data): Promise<void> => {
      await AsyncStorage.setItem('USER', JSON.stringify(data.member));
      goToMap();
    },
  });
  const [email, setEmail] = useText('', { isEmail: true, delayTime: 500 });
  const [password, setPassword] = useText('', { delayTime: 500 });
  const [formError, setFormError] = useValue(initialFormError, 300);
  const [serverErrorMessage, setServerErrorMessage] = useText('');
  const passwordRef = useRef<Input | null>(null);
  const emailRef = useRef<Input | null>(null);

  const setEmailRef = (node: Input): void => {
    if (node) {
      emailRef.current = node;
    }
  };

  const setPasswordRef = (node: Input): void => {
    if (node) {
      passwordRef.current = node;
    }
  };

  const goToMap = (): void => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  const handleSignIn = async (data: AuthTokens): Promise<void> => {
    const { accessToken, refreshToken } = data.passwordAuthentication;

    try {
      await AsyncStorage.multiSet([
        ['ACCESS_TOKEN', accessToken],
        ['REFRESH_TOKEN', refreshToken],
      ]);

      getUser({ variables: { email } });
    } catch (error) {
      console.log('error', error);
      setServerErrorMessage(error.message);
    }
  };

  const [signIn, { loading }] = useMutation<AuthTokens, LoginData>(
    MUTATION_SIGN_IN,
    {
      variables: {
        data: {
          email,
          password,
        },
      },
      notifyOnNetworkStatusChange: false,
      fetchPolicy: 'no-cache',
      onCompleted: handleSignIn,
      onError: logError(setServerErrorMessage),
    },
  );

  const isFormDataValid = (): boolean => {
    if (!validator.isEmail(email)) {
      emailRef.current?.shake();

      setFormError((prevState) => {
        const emailError = {
          message: 'Correct Email Format Required',
          fromEmail: true,
          fromPassword: false,
        };

        const isEqual = _isEqual(prevState, emailError);

        return isEqual ? prevState : emailError;
      });

      return false;
    }

    if (password.length < 6) {
      passwordRef.current?.shake();

      setFormError((prevState) => {
        const passwordError = {
          message: 'Password required at least 6 characters',
          fromEmail: false,
          fromPassword: true,
        };

        const isEqual = _isEqual(prevState, passwordError);

        return isEqual ? prevState : passwordError;
      });

      return false;
    }

    // NOTE: In case, all correct
    if (formError.fromEmail || formError.fromPassword) {
      setFormError(initialFormError);
    }

    return email.length !== 0 && password.length !== 0;
  };

  const focusPasswordInput = (): void => {
    if (passwordRef.current !== null) {
      passwordRef.current.focus();
    }
  };

  const onSubmitAuth = (): void => {
    const isValid = isFormDataValid();

    if (isValid) {
      signIn();
    }
  };

  return (
    <ContentContainer>
      <Content style={{ paddingHorizontal: 47 }}>
        <Hero />

        <TextField
          hasError={formError.fromEmail}
          inputRef={setEmailRef}
          returnKeyType={'next'}
          placeholder="Email"
          onChangeText={setEmail}
          onSubmitEditing={focusPasswordInput}
          enablesReturnKeyAutomatically
        />
        <VSpace />
        <TextField
          hasError={formError.fromPassword}
          inputRef={setPasswordRef}
          returnKeyType={'done'}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          onSubmitEditing={!formError.fromPassword ? onSubmitAuth : undefined}
          enablesReturnKeyAutomatically
        />
        <VSpace space={40} />

        <NavigationButtons navigation={navigation} />
      </Content>
      {!!formError.message && <ErrorMessage message={formError.message} />}
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      <BarButton
        title="LOGIN"
        loading={loading}
        disabled={loading}
        onPress={onSubmitAuth}
      />
    </ContentContainer>
  );
};

const Hero = (): JSX.Element => {
  return (
    <>
      <ImageView source={require('./assets/logo.png')} />
      <VSpace space={40} />

      <Title title text={'Login'} />
      <VSpace space={30} />
    </>
  );
};

const NavigationButtons = ({
  navigation,
}: LoginNavigationProps<'Login'>): JSX.Element => {
  const goToPasswordRestoration = (): void => {
    navigation.navigate('ForgotPassword');
  };

  const goToSignUp = (): void => {
    navigation.navigate('SignUpStack');
  };

  return (
    <>
      <Divider />
      <VSpace space={20} />

      <TextButton text="Forget Password?" onPress={goToPasswordRestoration} />
      <VSpace />
      <Text color={Colors.veryLightPink} text={'or'} />
      <VSpace />
      <TextButton text="Join us" onPress={goToSignUp} />

      <VSpace space={20} />
      <Divider />
    </>
  );
};

export default Login;
