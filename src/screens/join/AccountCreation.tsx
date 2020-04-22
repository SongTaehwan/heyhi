import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ContentLayer,
  Title,
  BarButton,
  TextField,
  VSpace,
  HSpace,
  Layout,
  Picker,
} from '@components';
import useText from '@hooks/useText';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';

type AccountCreationProps = NavigationFlowProps<
  SignUpStackParamList,
  'AccountCreation'
>;

const styles = StyleSheet.create({
  nameFieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameFieldStyle: {
    paddingHorizontal: 0,
    flex: 1,
  },
});

const AccountCreation = ({ navigation }: AccountCreationProps): JSX.Element => {
  const [email, setEmail] = useText('', { isEmail: true });

  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Making Account'}</Title>
        <VSpace space={30} />
        <TextField placeholder={'Email'} onChangeText={setEmail} />
        <VSpace space={10} />
        <TextField placeholder={'Password'} />
        <VSpace space={10} />
        <TextField placeholder={'Password Confirm'} />
        <VSpace space={10} />
        <View style={styles.nameFieldWrapper}>
          <TextField
            containerStyle={styles.nameFieldStyle}
            placeholder={'Given Name'}
          />
          <HSpace />
          <TextField
            containerStyle={styles.nameFieldStyle}
            placeholder={'Family Name'}
          />
        </View>
        <VSpace space={10} />
        <Picker />
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        onPress={(): void =>
          navigation.navigate('EmailVerification', {
            email,
          })
        }
      />
    </Layout>
  );
};

export default AccountCreation;
