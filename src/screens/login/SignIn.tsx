import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import _ from 'lodash';
import { LoginStackParamList } from '@routes/types';
import Logo from '@images/logo.png';
import { st } from '@constant';
import {
  TextField,
  BarButton,
  VSpace,
  ImageView,
  Layout,
  Divider,
  TextButton,
} from '@components';

interface SignInProps {
  navigation: StackNavigationProp<LoginStackParamList, 'SignIn'>;
  route: RouteProp<LoginStackParamList, 'SignIn'>;
}

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const changeEmail = (userEmail: string): void => {
    setEmail(userEmail);
  };

  const changePassword = (userEmail: string): void => {
    setPassword(userEmail);
  };

  const debounceEmailHandler = _.debounce(changeEmail, 500);
  const debouncePasswordHandler = _.debounce(changePassword, 500);

  const onChangeEmail = (userEmail: string): void => {
    debounceEmailHandler(userEmail);
  };

  const onChangePassword = (userPassword: string): void => {
    debouncePasswordHandler(userPassword);
  };

  return (
    <Layout>
      <View style={styles.formWrapper}>
        <ImageView source={Logo} />
        <VSpace space={40} />

        <Text style={styles.titleText}>Login</Text>
        <VSpace space={30} />

        <TextField placeholder="Email" onChangeText={onChangeEmail} />
        <VSpace />
        <TextField
          placeholder="Password"
          secureTextEntry
          onChangeText={onChangePassword}
        />
        <VSpace space={40} />

        <Divider />
        <VSpace space={20} />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextButton
            text="Forget Password?"
            onPress={(): void => navigation.navigate('PasswordRestoration')}
          />
          <VSpace />
          <Text style={{ color: st.Pallette.veryLightPink, fontSize: 15 }}>
            {'or'}
          </Text>
          <VSpace />
          <TextButton
            text="Join us"
            onPress={(): void => navigation.navigate('SignUpFlow')}
          />
        </View>

        <VSpace space={20} />
        <Divider />
      </View>
      <BarButton title="LOGIN" />
    </Layout>
  );
};

export default SignIn;
