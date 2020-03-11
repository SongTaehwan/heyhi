import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import _debounce from 'lodash/debounce';
import { Layout, Title, BarButton, VSpace, TextField } from '@components';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  guidText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
});

const PasswordRestore = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');

  const changeEmail = (userEmail: string): void => {
    setEmail(userEmail);
  };
  console.log(email);
  const debounceOnChangeEmail = _debounce(changeEmail, 500);
  return (
    <Layout>
      <View style={styles.content}>
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
      </View>
      <BarButton title="SEND RESET LINK" disabled={email.length === 0} />
    </Layout>
  );
};

export default PasswordRestore;
