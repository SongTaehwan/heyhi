import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import React, { useRef, useState } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import _isEqual from 'lodash/isEqual';
import validator from 'validator';
import {
  LoginStackParamList,
  NavigationFlowProps,
  AppStackParamList,
  Screens,
  AppFlow,
} from '@routes/types';
import useText from '@hooks/useText';
import Logo from '@images/logo.png';
import { Colors } from '@constants';
import {
  TextField,
  BarButton,
  VSpace,
  ImageView,
  ContentContainer,
  Divider,
  TextButton,
  Title,
  Text,
  Content,
  ErrorMessage,
} from '@components';
import { AUTHENTICATION } from '@api/mutation';
import useValue from '@hooks/useValue';

type SignInProps = NavigationFlowProps<
  LoginStackParamList & AppStackParamList,
  Screens.SignIn
>;

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

const styles = StyleSheet.create({
  formWrapper: {
    paddingHorizontal: 47,
  },
});

const initialFormError = {
  message: '',
  fromEmail: false,
  fromPassword: false,
};

// NOTE: SignIn Component
const SignIn = ({ navigation }: SignInProps): JSX.Element => {
  const [email, setEmail] = useText('', { isEmail: true, delayTime: 1000 });
  const [password, setPassword] = useText('', { delayTime: 1000 });
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
        routes: [{ name: AppFlow.MainFlow }],
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

      goToMap();
    } catch (error) {
      console.log('error', error);
      setServerErrorMessage(error.message);
    }
  };

  const [signIn, { loading }] = useMutation<AuthTokens, LoginData>(
    AUTHENTICATION.SIGN_IN,
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
      onError: (error) => {
        console.log('Error while Loging in: ', error);
        const message = error.message.split(': ').pop() as string;
        setServerErrorMessage(message);
      },
    },
  );

  const onSubmitAuth = (): void => {
    signIn();
  };

  const isValidForm = (): boolean => {
    if (email.length !== 0 && !validator.isEmail(email)) {
      emailRef.current?.shake();

      setFormError((prevState) => {
        const emailError = {
          message: 'Correct Email Formmat Required',
          fromEmail: true,
          fromPassword: false,
        };

        const isEqual = _isEqual(prevState, emailError);

        return isEqual ? prevState : emailError;
      });

      return false;
    }

    if (password.length !== 0 && password.length < 6) {
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

  return (
    <ContentContainer>
      <Content style={styles.formWrapper}>
        <Hero />

        <TextField
          hasError={formError.fromEmail}
          inputRef={setEmailRef}
          returnKeyType={'next'}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder="Email"
          onChangeText={setEmail}
          onSubmitEditing={focusPasswordInput}
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
          onSubmitEditing={isValidForm() ? onSubmitAuth : undefined}
        />
        <VSpace space={40} />

        <NavigationButtons navigation={navigation} />
      </Content>
      {!!formError.message && <ErrorMessage message={formError.message} />}
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      <BarButton
        title="LOGIN"
        disabled={!isValidForm() || loading}
        loading={loading}
        onPress={onSubmitAuth}
      />
    </ContentContainer>
  );
};

const Hero = (): JSX.Element => {
  return (
    <>
      <ImageView source={Logo} />
      <VSpace space={40} />

      <Title title text={'Login'} />
      <VSpace space={30} />
    </>
  );
};

const NavigationButtons = ({
  navigation,
}: Pick<SignInProps, 'navigation'>): JSX.Element => {
  const goToPasswordRestoration = (): void => {
    navigation.navigate(Screens.PasswordRestoration);
  };

  const goToSignUp = (): void => {
    navigation.navigate(AppFlow.SignUpFlow);
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

SignIn.whyDidYouRender = {
  trackHooks: true,
  logOnDifferentValues: true,
};

export default SignIn;
