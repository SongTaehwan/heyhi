import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
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
} from '@components';
import { useMutation } from '@apollo/react-hooks';
import { AUTHENTICATION } from '@api/mutation';

type SignInProps = NavigationFlowProps<
  LoginStackParamList & AppStackParamList,
  Screens.SignIn
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 47,
  },
  image: {
    width: 100,
    height: 58,
  },
});

const SignIn = ({ navigation }: SignInProps): JSX.Element => {
  const [email, setEmail] = useText('', { isEmail: true });
  const [password, setPassword] = useText('');

  const [signIn] = useMutation(AUTHENTICATION.SIGN_IN, {
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      const { accessToken, refreshToken } = data.passwordAuthentication;
      console.log('data', data);
      try {
        await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
        await AsyncStorage.setItem('REFRESH_TOKEN', refreshToken);

        navigation.replace(AppFlow.MainFlow);
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  const onButtonSubmit = async (): Promise<any> => {
    await signIn({
      variables: {
        data: {
          email,
          password,
        },
      },
    });
  };

  return (
    <ContentContainer>
      <View style={styles.formWrapper}>
        <ImageView source={Logo} />
        <VSpace space={40} />

        <Text style={styles.titleText}>Login</Text>
        <VSpace space={30} />

        <TextField placeholder="Email" onChangeText={setEmail} />
        <VSpace />
        <TextField
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <VSpace space={40} />

        <Divider />
        <VSpace space={20} />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextButton
            text="Forget Password?"
            onPress={(): void =>
              navigation.navigate(Screens.PasswordRestoration)
            }
          />
          <VSpace />
          <Text style={{ color: Colors.veryLightPink, fontSize: 15 }}>
            {'or'}
          </Text>
          <VSpace />
          <TextButton
            text="Join us"
            onPress={(): void => navigation.navigate(AppFlow.SignUpFlow)}
          />
        </View>

        <VSpace space={20} />
        <Divider />
      </View>
      <BarButton
        title="LOGIN"
        disabled={email.length === 0}
        onPress={onButtonSubmit}
      />
    </ContentContainer>
  );
};

SignIn.whyDidYouRender = {
  trackHooks: true,
  logOnDifferentValues: true,
};

export default SignIn;
