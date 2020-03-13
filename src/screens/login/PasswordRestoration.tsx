import { Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import _debounce from 'lodash/debounce';
import {
  Layout,
  Title,
  BarButton,
  VSpace,
  TextField,
  ContentLayer,
} from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '@routes/types';
import { RouteProp } from '@react-navigation/native';

interface PasswordRestoration {
  navigation: StackNavigationProp<LoginStackParamList, 'PasswordRestoration'>;
  route: RouteProp<LoginStackParamList, 'PasswordRestoration'>;
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
  const [email, setEmail] = useState<string>('');

  const changeEmail = (userEmail: string): void => {
    setEmail(userEmail);
  };

  const debounceOnChangeEmail = _debounce(changeEmail, 500);

  return (
    <Layout>
      <ContentLayer>
        <Title h2 text="Create a new Password" />
        <VSpace space={30} />
        <Text style={styles.guidText}>
          {
            'To reset your password,\nenter your E-mail address below\nand follow the instructions\nin the E-mail we’ll send you.'
          }
        </Text>
        <VSpace space={30} />
        <TextField
          placeholder="Email"
          onChangeText={debounceOnChangeEmail}
          inputContainerStyle={{ width: '90%' }}
        />
      </ContentLayer>
      <BarButton
        title="SEND RESET LINK"
        disabled={email.length === 0}
        onPress={(): void => navigation.navigate('PasswordCreation')}
      />
    </Layout>
  );
};

export default PasswordRestoration;
